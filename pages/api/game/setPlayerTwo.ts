import { NextApiRequest, NextApiResponse } from "next";
import { GameId } from "../../../components/game/types";
import { getGame } from "../../../components/game/api/utils/server";
import { saveGame as saveDbGame } from "../../../components/game/db/queries";
import { toDbGame } from "../../../components/game/db/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameId>
) {
  const gameId = req.body.gameId;
  const game = await getGame(gameId);
  game.setPlayerName(req.body.playerTwo, 2);
  const dbGame = await saveDbGame(gameId, toDbGame(game));
  res.status(200).json(dbGame.id);
}
