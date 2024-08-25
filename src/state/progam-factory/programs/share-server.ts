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

  perform(usedCores: number, usedRam: number): void {
    this._generalState.increaseMoney(
      this._settingsState.updateInterval *
        constants.shareServer.baseIncome *
        this._mainframeHardwareState.performance *
        usedCores *
        usedRam *
        this.level *
        Math.pow(constants.shareServer.qualityMultiplier, this.quality),
    );
  }
}
