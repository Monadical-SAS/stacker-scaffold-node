import { GameId } from "../../types";
import { fetchSocket } from "../../../socket/client";
import { GameResponse } from "../types";
import { Subject } from "rxjs";

export const subscribeGame = async (gameId: GameId) => {
  const socket = await fetchSocket();
  socket.emit("subscribe", gameId);
  const subject = new Subject<GameResponse>();
  const handler = (g: GameResponse) => {
    subject.next(g);
  };
  socket.on("game", handler);
  return [
    subject.asObservable(),
    () => {
      socket.emit("unsubscribe", gameId);
      socket.off("game", handler);
      subject.unsubscribe();
    },
  ] as const;
};
