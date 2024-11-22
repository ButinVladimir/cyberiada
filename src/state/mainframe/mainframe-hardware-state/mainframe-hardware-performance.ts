import { IExponent } from '@shared/interfaces';
import { PurchaseEvent } from '@shared/types';
import { MainframeHardwareParameter } from './mainframe-hardware-parameter';
import { MainframeHardwareParameterType } from './types';

export class MainframeHardwarePerformance extends MainframeHardwareParameter {
  readonly type: MainframeHardwareParameterType = 'performance';

  protected get priceExp(): IExponent {
    return this.scenarioState.currentValues.mainframeHardware.performancePrice;
  }

  protected get purchaseEvent(): PurchaseEvent {
    return PurchaseEvent.performanceUpgraded;
  }

  async startNewState(): Promise<void> {
    await super.startNewState();

    this._level = this.scenarioState.currentValues.mainframeHardware.performanceLevel;
  }
}
