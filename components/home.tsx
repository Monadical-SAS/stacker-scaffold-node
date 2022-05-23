import { useRouter } from "next/router";
import React, { SyntheticEvent, useCallback, useState } from "react";
import { GameId, Player } from "./game/types";
import { PLAYER1, PLAYER2 } from "./game/constants";
import { useInitGame } from "./game/api/useInitGame";

const useRedirectToGame = () => {
  const router = useRouter();
  return useCallback(
    (gameId: GameId, player: Player) => {
      router.push(`/game/${gameId}/${player}`);
    },
    [router]
  );
};

const useCreateGame = () => {
  const { mutate, loading } = useInitGame();
  return useCallback(async () => {
    if (loading) return;
    return mutate();
  }, [mutate, loading]);
};

export function HomePage() {
  const redirectToGame = useRedirectToGame();
  const [playerForExistingGameInput, setPlayerForExistingGame] = useState(
    `${PLAYER1}`
  );
  const [playerForNewGameInput, setPlayerForNewGame] = useState(`${PLAYER1}`);
  const handlePlayerForNewGameChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPlayerForNewGame(e.currentTarget.value as any);
    },
    [setPlayerForNewGame]
  );
  const handlePlayerForExistingGameChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPlayerForExistingGame(e.currentTarget.value as any);
    },
    [setPlayerForExistingGame]
  );
  const playerForNewGame = parseInt(playerForNewGameInput, 10) as Player;
  const playerForExistingGame = parseInt(
    playerForExistingGameInput!,
    10
  ) as Player;
  const [idOfExistingGame, setIdOfExistingGame] = useState("");
  const createGame = useCreateGame();
  const handleJoinGameSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const gameId = await createGame();
      redirectToGame(gameId!, playerForNewGame);
    },
    [createGame, playerForNewGame, redirectToGame]
  );
  const handleRedirectToGame = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      if (!idOfExistingGame) return;
      redirectToGame(idOfExistingGame as GameId, playerForExistingGame);
    },
    [playerForExistingGame, idOfExistingGame, redirectToGame]
  );
  return (
    <div className="App">
      <h1 id="main-title">Side Stacker</h1>
      <div className="home-actions">
        <form className="join-game" onSubmit={handleJoinGameSubmit}>
          <div className="form-group">
            <select
              defaultValue={playerForNewGameInput}
              onChange={handlePlayerForNewGameChange}
            >
              <option value={`${PLAYER1}`}>First Player</option>
              <option value={`${PLAYER2}`}>Second Player</option>
            </select>
            <button type="submit" className="start-game">
              Start New Game
            </button>
          </div>
        </form>
        <p>-- or --</p>
        <form className="join-game" onSubmit={handleRedirectToGame}>
          <div className="form-group">
            <select
              defaultValue={playerForExistingGameInput}
              onChange={handlePlayerForExistingGameChange}
            >
              <option value={`${PLAYER1}`}>First Player</option>
              <option value={`${PLAYER2}`}>Second Player</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Game ID"
              name="game_key"
              id="game-key"
              value={idOfExistingGame}
              onChange={(e) => setIdOfExistingGame(e.target.value)}
            />
          </div>
          <button type="submit">Join Game!</button>
        </form>
      </div>
    </div>
  );
}
