import { GameId, PlayerName } from "../types";

export interface DbGame {
  id: GameId;
  field: string;
  playerOneName: PlayerName;
  playerTwoName: PlayerName;
}

export type DbGameUpdate = Omit<DbGame, "id">;
