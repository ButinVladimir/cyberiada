import {
  IGlobalState,
  ICrewState,
  IJobState,
  ISettingsState,
} from '@state/gameState';

export interface IGameStateManager {
  globalState: IGlobalState;
  crewState: ICrewState;
  jobState: IJobState;
  settingsState: ISettingsState;
}
