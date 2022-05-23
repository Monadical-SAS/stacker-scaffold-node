import { NextApiRequest, NextApiResponse } from "next";
import { GameResponse } from "../../../components/game/api/types";
import { toGameResponse } from "../../../components/game/api/utils";
import { GameId } from "../../../components/game/types";
import { getGame } from "../../../components/game/api/utils/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameResponse>
) {
  const { id } = req.query as { id: GameId };
  const game = await getGame(id);
  const r = toGameResponse(id, game);
  res.status(200).json(r);
}
