import { BaseController } from '@shared/base-controller';
import { ProgramName } from '@state/mainframe-state';

export class PurchaseProgramDialogButtonsController extends BaseController {
  get money(): number {
    return this.globalState.money.money;
  }

  get moneyGrowth(): number {
    return this.growthState.money.totalGrowth;
  }

  getProgramCost(programName: ProgramName, tier: number, level: number): number {
    return this.mainframeState.programs.getProgramCost(programName, tier, level);
  }

  isProgramAvailable(programName: ProgramName, tier: number, level: number): boolean {
    return this.globalState.availableItems.programs.isItemAvailable(programName, tier, level);
  }
}
