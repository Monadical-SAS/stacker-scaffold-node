import { GameId, Player } from "../types";

export interface DbGame {
  id: GameId;
  field: string;
  playerOneName: Player;
  playerTwoName: Player;
}

export type DbGameUpdate = Omit<DbGame, "id">;
