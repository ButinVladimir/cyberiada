import { IExponent } from '@shared/interfaces';
import { PurchaseEvent } from '@shared/types';
import { MainframeHardwareParameter } from './mainframe-hardware-parameter';

export class MainframeHardwareCores extends MainframeHardwareParameter {
  protected get priceExp(): IExponent {
    return this.scenarioState.currentValues.mainframeHardware.coresPrice;
  }

  protected get purchaseEvent(): PurchaseEvent {
    return PurchaseEvent.coresUpgraded;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._level = this.scenarioState.currentValues.mainframeHardware.coresLevel;
  }
}
