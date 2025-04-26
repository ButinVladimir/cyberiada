import { msg, str } from '@lit/localize';
import { IExponent } from '@shared/interfaces';
import { PurchaseEvent } from '@shared/types';
import { MainframeHardwareParameter } from './mainframe-hardware-parameter';
import { MainframeHardwareParameterType } from './types';

export class MainframeHardwareRam extends MainframeHardwareParameter {
  readonly type: MainframeHardwareParameterType = 'ram';

  protected get priceExp(): IExponent {
    return this.globalState.scenario.currentValues.mainframeHardware.ramPrice;
  }

  protected postPurchaseMessge(): void {
    const formattedLevel = this.formatter.formatNumberDecimal(this._level);

    this.messageLogState.postMessage(
      PurchaseEvent.ramUpgraded,
      msg(str`Mainframe RAM has been upgraded to ${formattedLevel}`),
    );
  }

  async startNewState(): Promise<void> {
    await super.startNewState();

    this._level = this.globalState.scenario.currentValues.mainframeHardware.startingRamLevel;
  }
}
