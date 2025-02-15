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
} from './parameters';

export interface IGlobalState extends ISerializeable<IGlobalSerializedState> {
  randomSeed: number;
  scenario: IScenarioState;
  gameSpeed: GameSpeed;
  money: IMoneyState;
  time: ITimeState;
  development: IDevelopmentState;
  codeBase: ICodeBaseState;
  unlockedFeatures: IUnlockedFeaturesState;
  storyEvents: IStoryEventsState;
  makeNextTick(): void;
}
