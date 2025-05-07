import { msg, str } from '@lit/localize';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { type IGlobalState } from '@state/global-state/interfaces';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { calculateGeometricProgressionSum, reverseGeometricProgressionSum } from '@shared/helpers';
import { CityEvent } from '@shared/types';
import { DISTRICT_NAMES } from '@texts/names';
import { IDistrictState, IDistrictTierParameter, IDistrictTierSerializedParameter } from '../interfaces';

const { lazyInject } = decorators;

export class DistrictTierParameter implements IDistrictTierParameter {
  private UI_EVENTS = {
    DISTRICT_TIER_CHANGED: Symbol('DISTRICT_TIER_CHANGED'),
  };

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.MessageLogState)
  private _messageLogState!: IMessageLogState;

  @lazyInject(TYPES.Formatter)
  private _formatter!: IFormatter;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUIConnector!: IStateUIConnector;

  private _district: IDistrictState;
  private _tier: number;
  private _points: number;

  constructor(district: IDistrictState) {
    this._district = district;
    this._tier = 0;
    this._points = 0;

    this._stateUIConnector.registerEvents(this.UI_EVENTS);
  }

  get tier(): number {
    this._stateUIConnector.connectEventHandler(this.UI_EVENTS.DISTRICT_TIER_CHANGED);

    return this._tier;
  }

  get points(): number {
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

      this._globalState.synchronization.requestRecalculation();

      this._stateUIConnector.enqueueEvent(this.UI_EVENTS.DISTRICT_TIER_CHANGED);
    }
  }

  setTier(tier: number): void {
    const districtTypeInfo = this._district.template;
    const { base, multiplier } = districtTypeInfo.parameters.districtTierPoints.requirements;

    this._tier = tier;
    this._points = calculateGeometricProgressionSum(tier - 1, multiplier, base);

    this._globalState.synchronization.requestRecalculation();

    this._stateUIConnector.enqueueEvent(this.UI_EVENTS.DISTRICT_TIER_CHANGED);
  }

  async deserialize(serializedState: IDistrictTierSerializedParameter): Promise<void> {
    this._points = serializedState.points;
    this._tier = this.calculateNewLevel();

    this._stateUIConnector.enqueueEvent(this.UI_EVENTS.DISTRICT_TIER_CHANGED);
  }

  serialize(): IDistrictTierSerializedParameter {
    return {
      points: this._points,
    };
  }

  private calculateNewLevel(): number {
    const districtTypeInfo = this._district.template;
    const { base, multiplier } = districtTypeInfo.parameters.districtTierPoints.requirements;

    return reverseGeometricProgressionSum(this._points, multiplier, base);
  }
}
