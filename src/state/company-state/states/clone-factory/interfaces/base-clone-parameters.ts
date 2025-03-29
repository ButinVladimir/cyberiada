import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { ICompanyState } from '@state/company-state/interfaces/company-state';
import { IMakeCloneParameters } from './make-clone-parameters';

export interface IBaseCloneParameters extends IMakeCloneParameters {
  id: string;
  companyState: ICompanyState;
  stateUiConnector: IStateUIConnector;
}
