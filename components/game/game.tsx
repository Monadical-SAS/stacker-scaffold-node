import { useGame } from './api/useGame';
import { useMove } from './api/useMove';
import { Cell, GameId, Player, X, Y } from './types';
import { useCallback, useMemo } from 'react';
import cx from "classnames";
import { GameResponse } from './api/types';

interface Props {
  player: Player,
  gameId: GameId,
}

interface WithOnMove {
  onMove: (ci: X, ri: Y) => void;
}

interface CellProps extends WithOnMove {
  rowIndex: Y;
  columnIndex: X;
  player: Cell;
  available: boolean;
}

const Cell = ({ rowIndex, columnIndex, onMove, player, available }: CellProps) => {
  const handleClick = useCallback(() => {
    onMove(columnIndex, rowIndex);
  }, [onMove, columnIndex, rowIndex]);
  return (
    <div
      className={cx(
        "cell",
        {
          empty: !player,
        },
        player === 1 ? "red" : player === 2 ? "yellow" : null,
        !available && !player && "unavailable"
      )}
      onClick={handleClick}
    />
  );
};

const Board = ({ onMove, game }: WithOnMove & {
  game: GameResponse,
}) => {
  const possibleCoords = game.possibleCoords;
  const hashCoords = (x: X, y: Y) => `x:${x}:y:${y}`;
  const possibleCoordsSet = useMemo(() => new Set(possibleCoords.map(({x, y}) => hashCoords(x, y))), [possibleCoords]);
  const isPossible = useCallback((x: X, y: Y) => possibleCoordsSet.has(hashCoords(x, y)), [possibleCoordsSet]);
  const handleOnMove = useCallback((x: X, y: Y) => {
    if (!possibleCoords.find(({ x: px, y: py }) => px === x && py === y)) return; // TODO left/right computation
    onMove(x, y);
  }, [possibleCoords, onMove]);
  return (
    <div className="board">
      {Array.from(Array(game.field.length).keys()).map((ri) => (
        <div className="row" key={ri}>
          {Array.from(Array(game.field[0].length).keys()).map((ci) => {
            const x = ci as X;
            const y = ri as Y;
            return (
              <Cell key={hashCoords(x, y)} rowIndex={y} columnIndex={x} onMove={handleOnMove} player={game.field[ri][ci]} available={isPossible(x, y)} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const useOnMove = ({ gameId, player }: Props) => {
  const { mutate: makeMove } = useMove();
  return useCallback((x: X, y: Y) => {
    makeMove({
      player,
      coords: {
        x, y
      },
      gameId
    })
  }, [makeMove, gameId, player]);
}

export const Stacker = ({ gameId, player }: Props) => {

  const { game, loading, error } = useGame(gameId);
  const handleOnMove = useOnMove({ gameId, player });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!game) return <div>No game (platform PS?)</div>;
  return <Board onMove={handleOnMove} game={game!} />;
};