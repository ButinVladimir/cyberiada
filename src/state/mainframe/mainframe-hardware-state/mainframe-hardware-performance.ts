import { IExponent } from '@shared/interfaces';
import { PurchaseEvent } from '@shared/types';
import { MainframeHardwareParameter } from './mainframe-hardware-parameter';

export class MainframeHardwarePerformance extends MainframeHardwareParameter {
  protected get priceExp(): IExponent {
    return this.scenarioState.currentValues.mainframeHardware.performancePrice;
  }

  protected get purchaseEvent(): PurchaseEvent {
    return PurchaseEvent.performanceUpgraded;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._level = this.scenarioState.currentValues.mainframeHardware.performanceLevel;
  }
}
