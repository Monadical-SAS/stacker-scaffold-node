import { useGameContext } from "../context";

export const useMove = () => {
  const { move, isMoving, moveError } = useGameContext();

  return {
    loading: isMoving,
    error: moveError,
    mutate: move,
  };
};
