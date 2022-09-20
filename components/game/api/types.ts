import {
  Field,
  GameId,
  Move,
  Player,
  PlayerName,
  PossibleCoords,
} from "../types";

export interface GameResponse {
  field: Field;
  currentPlayer: PlayerName;
  possibleCoords: PossibleCoords;
  winner: Player | null;
  id: GameId;
  playerOneName: PlayerName;
  playerTwoName: PlayerName;
}

export interface GameErrorResponse {
  message: string;
}

export interface MoveInput extends Move {
  gameId: GameId;
}
