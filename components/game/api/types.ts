import { Field, GameId, Move, Player, PossibleCoords } from '../types';

export interface GameResponse {
  field: Field,
  currentPlayer: Player,
  possibleCoords: PossibleCoords,
  winner: Player | null,
  id: GameId,
}

export interface MoveInput extends Move {
  gameId: GameId;
}