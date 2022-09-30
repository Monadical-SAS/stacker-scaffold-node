import { useCallback, useState } from "react";
import { GameId, Player } from "../types";

export const useInitGame = () => {
  const [loading, setLoading] = useState(false);
  const init = useCallback(async (playerOneName: Player) => {
    setLoading(true);
    try {
      const res = await fetch("/api/game/init", {
        method: "POST",
        body: JSON.stringify({ playerOne: playerOneName }),
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
