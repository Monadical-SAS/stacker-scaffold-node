import { Server } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { handleConnection } from "../../components/game/api/ws/server";

interface CustomNextApiResponse<T = any> extends NextApiResponse<T> {
  socket: any; // TODO typings
}

const SocketHandler = (req: NextApiRequest, res: CustomNextApiResponse) => {
  /*
  TODO may need this
   const oldOne = res.socket.server.apolloServer
  if (
    //we need compare old apolloServer with newOne, becasue after hot-reload are not equals
    oldOne &&
    oldOne !== apolloServer
  ) {
    console.warn('FIXING HOT RELOAD !!!!!!!!!!!!!!! ')
    delete res.socket.server.apolloServer
  }
   */
  if (!res.socket?.server?.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
  }
  handleConnection(res.socket.server.io);
  res.end();
};

export default SocketHandler;
