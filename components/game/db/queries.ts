import { PrismaClient } from "@prisma/client";
import { GameId } from "../types";
import { DbGame, DbGameUpdate } from "./types";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

export const queryGame = async (id: GameId): Promise<DbGame | null> => {
  const res = await prisma.game.findUnique({
    where: {
      id,
    },
  });
  if (!res) return null;
  return {
    ...res,
    id: res.id as GameId,
  };
};

export const saveGame = async (
  id: GameId | undefined = uuidv4() as GameId,
  game: DbGameUpdate
): Promise<DbGame> => {
  const res = await prisma.game.upsert({
    where: { id },
    create: game,
    update: game,
  });
  return {
    ...res,
    id: res.id as GameId,
  };
};
