import { Field, GameId, Move, Player, PossibleCoords } from "../types";

export interface GameResponse {
  field: Field;
  currentPlayer: Player;
  possibleCoords: PossibleCoords;
  winner: Player | null;
  id: GameId;
  playerOneName: Player;
  playerTwoName: Player;
}

export interface GameErrorResponse {
  message: string;
}

export interface MoveInput extends Move {
  gameId: GameId;
}
