import { GameResponse } from "../api/types";
import { GameId } from "../types";
import { connectable, filter, Subject } from "rxjs";
import { GlobalRef } from "../../globalRef";

const subject = new Subject<GameResponse>();

export const subscribeToGame = (id: GameId) =>
  subject.pipe(filter((g) => g.id === id));

export const publishGame = (g: GameResponse) => {
  subject.next(g);
};

export const gameBusRef = new GlobalRef<GameBus>("myapp.database");

if (!gameBusRef.value) {
  gameBusRef.value = {
    subscribeToGame,
    publishGame,
  };
}

export const gameBus = gameBusRef;

export interface GameBus {
  subscribeToGame: typeof subscribeToGame;
  publishGame: typeof publishGame;
}
