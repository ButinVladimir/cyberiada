import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import type { IMainframeProgramsState } from '@state/mainframe/mainframe-programs-state/interfaces/mainframe-programs-state';
import type { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { IMainframeHardwareAutomationState } from '@state/automation/mainframe-hardware-automation-state/interfaces/mainframe-hardware-automation-state';
import type { IMainframeProgramsAutomationState } from '@state/automation/mainframe-programs-automation-state/interfaces/mainframe-programs-automation-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { IProgramFactory } from './interfaces/program-factory';
import { IBaseProgramParameters, IMakeProgramParameters, IProgram } from './interfaces';
import { ProgramName } from './types';
import {
  ShareServerProgram,
  CodeGeneratorProgram,
  PredictiveComputatorProgram,
  MainframeHardwareAutobuyerProgram,
  MainframeProgramsAutobuyerProgram,
} from './programs';

const { lazyInject } = decorators;

@injectable()
export class ProgramFactory implements IProgramFactory {
  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.ScenarioState)
  private _scenarioState!: IScenarioState;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.SettingsState)
  private _settingsState!: ISettingsState;

  @lazyInject(TYPES.MainframeProgramsState)
  private _mainframeProgramsState!: IMainframeProgramsState;

  @lazyInject(TYPES.MainframeProcessesState)
  private _mainframeProcessesState!: IMainframeProcessesState;

  @lazyInject(TYPES.MainframeHardwareState)
  private _mainframeHardwareState!: IMainframeHardwareState;

  @lazyInject(TYPES.MainframeHardwareAutomationState)
  private _mainframeHardwareAutomationState!: IMainframeHardwareAutomationState;

  @lazyInject(TYPES.MainframeProgramsAutomationState)
  private _mainframeProgramsAutomationState!: IMainframeProgramsAutomationState;

  @lazyInject(TYPES.Formatter)
  private _formatter!: IFormatter;

  makeProgram(parameters: IMakeProgramParameters): IProgram {
    const program: IProgram = this.makeProgramImplementation(parameters);

    return program;
  }

  private makeProgramImplementation(parameters: IMakeProgramParameters): IProgram {
    const baseParameters: IBaseProgramParameters = {
      formatter: this._formatter,
      level: parameters.level,
      quality: parameters.quality,
      autoUpgradeEnabled: parameters.autoUpgradeEnabled,
      stateUiConnector: this._stateUiConnector,
      globalState: this._globalState,
      mainframeProgramsState: this._mainframeProgramsState,
      mainframeProcessesState: this._mainframeProcessesState,
      mainframeHardwareState: this._mainframeHardwareState,
      scenarioState: this._scenarioState,
    };

    switch (parameters.name) {
      case ProgramName.shareServer:
        return new ShareServerProgram({
          ...baseParameters,
          settingsState: this._settingsState,
        });

      case ProgramName.codeGenerator:
        return new CodeGeneratorProgram({
          ...baseParameters,
        });

      case ProgramName.predictiveComputator:
        return new PredictiveComputatorProgram({
          ...baseParameters,
        });

      case ProgramName.mainframeHardwareAutobuyer:
        return new MainframeHardwareAutobuyerProgram({
          ...baseParameters,
          mainframeHardwareAutomationState: this._mainframeHardwareAutomationState,
        });

      case ProgramName.mainframeProgramsAutobuyer:
        return new MainframeProgramsAutobuyerProgram({
          ...baseParameters,
          programFactory: this,
          mainframeProgramsAutomationState: this._mainframeProgramsAutomationState,
        });
    }
  }
}
