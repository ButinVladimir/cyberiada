import districtTypes from '@configs/district-types.json';
import { calculatePower } from '@shared/helpers';
import { IEventBatcher } from '@shared/interfaces';
import { EventBatcher } from '@shared/event-batcher';
import { decorators } from '@state/container';
import { type IStateUIConnector } from '@state/state-ui-connector/interfaces';
import { TYPES } from '@state/types';
import { IDistrictState, IDistrictSynchronizationParameter } from '../interfaces';
import { CITY_STATE_UI_EVENTS } from '../constants';

const { lazyInject } = decorators;

export class DistrictSynchronizationParameter implements IDistrictSynchronizationParameter {
  readonly uiEventBatcher: IEventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUIConnector!: IStateUIConnector;

  private _district: IDistrictState;
  private _value: number;

  constructor(district: IDistrictState) {
    this._district = district;
    this._value = 0;

    this.uiEventBatcher = new EventBatcher();
    this._stateUIConnector.registerEventEmitter(this);
  }

  get value(): number {
    this._stateUIConnector.connectEventHandler(this, CITY_STATE_UI_EVENTS.SYNCHRONIZATION_UPDATED);

    return this._value;
  }

  recalculate(): void {
    const districtTypeData = districtTypes[this._district.districtType];

    this._value = calculatePower(this._district.parameters.tier.tier, districtTypeData.parameters.synchronization);

    this.uiEventBatcher.enqueueEvent(CITY_STATE_UI_EVENTS.SYNCHRONIZATION_UPDATED);
  }
}
