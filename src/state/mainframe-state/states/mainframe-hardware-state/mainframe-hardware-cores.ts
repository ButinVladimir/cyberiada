import { msg, str } from '@lit/localize';
import { IExponent } from '@shared/interfaces';
import { ProgramsEvent } from '@shared/types';
import { MainframeHardwareParameter } from './mainframe-hardware-parameter';
import { MainframeHardwareParameterType } from './types';

export class MainframeHardwareCores extends MainframeHardwareParameter {
  readonly type: MainframeHardwareParameterType = 'cores';

  protected get baseLevel(): number {
    return this.globalState.scenario.currentValues.mainframeHardware.baseCoresLevel;
  }

  protected get priceExp(): IExponent {
    return this.globalState.scenario.currentValues.mainframeHardware.coresPrice;
  }

  protected postPurchaseMessge(): void {
    const formattedLevel = this.formatter.formatLevel(this._level);

    this.messageLogState.postMessage(
      ProgramsEvent.coresUpgraded,
      msg(str`Mainframe cores has been upgraded to ${formattedLevel}`),
    );
  }
}
