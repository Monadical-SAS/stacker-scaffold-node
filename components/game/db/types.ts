import { GameId } from '../types';


export interface DbGame {
  id: GameId;
  field: string;
}

export type DbGameUpdate = Omit<DbGame, "id">;