import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { GameSpeedState } from '@state/gameState';

export interface GameStateButton {
  state: GameSpeedState;
  tooltipKey: string;
  icon: OverridableComponent<SvgIconTypeMap<unknown>> & { muiName: string; };
}
