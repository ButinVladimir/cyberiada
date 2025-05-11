import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { type IStateUIConnector } from '@state/state-ui-connector';
import { type ICityState } from '@state/city-state/interfaces';
import { type IGlobalState, ISynchronizationParameter } from '../interfaces';
import { type ICompanyState } from '@state/company-state/interfaces';

const { lazyInject } = decorators;

export class SynchronizationParameter implements ISynchronizationParameter {
  private UI_EVENTS = {
    SYNCHRONIZATION_UPDATED: Symbol('SYNCHRONIZATION_UPDATED'),
  };

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

    this._stateUIConnector.registerEvents(this.UI_EVENTS);
  }

  get baseValue() {
    this._stateUIConnector.connectEventHandler(this.UI_EVENTS.SYNCHRONIZATION_UPDATED);

    return this._baseValue;
  }

  get totalValue() {
    this._stateUIConnector.connectEventHandler(this.UI_EVENTS.SYNCHRONIZATION_UPDATED);

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

    this._stateUIConnector.enqueueEvent(this.UI_EVENTS.SYNCHRONIZATION_UPDATED);
  }

  private calculateBaseValue() {
    this._baseValue = this._globalState.scenario.currentValues.startingSynchronization;
    this._totalValue = this._baseValue;
  }

  private calculateDistrictValues() {
    const availableDistricts = this._cityState.listAvailableDistricts();

    availableDistricts.forEach((districtState) => {
      districtState.parameters.synchronization.recalculate();

      this._totalValue += districtState.parameters.synchronization.value;
    });
  }
}
