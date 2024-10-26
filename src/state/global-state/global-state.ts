import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { IMoneyParameter, IGlobalSerializedState, ITimeParameter, ICityDevelopmentParameter } from './interfaces';
import { IGlobalState } from './interfaces/global-state';
import { GameSpeed } from './types';
import { MoneyParameter } from './money-parameter';
import { TimeParameter } from './time-parameter';
import { CityDevelopmentParameter } from './city-development-parameter';

const { lazyInject } = decorators;

@injectable()
export class GlobalState implements IGlobalState {
  @lazyInject(TYPES.ScenarioState)
  private _scenarioState!: IScenarioState;

  @lazyInject(TYPES.SettingsState)
  private _settingsState!: ISettingsState;

  private _randomSeed: number;
  private _gameSpeed: GameSpeed;
  private _money: IMoneyParameter | undefined;
  private _time: ITimeParameter | undefined;
  private _cityDevelopment: ICityDevelopmentParameter | undefined;

  constructor() {
    this._randomSeed = 0;
    this._gameSpeed = GameSpeed.normal;
  }

  get randomSeed() {
    return this._randomSeed;
  }

  get gameSpeed() {
    return this._gameSpeed;
  }

  set gameSpeed(value: GameSpeed) {
    this._gameSpeed = value;
  }

  get money(): IMoneyParameter {
    if (!this._money) {
      this._money = new MoneyParameter({
        scenarioState: this._scenarioState,
      });
    }

    return this._money;
  }

  get time(): ITimeParameter {
    if (!this._time) {
      this._time = new TimeParameter({
        settingsState: this._settingsState,
      });
    }

    return this._time;
  }

  get cityDevelopment(): ICityDevelopmentParameter {
    if (!this._cityDevelopment) {
      this._cityDevelopment = new CityDevelopmentParameter({
        scenarioState: this._scenarioState,
      });
    }

    return this._cityDevelopment;
  }

  recalculate() {
    this.cityDevelopment.recalculateLevel();
  }

  async startNewState(): Promise<void> {
    this._randomSeed = Date.now();
    this._gameSpeed = GameSpeed.normal;
    await this.money.startNewState();
    await this.time.startNewState();
    await this.cityDevelopment.startNewState();
  }

  async deserialize(serializedState: IGlobalSerializedState): Promise<void> {
    this._randomSeed = serializedState.randomSeed;
    this._gameSpeed = serializedState.gameSpeed;
    await this.money.deserialize(serializedState.money);
    await this.time.deserialize(serializedState.time);
    await this.cityDevelopment.deserialize(serializedState.cityDevelopment);
  }

  serialize(): IGlobalSerializedState {
    return {
      randomSeed: this._randomSeed,
      gameSpeed: this._gameSpeed,
      money: this.money.serialize(),
      time: this.time.serialize(),
      cityDevelopment: this.cityDevelopment.serialize(),
    };
  }

  addUiEventListener(): void {}

  removeUiEventListener(): void {}

  fireUiEvents() {
    this.money.fireUiEvents();
    this.time.fireUiEvents();
    this.cityDevelopment.fireUiEvents();
  }
}
