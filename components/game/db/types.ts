import { GameId, GameType, Player } from "../types";

export interface DbGame {
  id: GameId;
  field: string;
  playerOneName: Player;
  playerTwoName: Player;
  gameType: GameType;
}

export type DbGameUpdate = Omit<DbGame, "id">;
