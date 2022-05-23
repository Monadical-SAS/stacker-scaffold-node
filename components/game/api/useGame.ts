import { useGameContext } from "../context";

export const useGame = () => {
  const { game, isLoading } = useGameContext();
  return {
    game,
    isLoading,
  };
};
