import { msg, str } from '@lit/localize';
import { IExponent } from '@shared/interfaces';
import { PurchaseEvent } from '@shared/types';
import { MainframeHardwareParameter } from './mainframe-hardware-parameter';
import { MainframeHardwareParameterType } from './types';

export class MainframeHardwarePerformance extends MainframeHardwareParameter {
  readonly type: MainframeHardwareParameterType = 'performance';

  protected get baseLevel(): number {
    return this.globalState.scenario.currentValues.mainframeHardware.basePerformanceLevel;
  }

  protected get priceExp(): IExponent {
    return this.globalState.scenario.currentValues.mainframeHardware.performancePrice;
  }

  protected postPurchaseMessge(): void {
    const formattedLevel = this.formatter.formatLevel(this._level);

    this.messageLogState.postMessage(
      PurchaseEvent.performanceUpgraded,
      msg(str`Mainframe performance has been upgraded to ${formattedLevel}`),
    );
  }
}
