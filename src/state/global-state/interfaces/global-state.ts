import { XORShift128Plus } from 'random-seedable';
import { ISerializeable, ISnapshotable } from '@shared/index';
import { IGlobalSerializedState } from './serialized-states';
import { GameSpeed } from '../types';
import {
  IMoneyState,
  ITimeState,
  IDevelopmentState,
  IMultipliersState,
  IConnectivityState,
  IThreatState,
  ISynchronizationState,
  IExperienceShareState,
  IProcessCompletionSpeedState,
  IRewardsState,
} from './parameters';
import { IGlobalSnapshotState } from './snapshot-states';

export interface IGlobalState extends ISerializeable<IGlobalSerializedState>, ISnapshotable<IGlobalSnapshotState> {
  random: XORShift128Plus;
  runId: string;
  gameSpeed: GameSpeed;
  money: IMoneyState;
  time: ITimeState;
  development: IDevelopmentState;
  threat: IThreatState;
  synchronization: ISynchronizationState;
  connectivity: IConnectivityState;
  rewards: IRewardsState;
  multipliers: IMultipliersState;
  experienceShare: IExperienceShareState;
  processCompletionSpeed: IProcessCompletionSpeedState;
  recalculate(): void;
  makeNextTick(): void;
}
