import { msg, str } from '@lit/localize';
import { IExponent } from '@shared/interfaces';
import { PurchaseEvent } from '@shared/types';
import { MainframeHardwareParameter } from './mainframe-hardware-parameter';
import { MainframeHardwareParameterType } from './types';

export class MainframeHardwareCores extends MainframeHardwareParameter {
  readonly type: MainframeHardwareParameterType = 'cores';

  protected get priceExp(): IExponent {
    return this.globalState.scenario.currentValues.mainframeHardware.coresPrice;
  }

  protected postPurchaseMessge(): void {
    const formattedLevel = this.formatter.formatNumberDecimal(this._level);

    this.messageLogState.postMessage(
      PurchaseEvent.coresUpgraded,
      msg(str`Mainframe cores has been upgraded to ${formattedLevel}`),
    );
  }

  async startNewState(): Promise<void> {
    await super.startNewState();

    this._level = this.globalState.scenario.currentValues.mainframeHardware.coresLevel;
  }
}
