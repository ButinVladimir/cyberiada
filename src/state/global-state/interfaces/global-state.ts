import { ISerializeable } from '@shared/interfaces/serializable';
import { IGlobalSerializedState } from './serialized-states/global-serialized-state';
import { GameSpeed } from '../types';
import {
  IMoneyState,
  ITimeState,
  IDevelopmentState,
  IUnlockedFeaturesState,
  IStoryEventsState,
  IScenarioState,
  ICodeBaseState,
  IComputationalBaseState,
  IConnectivityState,
  IRewardsState,
} from './parameters';

export interface IGlobalState extends ISerializeable<IGlobalSerializedState> {
  randomSeed: number;
  scenario: IScenarioState;
  gameSpeed: GameSpeed;
  money: IMoneyState;
  time: ITimeState;
  development: IDevelopmentState;
  codeBase: ICodeBaseState;
  computationalBase: IComputationalBaseState;
  connectivity: IConnectivityState;
  rewards: IRewardsState;
  unlockedFeatures: IUnlockedFeaturesState;
  storyEvents: IStoryEventsState;
  makeNextTick(): void;
}
