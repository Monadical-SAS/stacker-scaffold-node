import { DbGame, DbGameUpdate } from "./types";
import { Game } from "../lib";

export const toDbGame = (game: Game): DbGameUpdate => ({
  field: JSON.stringify(game.field),
  playerOneName: game.playerOneName,
  playerTwoName: game.playerTwoName,
  gameType: game.gameType,
});

export const fromDbGame = (game: DbGame): Game =>
  new Game(
    JSON.parse(game.field) as Game["field"],
    game.playerOneName as Game["playerOneName"],
    game.playerTwoName as Game["playerTwoName"],
    game.gameType as Game["gameType"]
  );
