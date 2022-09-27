import { NextApiRequest, NextApiResponse } from "next";
import { GameId, GameType } from "../../../components/game/types";
import { getGame } from "../../../components/game/api/utils/server";
import { saveGame as saveDbGame } from "../../../components/game/db/queries";
import { toDbGame } from "../../../components/game/db/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameId>
) {
  const gameId = req.body.gameId;
  const gameType = req.body.gameType;
  const game = await getGame(gameId);
  game.setGameType(gameType as GameType);
  const dbGame = await saveDbGame(gameId, toDbGame(game));
  res.status(200).json(dbGame.id);
}
