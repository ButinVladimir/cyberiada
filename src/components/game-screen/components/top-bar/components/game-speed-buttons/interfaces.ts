import { GameSpeed } from '@state/global-state/types';

export interface GameSpeedButtonProps {
  label: string;
  gameSpeed: GameSpeed;
  icon: string;
  isActive: boolean;
}
