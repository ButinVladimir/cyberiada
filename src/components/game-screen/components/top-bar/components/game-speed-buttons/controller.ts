import { BaseController } from '@shared/base-controller';
import { GameSpeed } from '@state/global-state/types';

export class GameSpeedButtonsController extends BaseController {
  get gameSpeed(): GameSpeed {
    return this.globalState.gameSpeed;
  }

  changeGameSpeed(gameSpeed: GameSpeed) {
    this.globalState.gameSpeed = gameSpeed;

    this.host.requestUpdate();
  }

  fastForward() {
    this.app.fastForward();
  }
}
