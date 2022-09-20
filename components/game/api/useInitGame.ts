import { useCallback, useState } from "react";
import { GameId, PlayerName } from "../types";

export const useInitGame = () => {
  const [loading, setLoading] = useState(false);
  const init = useCallback(async (PlayerOneName: PlayerName) => {
    setLoading(true);
    try {
      const res = await fetch("/api/game/init", {
        method: "POST",
        body: JSON.stringify({ playerOne: PlayerOneName }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err);
      }
      return (await res.json()) as GameId;
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    loading,
    mutate: init,
  };
};
