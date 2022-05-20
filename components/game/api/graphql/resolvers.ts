import { createPubSub, filter, map, pipe } from 'graphql-yoga';
import identity from 'lodash/identity';
import { v4 as uuidv4 } from 'uuid';

import { toGameResponse } from '../utils';
import { Game } from '../../lib';
import { GameResponse, MoveInput } from '../types';
import { GameId, Move } from '../../types';



const games: {
  [k in GameId]: Game
} = {

}
const initGame = () => {
  const game = new Game();
  const id = uuidv4() as GameId;
  games[id] = game;
  return toGameResponse(id, game);
}

const getGame = (id: GameId) => {
  return games[id];
}

type PS = {
  "game": [GameResponse];
};

const bus = createPubSub<PS>();

export const resolvers = {
  Query: {
    game: (d: any, { id }: { id: GameId }): GameResponse => {
      const game = getGame(id);
      return toGameResponse(id, game);
    },
  },
  Mutation: {
    makeMove: (_: any, { move }: { move: MoveInput }): GameResponse => {
      const game = getGame(move.gameId);
      game.makeMove(move);
      const r = toGameResponse(move.gameId, game);
      bus.publish("game", r);
      return r;
    },
    initGame: (): GameResponse => {
      return initGame();
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