import { GameId, Move } from "../../types";
import { Game } from "../../lib";
import { queryGame, saveGame as saveDbGame } from "../../db/queries";
import { fromDbGame, toDbGame } from "../../db/utils";

export const getGame = async (id: GameId): Promise<Game> => {
  const dbGame = await queryGame(id);
  if (!dbGame) throw new Error(`No game ${id || "OF EMPTY ID"}`);
  return fromDbGame(dbGame);
};

export const saveGame = async (id: GameId, game: Game): Promise<Game> => {
  const dbGame = await saveDbGame(id, toDbGame(game));
  return fromDbGame(dbGame);
};

export const initGame = async (): Promise<[Game, GameId]> => {
  // a bit too elaborate but it's fine
  const game = new Game();
  const dbGame = await saveDbGame(undefined, toDbGame(game));
  return [fromDbGame(dbGame), dbGame.id];
};

export const validateMove = (m: Move, g: Game): string | null => {
  if (!g.areCoordsValid(m.coords))
    return `Coords x ${m.coords.x} y ${m.coords.y} aren't valid for this game`;
  if (g.tryWinner()) return "Game already done";
  if (g.nextPlayer() !== m.player)
    return `Player ${m.player} is not expected. Expected: ${g.nextPlayer()}`;
  return null;
};
