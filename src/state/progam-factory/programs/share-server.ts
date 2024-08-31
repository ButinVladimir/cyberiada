import { MS_IN_SECOND } from '@shared/constants';
import { IGeneralState } from '@state/general-state/interfaces/general-state';
import { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import constants from '@configs/constants.json';
import { ProgramName } from '../types';
import { IShareServerParameters } from '../interfaces/program-parameters/share-server-parameters';
import { BaseProgram } from './base-program';

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
  }

  perform(threads: number, usedRam: number): void {
    const delta = this.calculateDelta(threads, usedRam, this._settingsState.updateInterval);

    this._generalState.increaseMoney(delta);
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
}
