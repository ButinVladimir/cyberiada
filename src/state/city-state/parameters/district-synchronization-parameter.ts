import { calculatePower } from '@shared/helpers';
import { decorators } from '@state/container';
import { type IStateUIConnector } from '@state/state-ui-connector/interfaces';
import { TYPES } from '@state/types';
import { IDistrictState, IDistrictSynchronizationParameter } from '../interfaces';

const { lazyInject } = decorators;

export class DistrictSynchronizationParameter implements IDistrictSynchronizationParameter {
  private UI_EVENTS = {
    SYNCHRONIZATION_UPDATED: Symbol('SYNCHRONIZATION_UPDATED'),
  };

  @lazyInject(TYPES.StateUIConnector)
  private _stateUIConnector!: IStateUIConnector;

  private _district: IDistrictState;
  private _value: number;

  constructor(district: IDistrictState) {
    this._district = district;
    this._value = 0;

    this._stateUIConnector.registerEvents(this.UI_EVENTS);
  }

  get value(): number {
    this._stateUIConnector.connectEventHandler(this.UI_EVENTS.SYNCHRONIZATION_UPDATED);

    return this._value;
  }

  recalculate(): void {
    const districtTypeData = this._district.template;

    this._value = calculatePower(this._district.parameters.tier.tier, districtTypeData.parameters.synchronization);

    this._stateUIConnector.enqueueEvent(this.UI_EVENTS.SYNCHRONIZATION_UPDATED);
  }

  removeAllEventListeners(): void {
    this._stateUIConnector.unregisterEvents(this.UI_EVENTS);
  }
}
