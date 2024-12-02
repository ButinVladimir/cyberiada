import { IExponent } from '@shared/interfaces';
import { PurchaseEvent } from '@shared/types';
import { MainframeHardwareParameter } from './mainframe-hardware-parameter';
import { MainframeHardwareParameterType } from './types';

export class MainframeHardwareCores extends MainframeHardwareParameter {
  readonly type: MainframeHardwareParameterType = 'cores';

  protected get priceExp(): IExponent {
    return this.scenarioState.currentValues.mainframeHardware.coresPrice;
  }

  protected get purchaseEvent(): PurchaseEvent {
    return PurchaseEvent.coresUpgraded;
  }

  async startNewState(): Promise<void> {
    await super.startNewState();

    this._level = this.scenarioState.currentValues.mainframeHardware.coresLevel;
  }
}
