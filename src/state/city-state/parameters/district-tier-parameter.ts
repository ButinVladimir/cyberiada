import { msg, str } from '@lit/localize';
import districtTypes from '@configs/district-types.json';
import { container } from '@state/container';
import { TYPES } from '@state/types';
import { IEventBatcher } from '@shared/interfaces/event-batcher';
import { IDistrictState, IDistrictTierParameter, IDistrictTierSerializedParameter } from '../interfaces';
import { EventBatcher } from '@shared/event-batcher';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { calculateGeometricProgressionSum, reverseGeometricProgressionSum } from '@shared/helpers';
import { IFormatter } from '@shared/interfaces/formatter';
import { CityEvent } from '@shared/types';
import { CITY_STATE_UI_EVENTS } from '../constants';
import { DISTRICT_NAMES } from '@/texts/names';

export class DistrictTierParameter implements IDistrictTierParameter {
  readonly uiEventBatcher: IEventBatcher;

  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;
  private _stateUIConnector: IStateUIConnector;

  private _district: IDistrictState;
  private _tier: number;
  private _points: number;

  constructor(district: IDistrictState) {
    this._messageLogState = container.get(TYPES.MessageLogState);
    this._formatter = container.get(TYPES.Formatter);
    this._stateUIConnector = container.get(TYPES.StateUIConnector);

    this._district = district;
    this._tier = 0;
    this._points = 0;

    this.uiEventBatcher = new EventBatcher();
  }

  get tier(): number {
    return this._tier;
  }

  get points(): number {
    this._stateUIConnector.connectEventHandler(this, CITY_STATE_UI_EVENTS.DISTRICT_TIER_CHANGED);

    return this._points;
  }

  increasePoints(delta: number): void {
    this._points += delta;
  }

  recalculate(): void {
    const newLevel = this.calculateNewLevel();

    if (newLevel > this._tier) {
      this._tier = newLevel;

      const formattedTier = this._formatter.formatQuality(this._tier);
      this._messageLogState.postMessage(
        CityEvent.districtTierIncreased,
        msg(str`District ${DISTRICT_NAMES[this._district.name]()} tier has been increased to ${formattedTier}`),
      );

      this.uiEventBatcher.enqueueEvent(CITY_STATE_UI_EVENTS.DISTRICT_TIER_CHANGED);
    }
  }

  setTier(tier: number): void {
    const districtType = this._district.districtType;
    const districtTypeInfo = districtTypes[districtType];
    const { base, multiplier } = districtTypeInfo.nextTierRequirements;

    this._tier = tier;
    this._points = calculateGeometricProgressionSum(tier - 1, multiplier, base);

    this.uiEventBatcher.enqueueEvent(CITY_STATE_UI_EVENTS.DISTRICT_TIER_CHANGED);
  }

  async deserialize(serializedState: IDistrictTierSerializedParameter): Promise<void> {
    this._points = serializedState.points;
    this._tier = this.calculateNewLevel();

    this.uiEventBatcher.enqueueEvent(CITY_STATE_UI_EVENTS.DISTRICT_TIER_CHANGED);
  }

  serialize(): IDistrictTierSerializedParameter {
    return {
      points: this._points,
    };
  }

  private calculateNewLevel(): number {
    const districtType = this._district.districtType;
    const districtTypeInfo = districtTypes[districtType];
    const { base, multiplier } = districtTypeInfo.nextTierRequirements;

    return reverseGeometricProgressionSum(this._points, multiplier, base);
  }
}
