import { BaseController } from '@shared/base-controller';

export class PurchaseTooltipController extends BaseController {
  get money() {
    return this.globalState.money.money;
  }

  get growth() {
    return this.globalState.moneyGrowth.totalGrowth;
  }

  get developmentLevel() {
    return this.globalState.development.level;
  }
}
