import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { IEventBatcher } from '@shared/interfaces';
import { EventBatcher } from '@shared/event-batcher';
import { type IStateUIConnector } from '@state/state-ui-connector';
import { type ICityState } from '@state/city-state/interfaces';
import { type IGlobalState, ISynchronizationParameter } from '../interfaces';
import { type ICompanyState } from '@state/company-state/interfaces';
import { DistrictUnlockState } from '@state/city-state/types';
import { GLOBAL_STATE_UI_EVENTS } from '../constants';

const { lazyInject } = decorators;

export class SynchronizationParameter implements ISynchronizationParameter {
  readonly uiEventBatcher: IEventBatcher;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.CityState)
  private _cityState!: ICityState;

  @lazyInject(TYPES.CompanyState)
  private _companyState!: ICompanyState;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUIConnector!: IStateUIConnector;

  private _baseValue: number;
  private _totalValue: number;
  private _recalculationRequested: boolean;

  constructor() {
    this._baseValue = 0;
    this._totalValue = 0;
    this._recalculationRequested = true;

    this.uiEventBatcher = new EventBatcher();
    this._stateUIConnector.registerEventEmitter(this);
  }

  get baseValue() {
    this._stateUIConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.SYNCHRONIZATION_UPDATED);

    return this._baseValue;
  }

  get totalValue() {
    this._stateUIConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.SYNCHRONIZATION_UPDATED);

    return this._totalValue;
  }

  requestRecalculation() {
    this._recalculationRequested = true;
  }

  recalculate() {
    if (!this._recalculationRequested) {
      return;
    }

    this._recalculationRequested = false;

    this.calculateBaseValue();
    this.calculateDistrictValues();
    this._companyState.clones.recalculateSynchronization();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.SYNCHRONIZATION_UPDATED);
  }

  private calculateBaseValue() {
    this._baseValue = this._globalState.scenario.currentValues.startingSynchronization;
    this._totalValue = this._baseValue;
  }

  private calculateDistrictValues() {
    for (let index = 0; index < this._cityState.districtsCount; index++) {
      const districtState = this._cityState.getDistrictState(index);

      if (districtState.state === DistrictUnlockState.locked) {
        continue;
      }

      districtState.parameters.synchronization.recalculate();

      this._totalValue += districtState.parameters.synchronization.value;
    }
  }
}
