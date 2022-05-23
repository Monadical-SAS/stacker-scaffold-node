import { NextApiRequest, NextApiResponse } from "next";
import { GameId } from "../../../components/game/types";
import { toGameResponse } from "../../../components/game/api/utils";
import { initGame } from "../../../components/game/api/utils/server";
import { gameBus } from "../../../components/game/bus";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameId>
) {
  const [game, id] = await initGame();
  gameBus.value.publishGame(toGameResponse(id, game));
  res.status(200).json(id);
}
