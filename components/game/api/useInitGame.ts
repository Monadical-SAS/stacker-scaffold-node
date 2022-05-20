import { useMutation } from '@apollo/client';
import { INIT_GAME } from './graphql/queries';
import { GameResponse } from './types';

export const useInitGame = () => {
  const [mutate, others] = useMutation<{initGame: GameResponse}>(INIT_GAME);
  return {
    ...others,
    mutate
  }
}