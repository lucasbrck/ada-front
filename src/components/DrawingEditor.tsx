import { useEffect, useRef, useState } from "react";
import paper from "paper";
import styled from "styled-components";
import { applyEdgeProfile } from "core/tessellationEngine";
import { EditorTool, TileDefinition, TileEdge } from "types";
import { Fonts } from "styles/constants";

interface Props {
  tile: TileDefinition;
  onTileChange: (tile: TileDefinition) => void;
  onArtworkChange: (png: string, svg: string) => void;
}

const tools: { id: EditorTool; label: string }[] = [
  { id: "select", label: "Selecionar" }, { id: "pencil", label: "Lápis" },
  { id: "line", label: "Linha" }, { id: "rectangle", label: "Retângulo" },
  { id: "ellipse", label: "Elipse" }, { id: "polygon", label: "Polígono" },
  { id: "fill", label: "Balde" }, { id: "eraser", label: "Borracha" }, { id: "edge-cut", label: "Cortar borda" },
];

const DrawingEditor = ({ tile, onTileChange, onArtworkChange }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scopeRef = useRef<paper.PaperScope>();
  const callbacks = useRef({ onTileChange, onArtworkChange, tile });
  const activeToolRef = useRef<EditorTool>("pencil");
  const colorRef = useRef("#df493c");
  const symmetryRef = useRef<"none" | "horizontal" | "vertical" | "rotational" | "four-point">("none");
  const [activeTool, setActiveTool] = useState<EditorTool>("pencil");
  const [color, setColor] = useState("#df493c");
  const [symmetry, setSymmetry] = useState<"none" | "horizontal" | "vertical" | "rotational" | "four-point">("none");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  callbacks.current = { onTileChange, onArtworkChange, tile };
  activeToolRef.current = activeTool;
  colorRef.current = color;
  symmetryRef.current = symmetry;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scope = new paper.PaperScope();
    scope.setup(canvas);
    scopeRef.current = scope;
    const artLayer = scope.project.activeLayer;
    artLayer.name = "artwork";
    const guideLayer = new scope.Layer();
    guideLayer.name = "guides";

    const drawGrid = () => {
      guideLayer.activate();
      const group = new scope.Group();
      group.data.guide = true;
      const bounds = scope.view.bounds;
      for (let index = 0; index <= 16; index += 1) {
        const x = bounds.left + (bounds.width * index) / 16;
        const y = bounds.top + (bounds.height * index) / 16;
        const vertical = new scope.Path.Line(new scope.Point(x, bounds.top), new scope.Point(x, bounds.bottom));
        const horizontal = new scope.Path.Line(new scope.Point(bounds.left, y), new scope.Point(bounds.right, y));
        [vertical, horizontal].forEach((line) => {
          line.strokeColor = new scope.Color("#c9e2e5");
          line.strokeWidth = index % 4 === 0 ? 1.3 : 0.6;
          line.data.guide = true;
          group.addChild(line);
        });
      }
      artLayer.activate();
    };

    drawGrid();

    const emitArtwork = () => {
      const activeScope = scopeRef.current;
      if (!activeScope?.view.element) return;
      guideLayer.visible = false;
      activeScope.view.update();
      const png = activeScope.view.element.toDataURL("image/png");
      const svg = artLayer.exportSVG({ asString: true }) as string;
      guideLayer.visible = true;
      activeScope.view.update();
      callbacks.current.onArtworkChange(png, svg);
    };

    const addSymmetry = (item: paper.Item) => {
      const center = scope.view.center;
      const mode = symmetryRef.current;
      if (mode === "none") return;
      const clone = item.clone();
      if (mode === "horizontal") clone.scale(-1, 1, center);
      if (mode === "vertical") clone.scale(1, -1, center);
      if (mode === "rotational") clone.rotate(180, center);
      if (mode === "four-point") {
        clone.scale(-1, 1, center);
        const verticalClone = item.clone();
        verticalClone.scale(1, -1, center);
        const rotationalClone = item.clone();
        rotationalClone.rotate(180, center);
      }
    };

    const currentTool = () => activeToolRef.current;
    const paperTool = new scope.Tool();
    let activeItem: paper.Item | null = null;
    let startPoint: paper.Point | null = null;

    const styleItem = (item: paper.Item) => {
      item.strokeColor = new scope.Color(colorRef.current);
      item.strokeWidth = 4;
      item.strokeCap = "round";
      item.strokeJoin = "round";
      item.data.guide = false;
    };

    const edgeAt = (point: paper.Point): TileEdge => {
      const bounds = scope.view.bounds;
      const distances: [TileEdge, number][] = [
        ["top", point.y - bounds.top],
        ["right", bounds.right - point.x],
        ["bottom", bounds.bottom - point.y],
        ["left", point.x - bounds.left],
      ];
      return distances.sort((first, second) => first[1] - second[1])[0][0];
    };

    paperTool.onMouseDown = (event: paper.ToolEvent) => {
      const mode = currentTool();
      startPoint = event.point;
      const hit = artLayer.hitTest(event.point, { fill: true, stroke: true, tolerance: 10 });
      if (mode === "eraser" && hit?.item) hit.item.remove();
      if (mode === "fill" && hit?.item) {
        if (hit.item instanceof scope.Path && hit.item.closed) {
          hit.item.fillColor = new scope.Color(colorRef.current);
        } else {
          hit.item.strokeColor = new scope.Color(colorRef.current);
        }
      }
      if (mode === "select") activeItem = hit?.item ?? null;
      if (mode === "pencil") {
        activeItem = new scope.Path();
        styleItem(activeItem);
        (activeItem as paper.Path).add(event.point);
      }
      if (mode === "edge-cut") {
        const edge = edgeAt(event.point);
        const profile = [
          { position: 0, offset: 0 }, { position: 0.32, offset: 0.08 },
          { position: 0.5, offset: -0.1 }, { position: 0.68, offset: 0.08 }, { position: 1, offset: 0 },
        ];
        callbacks.current.onTileChange(applyEdgeProfile(callbacks.current.tile, edge, profile));
        const marker = new scope.Path();
        styleItem(marker);
        marker.dashArray = [7, 4];
        const bounds = scope.view.bounds;
        if (edge === "top" || edge === "bottom") {
          const y = edge === "top" ? bounds.top + 8 : bounds.bottom - 8;
          marker.add(new scope.Point(bounds.left + bounds.width * 0.25, y));
          marker.add(new scope.Point(bounds.center.x, y + (edge === "top" ? 24 : -24)));
          marker.add(new scope.Point(bounds.left + bounds.width * 0.75, y));
        } else {
          const x = edge === "left" ? bounds.left + 8 : bounds.right - 8;
          marker.add(new scope.Point(x, bounds.top + bounds.height * 0.25));
          marker.add(new scope.Point(x + (edge === "left" ? 24 : -24), bounds.center.y));
          marker.add(new scope.Point(x, bounds.top + bounds.height * 0.75));
        }
        marker.data.guide = true;
        guideLayer.addChild(marker);
        artLayer.activate();
      }
    };

    paperTool.onMouseDrag = (event: paper.ToolEvent) => {
      const mode = currentTool();
      if (mode === "pencil" && activeItem instanceof scope.Path) activeItem.add(event.point);
      if (mode === "select" && activeItem) activeItem.position = activeItem.position.add(event.delta);
      if (!startPoint || !["line", "rectangle", "ellipse", "polygon"].includes(mode)) return;
      activeItem?.remove();
      if (mode === "line") activeItem = new scope.Path.Line(startPoint, event.point);
      if (mode === "rectangle") activeItem = new scope.Path.Rectangle(new scope.Rectangle(startPoint, event.point));
      if (mode === "ellipse") activeItem = new scope.Path.Ellipse(new scope.Rectangle(startPoint, event.point));
      if (mode === "polygon") {
        const radius = Math.max(12, startPoint.getDistance(event.point));
        activeItem = new scope.Path.RegularPolygon(startPoint, 6, radius);
      }
      if (activeItem) styleItem(activeItem);
    };

    paperTool.onMouseUp = () => {
      const mode = currentTool();
      if (mode === "pencil" && activeItem instanceof scope.Path && activeItem.segments.length > 2) {
        activeItem.smooth({ type: "continuous" });
      }
      if (activeItem && ["pencil", "line", "rectangle", "ellipse", "polygon"].includes(mode)) addSymmetry(activeItem);
      activeItem = null;
      startPoint = null;
      emitArtwork();
    };

    emitArtwork();
    return () => scope.project.remove();
  }, []);

  const saveHistory = () => {
    const scope = scopeRef.current;
    if (!scope) return;
    const svg = scope.project.exportSVG({ asString: true }) as string;
    const next = [...history.slice(0, historyIndex + 1), svg].slice(-20);
    setHistory(next);
    setHistoryIndex(next.length - 1);
  };

  const clear = () => {
    const scope = scopeRef.current;
    if (!scope) return;
    const artLayer = scope.project.layers.find((layer) => layer.name === "artwork");
    artLayer?.removeChildren();
    scope.view.update();
    const guideLayer = scope.project.layers.find((layer) => layer.name === "guides");
    if (guideLayer) guideLayer.visible = false;
    scope.view.update();
    callbacks.current.onArtworkChange(
      scope.view.element.toDataURL("image/png"),
      (artLayer?.exportSVG({ asString: true }) as string) ?? ""
    );
    if (guideLayer) guideLayer.visible = true;
    scope.view.update();
  };

  return (
    <EditorShell>
      <EditorHeader><strong>Crie sua peça</strong><span>Use toda a grade para desenhar sua ideia.</span></EditorHeader>
      <Toolbar aria-label="Ferramentas de desenho">
        {tools.map((tool) => <ToolButton type="button" key={tool.id} $active={activeTool === tool.id} onClick={() => { saveHistory(); setActiveTool(tool.id); }}>{tool.label}</ToolButton>)}
      </Toolbar>
      <Options>
        <label>Cor <input type="color" value={color} onChange={(event) => setColor(event.target.value)} /></label>
        <label>Simetria <select value={symmetry} onChange={(event) => setSymmetry(event.target.value as typeof symmetry)}><option value="none">Livre</option><option value="horizontal">Horizontal</option><option value="vertical">Vertical</option><option value="rotational">Rotacional</option><option value="four-point">4 pontos</option></select></label>
        <button type="button" onClick={clear}>Limpar</button>
      </Options>
      <CanvasWrap><canvas ref={canvasRef} width="480" height="480" aria-label="Editor vetorial da peça" /></CanvasWrap>
      <EditorFooter>Use “Cortar borda” perto de qualquer limite da grade para criar o encaixe complementar.</EditorFooter>
    </EditorShell>
  );
};

