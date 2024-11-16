import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';

export interface ITimeConstructorParameters {
  stateUiConnector: IStateUIConnector;
  settingsState: ISettingsState;
}
