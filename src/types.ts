export type TilingMode = "translation" | "rotation-180" | "reflection" | "glide-reflection";
export type EditorTool = "select" | "pencil" | "line" | "rectangle" | "ellipse" | "polygon" | "fill" | "eraser" | "edge-cut";

export interface Point {
  x: number;
  y: number;
}

export interface Matrix {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

export interface EdgeProfilePoint {
  position: number;
  offset: number;
}

export type TileEdge = "top" | "right" | "bottom" | "left";

export interface EdgeProfile {
  edge: TileEdge;
  points: EdgeProfilePoint[];
  linkedTo: TileEdge;
}

export interface TileDefinition {
  width: number;
  height: number;
  edgeProfiles: Record<TileEdge, EdgeProfile>;
}

export interface TileInstance {
  column: number;
  row: number;
  matrix: Matrix;
  colorIndex: number;
}

export interface Viewport {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TessellationProject {
  version: 1;
  name: string;
  mode: TilingMode;
  tile: TileDefinition;
  artworkSvg: string;
  createdAt: string;
}
