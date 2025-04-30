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
  IFactionState,
  IMultipliersState,
  IAvailableItemsState,
} from './parameters';

export interface IGlobalState extends ISerializeable<IGlobalSerializedState> {
  randomSeed: number;
  randomShift: bigint;
  scenario: IScenarioState;
  faction: IFactionState;
  gameSpeed: GameSpeed;
  money: IMoneyState;
  time: ITimeState;
  development: IDevelopmentState;
  multipliers: IMultipliersState;
  availableItems: IAvailableItemsState;
  unlockedFeatures: IUnlockedFeaturesState;
  storyEvents: IStoryEventsState;
  recalculate(): void;
  makeNextTick(): void;
  setRandomShift(value: number | bigint | string | boolean): void;
}
