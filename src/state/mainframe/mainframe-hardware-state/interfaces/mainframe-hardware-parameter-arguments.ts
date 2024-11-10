import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { IMainframeHardwareState } from './mainframe-hardware-state';

export interface IMainframeHardwareParameterArguments {
  mainframeHardwareState: IMainframeHardwareState;
  scenarioState: IScenarioState;
  globalState: IGlobalState;
  messageLogState: IMessageLogState;
  formatter: IFormatter;
}
