import { IMoneySnapshotState } from './money-snapshot-state';
import { IDevelopmentSnapshotState } from './development-snapshot-state';
import { IConnectivitySnapshotState } from './connectivity-snapshot-state';
import { IRewardsSnapshotState } from './rewards-snapshot-state';
import { IExperienceShareSnapshotState } from './experience-share-snapshot-state';
import { ISynchronizationSnapshotState } from './synchronization-snapshot-state';
import { IMultipliersSnapshotState } from './multipliers-snapshot-state';

export interface IGlobalSnapshotState {
  money: IMoneySnapshotState;
  development: IDevelopmentSnapshotState;
  connectivity: IConnectivitySnapshotState;
  multipliers: IMultipliersSnapshotState;
  rewards: IRewardsSnapshotState;
  experienceShare: IExperienceShareSnapshotState;
  synchronization: ISynchronizationSnapshotState;
}
