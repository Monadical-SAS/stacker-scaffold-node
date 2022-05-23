import { GameId } from "../../types";
import { Server } from "socket.io";
import { queryGame } from "../../db/queries";
import { fromDbGame } from "../../db/utils";
import { toGameResponse } from "../utils";
import { GameResponse } from "../types";
import { gameBus, publishGame } from "../../bus";

export const handleConnection = (io: Server) => {
  let connected = false;
  io.once("connection", (socket) => {
    connected = true;
    socket.on("subscribe", async (id: GameId) => {
      const observable = gameBus.value.subscribeToGame(id);
      const observableUnsubscribe = observable.subscribe((g: GameResponse) => {
        socket.emit("game", g);
      });

      const initialGame = await queryGame(id);
      if (initialGame) {
        publishGame(toGameResponse(initialGame.id, fromDbGame(initialGame)));
      }

      socket.on("disconnect", () => {
        observableUnsubscribe.unsubscribe();
      });

      socket.on("unsubscribe", () => {
        observableUnsubscribe.unsubscribe();
      });
    });
  });
};
