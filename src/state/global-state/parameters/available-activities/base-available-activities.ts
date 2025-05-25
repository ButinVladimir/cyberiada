import { injectable } from 'inversify';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { TYPES } from '@state/types';
import { Feature } from '@shared/types';
import { type IGlobalState, IAvailableCategoryActivities } from '../../interfaces';

const { lazyInject } = decorators;

@injectable()
export abstract class BaseAvailableActivities<Key = string> implements IAvailableCategoryActivities<Key> {
  @lazyInject(TYPES.StateUIConnector)
  protected _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  protected _globalState!: IGlobalState;

  protected _neutralActivities: Set<Key>;
  protected _activitiesList: Key[];

  constructor() {
    this._neutralActivities = new Set();
    this._activitiesList = [];

    this._stateUiConnector.registerEventEmitter(this, ['_activitiesList']);
  }

  listAvailableActivities(): Key[] {
    return this._activitiesList;
  }

  isActivityAvailable(activityName: Key): boolean {
    if (!this._neutralActivities.has(activityName)) {
      return false;
    }

    return true;
  }

  recalculate() {
    this.recalculateNeutralActivitiesList();
    this.recalculateCompleteList();
  }

  protected abstract recalculateNeutralActivitiesList(): void;

  protected abstract getActivityRequiredFeatures(itemName: Key): Feature[];

  private recalculateCompleteList() {
    const completeList = Array.from(this._neutralActivities.values());

    const filteredList = completeList.filter((itemName) => {
      const requiredFeatures = this.getActivityRequiredFeatures(itemName);
      const allFeaturesUnlocked = requiredFeatures.every((feature) =>
        this._globalState.unlockedFeatures.isFeatureUnlocked(feature),
      );

      return allFeaturesUnlocked;
    });

    this._activitiesList.length = 0;
    this._activitiesList.push(...filteredList);
  }
}
