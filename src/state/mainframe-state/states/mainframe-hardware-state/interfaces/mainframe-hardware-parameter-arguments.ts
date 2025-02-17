import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMainframeHardwareState } from './mainframe-hardware-state';

export interface IMainframeHardwareParameterArguments {
  stateUiConnector: IStateUIConnector;
  mainframeHardwareState: IMainframeHardwareState;
  globalState: IGlobalState;
  messageLogState: IMessageLogState;
  formatter: IFormatter;
}
