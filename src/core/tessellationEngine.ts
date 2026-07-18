import {
  EdgeProfile,
  EdgeProfilePoint,
  Matrix,
  Point,
  TileDefinition,
  TileEdge,
  TileInstance,
  TilingMode,
  Viewport,
} from "types";

const identity = (): Matrix => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 });

export const multiplyMatrices = (left: Matrix, right: Matrix): Matrix => ({
  a: left.a * right.a + left.c * right.b,
  b: left.b * right.a + left.d * right.b,
  c: left.a * right.c + left.c * right.d,
  d: left.b * right.c + left.d * right.d,
  e: left.a * right.e + left.c * right.f + left.e,
  f: left.b * right.e + left.d * right.f + left.f,
});

export const transformPoint = (point: Point, matrix: Matrix): Point => ({
  x: point.x * matrix.a + point.y * matrix.c + matrix.e,
  y: point.x * matrix.b + point.y * matrix.d + matrix.f,
});

export const createDefaultEdgeProfile = (edge: TileEdge, linkedTo: TileEdge): EdgeProfile => ({
  edge,
  linkedTo,
  points: [
    { position: 0, offset: 0 },
    { position: 0.5, offset: 0 },
    { position: 1, offset: 0 },
  ],
});

export const createDefaultTile = (): TileDefinition => ({
  width: 1,
  height: 1,
  edgeProfiles: {
    top: createDefaultEdgeProfile("top", "bottom"),
    right: createDefaultEdgeProfile("right", "left"),
    bottom: createDefaultEdgeProfile("bottom", "top"),
    left: createDefaultEdgeProfile("left", "right"),
  },
});

export const createLinkedProfile = (edge: TileEdge, linkedTo: TileEdge, points: EdgeProfilePoint[]): EdgeProfile => ({
  edge,
  linkedTo,
  points: points.map((point) => ({
    position: 1 - point.position,
    offset: -point.offset,
  })).reverse(),
});

export const applyEdgeProfile = (
  tile: TileDefinition,
  edge: TileEdge,
  points: EdgeProfilePoint[]
): TileDefinition => {
  const linkedTo = tile.edgeProfiles[edge].linkedTo;
  const next = structuredClone(tile);
  next.edgeProfiles[edge].points = points;
  next.edgeProfiles[linkedTo] = createLinkedProfile(linkedTo, edge, points);
  return next;
};

const profilesMatch = (first: EdgeProfile, second: EdgeProfile) => {
  if (first.points.length !== second.points.length) return false;
  return first.points.every((point, index) => {
    const counterpart = second.points[second.points.length - 1 - index];
    return Math.abs(point.position - (1 - counterpart.position)) < 0.0001
      && Math.abs(point.offset + counterpart.offset) < 0.0001;
  });
};

export const validateTileEdges = (tile: TileDefinition) => ({
  valid: profilesMatch(tile.edgeProfiles.top, tile.edgeProfiles.bottom)
    && profilesMatch(tile.edgeProfiles.left, tile.edgeProfiles.right),
  messages: [
    profilesMatch(tile.edgeProfiles.top, tile.edgeProfiles.bottom) ? null : "As bordas superior e inferior nao se encaixam.",
    profilesMatch(tile.edgeProfiles.left, tile.edgeProfiles.right) ? null : "As bordas laterais nao se encaixam.",
  ].filter((message): message is string => Boolean(message)),
});

export const getTileMatrix = (mode: TilingMode, column: number, row: number): Matrix => {
  const base = { ...identity(), e: column, f: row };

  if (mode === "translation") return base;

  if (mode === "rotation-180" && (column + row) % 2 !== 0) {
    return multiplyMatrices(base, { a: -1, b: 0, c: 0, d: -1, e: 1, f: 1 });
  }

  if (mode === "reflection" && column % 2 !== 0) {
    return multiplyMatrices(base, { a: -1, b: 0, c: 0, d: 1, e: 1, f: 0 });
  }

  if (mode === "glide-reflection" && row % 2 !== 0) {
    return multiplyMatrices(base, { a: 1, b: 0, c: 0, d: -1, e: 0.5, f: 1 });
  }

  return base;
};

export const generateVisibleTiles = (
  viewport: Viewport,
  mode: TilingMode,
  padding = 1
): TileInstance[] => {
  const startColumn = Math.floor(viewport.x) - padding;
  const endColumn = Math.ceil(viewport.x + viewport.width) + padding;
  const startRow = Math.floor(viewport.y) - padding;
  const endRow = Math.ceil(viewport.y + viewport.height) + padding;
  const instances: TileInstance[] = [];

  for (let row = startRow; row <= endRow; row += 1) {
    for (let column = startColumn; column <= endColumn; column += 1) {
      instances.push({
        column,
        row,
        matrix: getTileMatrix(mode, column, row),
        colorIndex: Math.abs(column + row * 3) % 4,
      });
    }
  }

  return instances;
};

export const matrixToSvgTransform = (matrix: Matrix) =>
  `matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f})`;
