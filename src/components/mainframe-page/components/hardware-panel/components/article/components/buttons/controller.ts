import { MainframeHardwareParameterType } from '@state/mainframe-state';
import { Hotkey, BaseController } from '@shared/index';

export class MainframeHardwarePanelArticleButtonsController extends BaseController {
  get developmentLevel() {
    return this.globalState.development.level;
  }

  get money(): number {
    return this.globalState.money.money;
  }

  get moneyGrowth(): number {
    return this.growthState.money.totalGrowth;
  }

  getHotkey(parameterType: MainframeHardwareParameterType): string | undefined {
    return this.settingsState.hotkeys.getKeyByHotkey(this.getHotkeyType(parameterType));
  }

  private getHotkeyType(parameterType: MainframeHardwareParameterType): Hotkey {
    switch (parameterType) {
      case 'performance':
        return Hotkey.upgradeMainframePerformance;
      case 'ram':
        return Hotkey.upgradeMainframeRam;
      case 'cores':
        return Hotkey.upgradeMainframeCores;
    }
  }
}
