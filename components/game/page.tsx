import { useRouter } from "next/router";
import styled from "styled-components";

import { GameId, Player } from "./types";
import { Stacker } from "./game";
import { GameContextProvider } from "./context";

const GamePageWrapper = styled.div`
  display: flex;
`;

export const GamePage = () => {
  const router = useRouter();
  const { gameId, player: playerParam } = router.query as {
    gameId: GameId;
    player: string;
  };
  const player = playerParam as Player;
  if (!gameId) {
    return <div>No game id</div>;
  }
  if (!player) {
    return <div>No player</div>;
  }
  return (
    <GamePageWrapper>
      <GameContextProvider id={gameId} player={player}>
        <Stacker />
      </GameContextProvider>
    </GamePageWrapper>
  );
};
