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
  IConnectivityState,
  IThreatState,
  ISynchronizationParameter,
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
  threat: IThreatState;
  synchronization: ISynchronizationParameter;
  connectivity: IConnectivityState;
  multipliers: IMultipliersState;
  availableItems: IAvailableItemsState;
  unlockedFeatures: IUnlockedFeaturesState;
  storyEvents: IStoryEventsState;
  recalculate(): void;
  makeNextTick(): void;
  setRandomShift(value: number | bigint | string | boolean): void;
}
