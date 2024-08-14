import { BaseController } from '@shared/base-controller';
import { GameSpeed } from '@state/general-state/types';

export class GameSpeedButtonsController extends BaseController {
  get gameSpeed(): GameSpeed {
    return this.generalState.gameSpeed;
  }

  changeGameSpeed(gameSpeed: GameSpeed) {
    this.generalState.changeGameSpeed(gameSpeed);
    this.host.requestUpdate();
  }
}
