import { io, Socket } from "socket.io-client";

let socket: Socket;
let fetchPromise: Promise<void>;
let connectPromise: Promise<Socket>;

export const fetchSocket = async () => {
  fetchPromise = fetchPromise || fetch("/api/socket");
  await fetchPromise;
  socket = socket || io();
  connectPromise =
    connectPromise ||
    new Promise<Socket>((ok) => {
      socket.on("connect", () => {
        ok(socket);
      });
    });
  return connectPromise;
};
