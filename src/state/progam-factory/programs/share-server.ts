import { MS_IN_SECOND } from '@shared/constants';
import { IGeneralState } from '@state/general-state/interfaces/general-state';
import { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { MAINFRAME_HARDWARE_STATE_EVENTS } from '@state/mainframe-hardware-state/constants';
import constants from '@configs/constants.json';
import { ProgramName } from '../types';
import { IShareServerParameters } from '../interfaces/program-parameters/share-server-parameters';
import { BaseProgram } from './base-program';
import { PROGRAM_UI_EVENTS } from '../constants';

export class ShareServerProgram extends BaseProgram {
  public readonly name = ProgramName.shareServer;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = true;
  private _generalState: IGeneralState;
  private _settingsState: ISettingsState;
  private _mainframeHardwareState: IMainframeHardwareState;

  constructor(parameters: IShareServerParameters) {
    super(parameters);

    this._generalState = parameters.generalState;
    this._settingsState = parameters.settingsState;
    this._mainframeHardwareState = parameters.mainframeHardwareState;

    this._mainframeHardwareState.addStateEventListener(MAINFRAME_HARDWARE_STATE_EVENTS.HARDWARE_UPDATED, this.handleHardwareUpdate);
  }

  perform(threads: number, usedRam: number): void {
    const delta = this.calculateDelta(threads, usedRam, this._settingsState.updateInterval);

    this._generalState.increaseMoney(delta);
  }

  removeEventListeners() {
    this._mainframeHardwareState.removeStateEventListener(MAINFRAME_HARDWARE_STATE_EVENTS.HARDWARE_UPDATED, this.handleHardwareUpdate);
    this.uiEventBatcher.removeAllListeners();
  }

  buildDescriptionParametersObject(threads: number, usedRam: number) {
    const delta = this.calculateDelta(threads, usedRam, MS_IN_SECOND);

    return {
      value: this.formatter.formatNumberLong(delta),
    };
  }

  private calculateDelta(threads: number, usedRam: number, passedTime: number): number {
    return passedTime *
      constants.shareServer.baseIncome *
      this._mainframeHardwareState.performance *
      threads *
      usedRam *
      this.level *
      Math.pow(constants.shareServer.qualityMultiplier, this.quality);
  }

  private handleHardwareUpdate = () => {
    this.uiEventBatcher.enqueueEvent(PROGRAM_UI_EVENTS.PROGRAM_UPDATED);
  };
}