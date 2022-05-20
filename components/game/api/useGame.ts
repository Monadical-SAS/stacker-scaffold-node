import { GameId } from '../types';
import { useQuery, useSubscription } from '@apollo/client';
import { GameResponse } from './types';
import { GAME_SUBSCRIPTION, GET_GAME } from './graphql/queries';
import { useEffect } from 'react';

export const useGame = (id: GameId) => {
  const { subscribeToMore, data, ...others } = useQuery<{game: GameResponse | null}>(GET_GAME, {
    variables: {
      id
    }
  });
  useEffect(() => {
    const destroy = subscribeToMore<{game: GameResponse}>({
      document: GAME_SUBSCRIPTION,
      variables: {
        id
      },
      updateQuery: (prev, { subscriptionData }) => {
        return subscriptionData.data.game ? subscriptionData.data : {
          game: null,
        };
      }
    });
    return destroy;
  }, [subscribeToMore, id]);
  return {
    game: data?.game || null,
    ...others,
  };
}