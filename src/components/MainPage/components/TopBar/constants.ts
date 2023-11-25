import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { GameStateButton } from './types';

export const GAME_STATE_BUTTONS: GameStateButton[] = [
  {
    state: 'paused',
    icon: PauseIcon,
    tooltipKey: 'pause',
  },
  {
    state: 'withoutBonusTime',
    icon: PlayArrowIcon,
    tooltipKey: 'play',
  },
  {
    state: 'withBonusTime',
    icon: FastForwardIcon,
    tooltipKey: 'fastForward',
  },
];

export const COLOR_SELECTED = 'inherit';
export const COLOR_NOT_SELECTED = 'default';
