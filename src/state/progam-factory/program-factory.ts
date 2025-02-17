import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { IAutomationState } from '@state/automation-state/interfaces/automation-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { IProgramFactory } from './interfaces/program-factory';
import { IBaseProgramParameters, IMakeProgramParameters, IProgram } from './interfaces';
import { OtherProgramName, MultiplierProgramName } from './types';
import {
  ShareServerProgram,
  CodeGeneratorProgram,
  PredictiveComputatorProgram,
  MainframeHardwareAutobuyerProgram,
  MainframeProgramsAutobuyerProgram,
  CircuitDesignerProgram,
  InformationCollectorProgram,
  DealMakerProgram,
} from './programs';

const { lazyInject } = decorators;

@injectable()
export class ProgramFactory implements IProgramFactory {
  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.GrowthState)
  private _growthState!: IGrowthState;

  @lazyInject(TYPES.SettingsState)
  private _settingsState!: ISettingsState;

  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  @lazyInject(TYPES.AutomationState)
  private _automationState!: IAutomationState;

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
      growthState: this._growthState,
      mainframeState: this._mainframeState,
    };

    switch (parameters.name) {
      case OtherProgramName.shareServer:
        return new ShareServerProgram({
          ...baseParameters,
          settingsState: this._settingsState,
        });

      case MultiplierProgramName.codeGenerator:
        return new CodeGeneratorProgram({
          ...baseParameters,
        });

      case MultiplierProgramName.circuitDesigner:
        return new CircuitDesignerProgram({
          ...baseParameters,
        });

      case MultiplierProgramName.informationCollector:
        return new InformationCollectorProgram({
          ...baseParameters,
        });

      case MultiplierProgramName.dealMaker:
        return new DealMakerProgram({
          ...baseParameters,
        });

      case OtherProgramName.predictiveComputator:
        return new PredictiveComputatorProgram({
          ...baseParameters,
        });

      case OtherProgramName.mainframeHardwareAutobuyer:
        return new MainframeHardwareAutobuyerProgram({
          ...baseParameters,
          automationState: this._automationState,
        });

      case OtherProgramName.mainframeProgramsAutobuyer:
        return new MainframeProgramsAutobuyerProgram({
          ...baseParameters,
          programFactory: this,
          automationState: this._automationState,
        });
    }
  }
}
