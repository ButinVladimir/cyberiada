import { GENERAL_STATE_UI_EVENTS } from '@state/general-state/constants';
import { BaseController } from '@shared/base-controller';
import { GameSpeed } from '@state/general-state/types';

export class GameSpeedButtonsController extends BaseController {
  hostConnected() {
    this.generalState.addUiEventListener(GENERAL_STATE_UI_EVENTS.CHANGED_GAME_SPEED, this.handleChangeGameSpeed);
  }

  hostDisconnected() {
    this.generalState.removeUiEventListener(GENERAL_STATE_UI_EVENTS.CHANGED_GAME_SPEED, this.handleChangeGameSpeed);
  }

  get gameSpeed(): GameSpeed {
    return this.generalState.gameSpeed;
  }

  changeGameSpeed(gameSpeed: GameSpeed) {
    this.generalState.changeGameSpeed(gameSpeed);
  }

  handleChangeGameSpeed = () => {
    this.host.requestUpdate();
  }
}