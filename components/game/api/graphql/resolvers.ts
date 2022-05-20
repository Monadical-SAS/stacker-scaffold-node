import { createPubSub, filter, map, pipe } from 'graphql-yoga';
import identity from 'lodash/identity';
import { v4 as uuidv4 } from 'uuid';

import { toGameResponse } from '../utils';
import { Game } from '../../lib';
import { GameResponse, MoveInput } from '../types';
import { GameId, Move } from '../../types';
import { queryGame, saveGame as saveDbGame } from '../../db/queries';
import { fromDbGame, toDbGame } from '../../db/utils';
import { from } from '@apollo/client';



const games: {
  [k in GameId]: Game
} = {

}
const initGame = async (): Promise<[Game, GameId]> => {
  // a bit too elaborate but it's fine
  const game = new Game();
  const dbGame = await saveDbGame(undefined, toDbGame(game));
  return [fromDbGame(dbGame), dbGame.id];
}

const getGame = async (id: GameId): Promise<Game> => {
  const dbGame = await queryGame(id);
  if (!dbGame) throw new Error(`No game ${id || "OF EMPTY ID"}`);
  return fromDbGame(dbGame);
}

const saveGame = async (id: GameId, game: Game): Promise<Game> => {
  const dbGame = await saveDbGame(id, toDbGame(game));
  return fromDbGame(dbGame);
}

type PS = {
  "game": [GameResponse];
};

const bus = createPubSub<PS>();

export const resolvers = {
  Query: {
    game: async (d: any, { id }: { id: GameId }): Promise<GameResponse> => {
      const game = await getGame(id);
      return toGameResponse(id, game);
    },
  },
  Mutation: {
    makeMove: async (_: any, { move }: { move: MoveInput }): Promise<GameResponse> => {
      const game = await getGame(move.gameId);
      game.makeMove(move);
      const updatedGame = await saveGame(move.gameId, game);
      const r = toGameResponse(move.gameId, updatedGame);
      bus.publish("game", r);
      return r;
    },
    initGame: async (): Promise<GameResponse> => {
      const [game, id] = await initGame();
      return toGameResponse(id, game);
    }
  },
  Subscription: {
    game: {
      subscribe: (_: any, { id }: { id: GameId }) => pipe(
        bus.subscribe('game'),
        filter((g) => g.id === id),
      ),
      resolve: (r: any) => r,
    }
  }
}