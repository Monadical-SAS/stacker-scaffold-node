import { useRouter } from "next/router";
import React, { SyntheticEvent, useCallback, useState } from "react";
import { GameId, GameType, Player } from "./game/types";
import { useInitGame } from "./game/api/useInitGame";
import { AUTOMATICMODE, AUTOMATICPLAYERNAME } from "./game/constants";

const setPlayerTwoName = async (gameId: GameId, playerTwoName?: Player) => {
  const res = await fetch("/api/game/setPlayerTwo", {
    method: "POST",
    body: JSON.stringify({
      playerTwo: playerTwoName,
      gameId: gameId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

const setGameMode = async (gameId: GameId, gameType: GameType) => {
  const res = await fetch("/api/game/setGameType", {
    method: "POST",
    body: JSON.stringify({
      gameType,
      gameId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

const useRedirectToGame = () => {
  const router = useRouter();
  return useCallback(
    async (gameId: GameId, playerOneName?: Player, playerTwoName?: Player) => {
      if (playerOneName !== undefined) {
        router.push(`/game/${gameId}/${playerOneName}`);
      } else if (playerTwoName !== undefined) {
        const res = await setPlayerTwoName(gameId, playerTwoName);
        if (res.ok) {
          router.push(`/game/${gameId}/${playerTwoName}`);
        }
      }
    },
    [router]
  );
};

const useCreateGame = () => {
  const { mutate, loading } = useInitGame();
  return useCallback(
    async (playerForNewGame: Player) => {
      if (loading) return;
      return mutate(playerForNewGame);
    },
    [mutate, loading]
  );
};

export function HomePage() {
  const redirectToGame = useRedirectToGame();
  const [playerForExistingGameInput, setPlayerForExistingGame] = useState("");
  const [playerForNewGameInput, setPlayerForNewGame] = useState("");
  const handlePlayerForNewGameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPlayerForNewGame(e.currentTarget.value as any);
    },
    [setPlayerForNewGame]
  );
  const handlePlayerForExistingGameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPlayerForExistingGame(e.currentTarget.value as any);
    },
    [setPlayerForExistingGame]
  );
  const playerForNewGame = playerForNewGameInput as Player;
  const playerForExistingGame = playerForExistingGameInput as Player;
  const [idOfExistingGame, setIdOfExistingGame] = useState("");
  const createGame = useCreateGame();
  const handleAutomaticGameSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const gameId = await createGame(playerForNewGame);
      await setGameMode(gameId!, AUTOMATICMODE);
      await setPlayerTwoName(gameId!, AUTOMATICPLAYERNAME);
      redirectToGame(gameId!, playerForNewGame, undefined);
    },
    [createGame, playerForNewGame, redirectToGame]
  );
  const handleJoinGameSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const gameId = await createGame(playerForNewGame);
      await setGameMode(gameId!, "twoPlayerGame" as GameType);
      redirectToGame(gameId!, playerForNewGame, undefined);
    },
    [createGame, playerForNewGame, redirectToGame]
  );
  const handleRedirectToGame = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      if (!idOfExistingGame) return;
      redirectToGame(
        idOfExistingGame as GameId,
        undefined,
        playerForExistingGame
      );
    },
    [playerForExistingGame, idOfExistingGame, redirectToGame]
  );
  return (
    <div className="App">
      <h1 id="main-title">Side Stacker</h1>
      <div className="home-actions">
        <form className="join-game" onSubmit={handleAutomaticGameSubmit}>
          <div className="form-group">
            <input
              placeholder="Username"
              type="text"
              name="playerOne"
              onChange={handlePlayerForNewGameChange}
            />
            <button type="submit" className="start-game">
              Play with bot
            </button>
          </div>
        </form>
        <p>-- or --</p>
        <form className="join-game" onSubmit={handleJoinGameSubmit}>
          <div className="form-group">
            <input
              placeholder="Username"
              type="text"
              name="playerOne"
              onChange={handlePlayerForNewGameChange}
            />
            <button type="submit" className="start-game">
              Start New Game
            </button>
          </div>
        </form>
        <p>-- or --</p>
        <form className="join-game" onSubmit={handleRedirectToGame}>
          <div className="form-group">
            <input
              placeholder="Username"
              type="text"
              name="playerTwo"
              onChange={handlePlayerForExistingGameChange}
            />
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
