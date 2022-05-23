import { Game } from '../../components/game/lib';
import { Player, X, Y } from '../../components/game/types';

describe('Game', () => {
  it('can make a move', () => {
    const game = new Game();
    const coords = {
      x: 0 as X,
      y: 0 as Y
    };
    expect(game.areCoordsValid(coords)).toBeTruthy()
    game.makeMove({
      player: 1 as Player,
      coords
    });
    expect(game.areCoordsValid(coords)).toBeFalsy()
  })
})