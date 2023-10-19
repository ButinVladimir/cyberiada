import { IGlobalState } from '@state/gameState';

export interface IGameStateManager {
  globalState: IGlobalState;
  timer: NodeJS.Timeout | null;
  tick: () => void;
}