import { GameSpeed } from '@state/global-state';
import { BaseController, Hotkey } from '@shared/index';

export class GameScreenController extends BaseController {
  hostConnected() {
    super.hostConnected();

    document.addEventListener('keydown', this.handleKeyDown);
  }

  hostDisconnected() {
    super.hostDisconnected();

    document.removeEventListener('keydown', this.handleKeyDown);
  }

  private pause() {
    this.globalState.gameSpeed = GameSpeed.paused;
  }

  private playNormal() {
    this.globalState.gameSpeed = GameSpeed.normal;
  }

  private playFast() {
    this.globalState.gameSpeed = GameSpeed.fast;
  }

  private upgradeMainframeHardware() {
    this.mainframeState.hardware.purchaseMax();
  }

  private upgradeMainframePerformance() {
    this.mainframeState.hardware.performance.purchaseMax();
  }

  private upgradeMainframeRam() {
    this.mainframeState.hardware.ram.purchaseMax();
  }

  private upgradeMainframeCores() {
    this.mainframeState.hardware.cores.purchaseMax();
  }

  private upgradeMainframePrograms() {
    this.mainframeState.programs.upgradeMaxAllPrograms();
  }

  private upgradeClonesLevel() {
    this.companyState.clones.upgradeMaxAllLevels();
  }

  private getHotkeyByKey(key: string): Hotkey | undefined {
    return this.settingsState.hotkeys.getHotkeyByKey(key);
  }

  private saveGame() {
    this.app.saveGame();
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const target = event.composedPath()[0];

    if (target instanceof HTMLInputElement) {
      return;
    }

    const key = event.key;
    const hotkey = this.getHotkeyByKey(key);

    console.log(event);

    if (!hotkey) {
      return;
    }

    switch (hotkey) {
      case Hotkey.pause:
        this.pause();
        break;
      case Hotkey.playNormalSpeed:
        this.playNormal();
        break;
      case Hotkey.playFastSpeed:
        this.playFast();
        break;
      case Hotkey.saveGame:
        this.saveGame();
        break;
      case Hotkey.upgradeMainframeHardware:
        this.upgradeMainframeHardware();
        break;
      case Hotkey.upgradeMainframePerformance:
        this.upgradeMainframePerformance();
        break;
      case Hotkey.upgradeMainframeRam:
        this.upgradeMainframeRam();
        break;
      case Hotkey.upgradeMainframeCores:
        this.upgradeMainframeCores();
        break;
      case Hotkey.upgradeMainframePrograms:
        this.upgradeMainframePrograms();
        break;
      case Hotkey.upgradeClonesLevel:
        this.upgradeClonesLevel();
        break;
    }
  };
}
