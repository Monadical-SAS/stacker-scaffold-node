import { NextApiRequest, NextApiResponse } from "next";
import {
  GameErrorResponse,
  GameResponse,
  MoveInput,
} from "../../../components/game/api/types";
import { toGameResponse } from "../../../components/game/api/utils";
import {
  getGame,
  saveGame,
  validateMove,
} from "../../../components/game/api/utils/server";
import { gameBus } from "../../../components/game/bus";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameResponse | GameErrorResponse>
) {
  const move = JSON.parse(req.body) as MoveInput;
  const game = await getGame(move.gameId);
  const error = validateMove(move, game);
  if (error) return res.status(400).json({ message: error });
  game.makeMove(move);
  const updatedGame = await saveGame(move.gameId, game);
  const r = toGameResponse(move.gameId, updatedGame);
  gameBus.value.publishGame(r);
  res.status(200).json(r);
}
