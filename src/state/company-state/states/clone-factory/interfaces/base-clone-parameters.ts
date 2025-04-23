import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { ICompanyState } from '@state/company-state/interfaces/company-state';
import { IGlobalState } from '@state/global-state/interfaces/global-state';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { IFormatter } from '@shared/interfaces/formatter';
import { IMakeCloneParameters } from './make-clone-parameters';

export interface IBaseCloneParameters extends IMakeCloneParameters {
  id: string;
  companyState: ICompanyState;
  globalState: IGlobalState;
  messageLogState: IMessageLogState;
  stateUiConnector: IStateUIConnector;
  formatter: IFormatter;
}
