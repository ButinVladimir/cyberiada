import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IBaseProgramParameters } from './base-program-parameters';

export interface IPredictiveComputatorParameters extends IBaseProgramParameters {
  scenarioState: IScenarioState;
  mainframeHardwareState: IMainframeHardwareState;
}
