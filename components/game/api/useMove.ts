import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { MAKE_MOVE } from './graphql/queries';
import { GameResponse, MoveInput } from './types';

export const useMove = () => {
  const [mutate, others] = useMutation<{game: GameResponse}, {
    move: MoveInput,
  }>(MAKE_MOVE, {
    // refetchQueries: [GET_GAME],
  });
  const makeMove = useCallback(async (move: MoveInput) => {
    mutate({ // can await
      variables: {
        move
      }
    });
  }, [mutate]);

  return {
    ...others,
    mutate: makeMove,
  }
};