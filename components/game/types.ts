export interface Move {
  player: Player;
  coords: Coords;
}

export interface Coords {
  x: X;
  y: Y;
}

type Brand<K, T> = K & { __brand: T };

export type Player1 = Brand<string, "p1">;
export type Player2 = Brand<string, "p1">;
export type Player = Player1 | Player2;
export type X = Brand<0 | 1 | 2 | 3 | 4 | 5 | 6, "X">;
export type Y = Brand<0 | 1 | 2 | 3 | 4 | 5 | 6, "Y">;
export type Empty = Brand<0, "Empty">;
export type Cell = Player | Empty;
export type Field = Cell[][];
export type GameId = Brand<string, "GameId">;
export type PlayerName = Brand<string, "PlayerName">;

export type PossibleCoords = Coords[];
