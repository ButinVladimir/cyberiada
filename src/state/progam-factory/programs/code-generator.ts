import { IMainframeHardwareState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IMainframeDevelopingProgramsState } from '@state/mainframe-developing-programs-state/interfaces/mainframe-developing-programs-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import constants from '@configs/constants.json';
import { ProgramName } from '../types';
import { ICodeGeneratorParameters } from '../interfaces/program-parameters/code-generator-parameters';
import { BaseProgram } from './base-program';

export class CodeGeneratorProgram extends BaseProgram {
  public readonly name = ProgramName.codeGenerator;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = false;
  private _settingsState: ISettingsState;
  private _mainframeHardwareState: IMainframeHardwareState;
  private _mainframeDevelopingProgramsState: IMainframeDevelopingProgramsState;

  constructor(parameters: ICodeGeneratorParameters) {
    super(parameters);

    this._settingsState = parameters.settingsState;
    this._mainframeHardwareState = parameters.mainframeHardwareState;
    this._mainframeDevelopingProgramsState = parameters.mainframeDevelopingProgramsState;
  }

  perform(usedCores: number): void {
    const delta =
      this._settingsState.updateInterval *
      constants.codeGenerator.baseIncrease *
      this._mainframeHardwareState.performance *
      usedCores *
      this.level *
      Math.pow(constants.codeGenerator.qualityMultiplier, this.quality);

    this._mainframeDevelopingProgramsState.increaseDevelopingProgramCompletion(delta);
  }
}
