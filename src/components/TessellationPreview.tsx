import { PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { generateVisibleTiles, matrixToSvgTransform } from "core/tessellationEngine";
import { TileDefinition, TilingMode } from "types";
import { Fonts } from "styles/constants";

interface Props {
  artwork: string;
  artworkSvg: string;
  tile: TileDefinition;
  mode: TilingMode;
  showGrid: boolean;
  colorVariation: boolean;
  isometric: boolean;
}

const TessellationPreview = ({ artwork, artworkSvg, mode, showGrid, colorVariation, isometric }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(0.72);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef<{ x: number; y: number } | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;
    const bounds = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(bounds.width * dpr);
    canvas.height = Math.round(bounds.height * dpr);
    const context = canvas.getContext("2d");
    if (!context) return;
    context.imageSmoothingEnabled = true;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#eaf5f6";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const tilePixels = 240 * zoom;
    const originX = bounds.width / 2 + pan.x;
    const originY = bounds.height / 2 + pan.y;
    const visible = generateVisibleTiles({ x: -4, y: -4, width: 8, height: 8 }, mode, 1);
    const palettes = ["rgba(223,73,60,0.08)", "rgba(26,177,243,0.08)", "rgba(247,201,72,0.12)", "rgba(90,154,106,0.08)"];

    visible.forEach((instance) => {
      const matrix = instance.matrix;
      const projectedX = isometric ? matrix.e + matrix.f * 0.3 : matrix.e;
      const projectedY = isometric ? matrix.f * 0.64 : matrix.f;
      context.setTransform(
        dpr * tilePixels * matrix.a,
        dpr * tilePixels * (isometric ? matrix.b * 0.64 : matrix.b),
        dpr * tilePixels * (isometric ? matrix.c + matrix.d * 0.3 : matrix.c),
        dpr * tilePixels * (isometric ? matrix.d * 0.64 : matrix.d),
        dpr * (originX + tilePixels * projectedX),
        dpr * (originY + tilePixels * projectedY)
      );
      // The engine owns the tile background so Paper's transparent edge pixels
      // can never reveal the preview surface between adjacent instances.
      context.fillStyle = "#fffef9";
      context.fillRect(-0.004, -0.004, 1.008, 1.008);
      // A tiny overlap prevents anti-aliasing seams when transformed tiles meet.
      context.drawImage(image, -0.001, -0.001, 1.002, 1.002);
      if (colorVariation) {
        context.fillStyle = palettes[instance.colorIndex];
        context.fillRect(0, 0, 1, 1);
      }
      if (showGrid) {
        context.strokeStyle = "rgba(20,43,71,0.26)";
        context.lineWidth = 1 / tilePixels;
        context.strokeRect(0, 0, 1, 1);
      }
    });
    context.setTransform(1, 0, 0, 1, 0, 0);
  }, [colorVariation, isometric, mode, pan, showGrid, zoom]);

  useEffect(() => {
    const image = new Image();
    image.onload = () => { imageRef.current = image; draw(); };
    image.src = artwork;
  }, [artwork, draw]);

  useEffect(() => {
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [draw]);

  const onPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    dragging.current = { x: event.clientX - pan.x, y: event.clientY - pan.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!dragging.current) return;
    setPan({ x: event.clientX - dragging.current.x, y: event.clientY - dragging.current.y });
  };

  const onPointerUp = () => { dragging.current = null; };

  const exportPng = () => {
    const source = canvasRef.current;
    if (!source) return;
    const link = document.createElement("a");
    link.download = "ada-em-padroes.png";
    link.href = source.toDataURL("image/png");
    link.click();
  };

  const exportSvg = () => {
    const tiles = generateVisibleTiles({ x: -2, y: -2, width: 5, height: 5 }, mode);
    const content = tiles.map((instance) => `<g transform="${matrixToSvgTransform(instance.matrix)}">${artworkSvg}</g>`).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 5 5">${content}</svg>`;
    const link = document.createElement("a");
    link.download = "ada-em-padroes.svg";
    link.href = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <PreviewShell>
      <PreviewHeader><strong>Pavimento infinito</strong><span>Arraste para explorar e use o zoom para aproximar.</span></PreviewHeader>
      <PreviewCanvas ref={canvasRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} />
      <Controls>
        <label>Zoom <input type="range" min="0.32" max="1.4" step="0.04" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} /></label>
        <button type="button" onClick={() => { setPan({ x: 0, y: 0 }); setZoom(0.72); }}>Centralizar</button>
        <button type="button" onClick={exportPng}>PNG</button>
        <button type="button" onClick={exportSvg}>SVG</button>
      </Controls>
    </PreviewShell>
  );
};

export default TessellationPreview;

const PreviewShell = styled.section`display:grid;grid-template-rows:auto minmax(360px,1fr) auto;gap:12px;min-height:0;`;
const PreviewHeader = styled.header`display:grid;gap:4px;color:#142b47;strong{font-family:${Fonts.Fredoka};font-size:24px;}span{font-family:${Fonts.GilroyMedium};color:#43596b;font-size:14px;}`;
const PreviewCanvas = styled.canvas`display:block;width:100%;height:100%;min-height:390px;border:1px solid #8eb8c0;background:#eaf5f6;touch-action:none;cursor:grab;&:active{cursor:grabbing;}`;
const Controls = styled.div`display:flex;flex-wrap:wrap;align-items:center;gap:8px;color:#43596b;font-family:${Fonts.GilroySemiBold};font-size:13px;label{display:flex;gap:7px;align-items:center;}input{accent-color:#df493c;}button{min-height:32px;padding:6px 9px;border:1px solid #b6ccd2;border-radius:4px;background:#fffef9;color:#2f4b5b;font-family:${Fonts.GilroyBold};}`;
