import { BaseController } from '@shared/base-controller';

export class MainframeHardwarePanelArticleButtonsController extends BaseController {
  get developmentLevel() {
    return this.globalState.development.level;
  }

  get money(): number {
    return this.globalState.money.money;
  }

  get moneyGrowth(): number {
    return this.growthState.money.totalGrowth;
  }
}
