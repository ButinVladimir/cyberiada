import { IExponent } from '@shared/interfaces';
import { PurchaseEvent } from '@shared/types';
import { MainframeHardwareParameter } from './mainframe-hardware-parameter';
import { MainframeHardwareParameterType } from './types';

export class MainframeHardwareRam extends MainframeHardwareParameter {
  readonly type: MainframeHardwareParameterType = 'ram';

  protected get priceExp(): IExponent {
    return this.globalState.scenario.currentValues.mainframeHardware.ramPrice;
  }

  protected get purchaseEvent(): PurchaseEvent {
    return PurchaseEvent.ramUpgraded;
  }

  async startNewState(): Promise<void> {
    await super.startNewState();

    this._level = this.globalState.scenario.currentValues.mainframeHardware.ramLevel;
  }
}
