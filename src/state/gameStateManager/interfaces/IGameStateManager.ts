import {
  IGlobalState,
  ICrewState,
  ISideJobState,
  ISettingsState,
} from '@state/gameState';

export interface IGameStateManager {
  globalState: IGlobalState;
  crewState: ICrewState;
  sideJobState: ISideJobState;
  settingsState: ISettingsState;
  needsActivityReassignment: boolean;
}
