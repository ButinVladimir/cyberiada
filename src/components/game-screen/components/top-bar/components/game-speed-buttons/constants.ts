import { msg } from '@lit/localize';
import { GameSpeed } from '@state/global-state/types';

export const GAME_SPEED_TEXTS: Record<GameSpeed, () => string> = {
  [GameSpeed.paused]: () => msg('Pause'),
  [GameSpeed.normal]: () => msg('Play on normal speed (without accumulated time)'),
  [GameSpeed.fast]: () => msg('Play on fast speed (with accumulated time)'),
};
