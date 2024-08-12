import { GameSpeed } from '@state/general-state/types';

export interface GameSpeedButtonProps {
  label: string;
  gameSpeed: GameSpeed;
  icon: string;
  className: string;
}
