import { BaseController } from '@shared/base-controller';

export class PurchaseTooltipController extends BaseController {
  get money() {
    return this.globalState.money.money;
  }

  get growth() {
    return this.growthState.moneyGrowth.totalGrowth;
  }

  get developmentLevel() {
    return this.globalState.development.level;
  }
}
