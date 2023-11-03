import { IGlobalState, ICrewState, IJobState } from '@state/gameState';

export interface IGameStateManager {
  globalState: IGlobalState;
  crewState: ICrewState;
  jobState: IJobState;

  timer: NodeJS.Timeout | null;
  tick: () => void;
}