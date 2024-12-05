import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import { IFormatter } from '@shared/interfaces/formatter';

export interface ITimeConstructorParameters {
  stateUiConnector: IStateUIConnector;
  settingsState: ISettingsState;
  scenarioState: IScenarioState;
  notificationsState: INotificationsState;
  formatter: IFormatter;
}