export default DrawingEditor;

const EditorShell = styled.section`display:grid; gap:12px; min-width:0;`;
const EditorHeader = styled.header`display:grid; gap:4px; color:#142b47; strong{font-family:${Fonts.Fredoka};font-size:24px;} span{font-family:${Fonts.GilroyMedium};color:#43596b;font-size:14px;}`;
const Toolbar = styled.div`display:flex;flex-wrap:wrap;gap:6px;`;
const ToolButton = styled.button<{ $active: boolean }>`min-height:34px;padding:6px 9px;border:1px solid ${(p) => p.$active ? "#df493c" : "#b6ccd2"};border-radius:4px;background:${(p) => p.$active ? "#fde4dd" : "#fffef9"};color:${(p) => p.$active ? "#b63f35" : "#2f4b5b"};font-family:${Fonts.GilroyBold};font-size:13px;`;
const Options = styled.div`display:flex;flex-wrap:wrap;gap:12px;align-items:center;color:#43596b;font-family:${Fonts.GilroySemiBold};font-size:13px;label{display:flex;gap:6px;align-items:center;}input{width:28px;height:28px;border:0;padding:0;background:none;}select,button{min-height:30px;border:1px solid #b6ccd2;border-radius:4px;background:#fffef9;padding:4px 7px;color:#2f4b5b;font-family:${Fonts.GilroySemiBold};}`;
const CanvasWrap = styled.div`width:100%;aspect-ratio:1;overflow:hidden;border:1px solid #b6ccd2;background:#fffef9;canvas{display:block;width:100%;height:100%;touch-action:none;}`;
const EditorFooter = styled.p`color:#43596b;font-family:${Fonts.GilroyMedium};font-size:13px;line-height:1.35;`;
