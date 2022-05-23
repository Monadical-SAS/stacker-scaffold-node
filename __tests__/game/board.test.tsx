import { render } from '@testing-library/react'
import { Game } from '../../components/game/lib';
import { Board, hashCoords } from '../../components/game/game';
import { toGameResponse } from '../../components/game/api/utils';
import { GameId, X, Y } from '../../components/game/types';

describe("Game board", () => {
  it("can click", () => {
    const game = new Game();
    const handleOnMove = jest.fn();
    const { getByTestId } = render(<Board onMove={handleOnMove} game={toGameResponse("test" as GameId, game)} />);
    getByTestId(`cell-${hashCoords(0 as X, 0 as Y)}`).click();
    expect(handleOnMove.mock.calls[0]).toEqual([0, 0]);
  });
});