import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IGlobalState } from '../global-state';

export interface IStoryEventsConstructorParameters {
  messageLogState: IMessageLogState;
  scenarioState: IScenarioState;
  globalState: IGlobalState;
}
