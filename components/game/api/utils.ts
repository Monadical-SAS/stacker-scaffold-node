import { Game } from "../lib";
import { GameResponse } from "./types";
import { GameId } from "../types";

export const toGameResponse = (id: GameId, game: Game): GameResponse => ({
  field: game.field,
  currentPlayer: game.nextPlayer(),
  possibleCoords: game.possibleCoords(),
  winner: game.tryWinner(),
  playerOneName: game.playerOneName,
  playerTwoName: game.playerTwoName,
  id,
});
