import { GameErrorResponse, GameResponse, MoveInput } from "./api/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Coords, GameId, PlayerName } from "./types";
import { subscribeGame } from "./api/ws/client";

const Context = createContext<{
  game?: GameResponse;
  move: (cs: Coords) => void;
  isLoading: boolean;
  isMoving: boolean;
  moveError?: string;
}>({
  move: () => {
    console.debug("noop");
  },
  isLoading: false,
  isMoving: false,
});

export const useGameContext = () => useContext(Context);

export const GameContextProvider = ({
  id,
  player,
  children,
}: {
  id: GameId;
  player: PlayerName;
  children: ReactNode;
}) => {
  const [game, setGame] = useState<GameResponse | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [moveError, setMoveError] = useState<string | undefined>();
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/game/${id}`)
      .then(async (r) => {
        const g = (await r.json()) as GameResponse;
        setGame(g);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    const unsubscribe = subscribeGame(id).then(([games, unsubscribe]) => {
      const gameSub = games.subscribe((game) => {
        setGame(game);
      });
      return () => {
        unsubscribe();
        gameSub.unsubscribe();
      };
    });
    return () => {
      unsubscribe.then((run) => run());
    };
  }, [id]);

  const move = useCallback(
    (coords: Coords) => {
      setIsMoving(true);
      setMoveError(undefined);
      fetch("/api/game/move", {
        body: JSON.stringify({
          coords,
          player,
          gameId: id,
        } as MoveInput),
        method: "POST",
      })
        .then(async (r) => {
          if (!r.ok) {
            const er = (await r.json()) as GameErrorResponse;
            alert(er.message);
            setMoveError(er.message);
          }
        })
        .finally(() => setIsMoving(false));
    },
    [id, player]
  );

  return (
    <Context.Provider
      value={{
        game,
        move,
        moveError,
        isLoading,
        isMoving,
      }}
    >
      {children}
    </Context.Provider>
  );
};
