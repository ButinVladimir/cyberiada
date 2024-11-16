import { BaseController } from '@shared/base-controller';

export class StatisticsGeneralPanelController extends BaseController {
  get gameTime() {
    return this.globalState.time.gameTime;
  }

  get gameTimeTotal() {
    return this.globalState.time.gameTimeTotal;
  }
}
