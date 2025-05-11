import { BaseController } from '@shared/base-controller';
import { ProgramName } from '@state/mainframe-state';

export class PurchaseProgramDialogButtonsController extends BaseController {
  get money(): number {
    return this.globalState.money.money;
  }

  get moneyGrowth(): number {
    return this.growthState.money.totalGrowth;
  }

  getProgramCost(programName: ProgramName, quality: number, level: number): number {
    return this.mainframeState.programs.getProgramCost(programName, quality, level);
  }

  isProgramAvailable(programName: ProgramName, quality: number, level: number): boolean {
    return this.globalState.availableItems.programs.isItemAvailable(programName, quality, level);
  }
}
