import { IGlobalState, ICrewState } from '@state/gameState';

export interface IGameStateManager {
  globalState: IGlobalState;
  crewState: ICrewState;

  timer: NodeJS.Timeout | null;
  tick: () => void;
}