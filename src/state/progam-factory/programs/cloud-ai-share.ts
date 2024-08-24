import { IGeneralState } from '@state/general-state/interfaces/general-state';
import { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import constants from '@configs/constants.json';
import { ProgramName } from '../types';
import { ICloudAiShareParameters } from '../interfaces/program-parameters/cloud-ai-share-parameters';
import { BaseProgram } from './base-program';

export class CloudAIShareProgram extends BaseProgram {
  public readonly name = ProgramName.cloudAiShare;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = true;
  private _generalState: IGeneralState;
  private _settingsState: ISettingsState;
  private _mainframeHardwareState: IMainframeHardwareState;

  constructor(parameters: ICloudAiShareParameters) {
    super(parameters);

    this._generalState = parameters.generalState;
    this._settingsState = parameters.settingsState;
    this._mainframeHardwareState = parameters.mainframeHardwareState;
  }

  perform(usedCores: number, usedRam: number): void {
    this._generalState.increaseMoney(
      this._settingsState.updateInterval *
        constants.cloudAIShare.baseIncome *
        this._mainframeHardwareState.performance *
        usedCores *
        usedRam *
        this.level *
        Math.pow(constants.cloudAIShare.qualityMultiplier, this.quality),
    );
  }
}
