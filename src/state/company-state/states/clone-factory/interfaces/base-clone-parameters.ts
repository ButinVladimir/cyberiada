import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMakeCloneParameters } from './make-clone-parameters';

export interface IBaseCloneParameters extends IMakeCloneParameters {
  id: string;
  stateUiConnector: IStateUIConnector;
}
