import { XORShift128Plus } from 'random-seedable';
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
  IAvailableActivities,
} from './parameters';

export interface IGlobalState extends ISerializeable<IGlobalSerializedState> {
  random: XORShift128Plus;
  runId: string;
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
  availableActivities: IAvailableActivities;
  unlockedFeatures: IUnlockedFeaturesState;
  storyEvents: IStoryEventsState;
  recalculate(): void;
  makeNextTick(): void;
}
