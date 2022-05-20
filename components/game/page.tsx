import { useRouter } from "next/router";
import styled from "styled-components";

import { GameId, Player, PlayerName } from './types';
import { Stacker } from './game';

const GamePageWrapper = styled.div`
  display: flex;
`;

export const GamePage = () => {
  const router = useRouter();
  const { gameId, player: playerParam } = router.query as { gameId: GameId; player: string; };
  const player = parseInt(playerParam, 10) as Player;
  if (!gameId) {
    return <div>No game id</div>;
  }
  if (!player) {
    return <div>No player</div>;
  }
  return (
    <GamePageWrapper>
      <Stacker gameId={gameId} player={player} />
    </GamePageWrapper>
  );
};
