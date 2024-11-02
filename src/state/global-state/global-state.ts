import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import type { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import {
  IMoneyParameter,
  IGlobalSerializedState,
  ITimeParameter,
  ICityDevelopmentParameter,
  IProgramCompletionSpeedParameter,
  IMoneyGrowthParameter,
  ICityDevelopmentGrowthParameter,
  IComputationalBaseParameter,
  IProgramsGrowthParameter,
} from './interfaces';
import { IGlobalState } from './interfaces/global-state';
import { GameSpeed } from './types';
import { MoneyParameter } from './money-parameter';
import { TimeParameter } from './time-parameter';
import { CityDevelopmentParameter } from './city-development-parameter';
import { ProgramCompletionSpeedParameter } from './program-completion-speed-parameter';
import { MoneyGrowthParameter } from './money-growth-parameter';
import { CityDevelopmentGrowthParameter } from './city-development-growth-parameter';
import { ComputationalBaseParameter } from './computational-base-parameter';
import { ProgramsGrowthParameter } from './programs-growth-parameter';

const { lazyInject } = decorators;

@injectable()
export class GlobalState implements IGlobalState {
  @lazyInject(TYPES.ScenarioState)
  private _scenarioState!: IScenarioState;

  @lazyInject(TYPES.SettingsState)
  private _settingsState!: ISettingsState;

  @lazyInject(TYPES.MainframeProcessesState)
  private _mainframeProcessesState!: IMainframeProcessesState;

  @lazyInject(TYPES.MainframeHardwareState)
  private _mainframeHardwareState!: IMainframeHardwareState;

  private _randomSeed: number;
  private _gameSpeed: GameSpeed;
  private _money: IMoneyParameter | undefined;
  private _time: ITimeParameter | undefined;
  private _cityDevelopment: ICityDevelopmentParameter | undefined;
  private _computationalBase: IComputationalBaseParameter | undefined;
  private _programCompletionSpeed: IProgramCompletionSpeedParameter | undefined;
  private _moneyGrowth: IMoneyGrowthParameter | undefined;
  private _cityDevelopmentGrowth: ICityDevelopmentGrowthParameter | undefined;
  private _programsGrowthParameter: IProgramsGrowthParameter | undefined;

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

  get computationalBase(): IComputationalBaseParameter {
    if (!this._computationalBase) {
      this._computationalBase = new ComputationalBaseParameter({
        scenarioState: this._scenarioState,
      });
    }

    return this._computationalBase;
  }

  get programCompletionSpeed(): IProgramCompletionSpeedParameter {
    if (!this._programCompletionSpeed) {
      this._programCompletionSpeed = new ProgramCompletionSpeedParameter({
        mainframeProcessesState: this._mainframeProcessesState,
        mainframeHardwareState: this._mainframeHardwareState,
        scenarioState: this._scenarioState,
      });
    }

    return this._programCompletionSpeed;
  }

  get moneyGrowth(): IMoneyGrowthParameter {
    if (!this._moneyGrowth) {
      this._moneyGrowth = new MoneyGrowthParameter({
        mainframeProcessesState: this._mainframeProcessesState,
      });
    }

    return this._moneyGrowth;
  }

  get cityDevelopmentGrowth(): ICityDevelopmentGrowthParameter {
    if (!this._cityDevelopmentGrowth) {
      this._cityDevelopmentGrowth = new CityDevelopmentGrowthParameter({
        mainframeProcessesState: this._mainframeProcessesState,
      });
    }

    return this._cityDevelopmentGrowth;
  }

  get programsGrowth(): IProgramsGrowthParameter {
    if (!this._programsGrowthParameter) {
      this._programsGrowthParameter = new ProgramsGrowthParameter({
        mainframeProcessesState: this._mainframeProcessesState,
      });
    }

    return this._programsGrowthParameter;
  }

  requestGrowthRecalculation() {
    this.programCompletionSpeed.requestRecalculation();
    this.moneyGrowth.requestRecalculation();
    this.cityDevelopmentGrowth.requestRecalculation();
    this.programsGrowth.requestRecalculation();
  }

  recalculate() {
    this.cityDevelopment.recalculateLevel();
    this.computationalBase.recalculateDiscount();
    this.programCompletionSpeed.recalculate();
    this.moneyGrowth.recalculate();
    this.cityDevelopmentGrowth.recalculate();
    this.programsGrowth.recalculate();
  }

  async startNewState(): Promise<void> {
    this._randomSeed = Date.now();
    this._gameSpeed = GameSpeed.normal;
    await this.money.startNewState();
    await this.time.startNewState();
    await this.cityDevelopment.startNewState();
    await this.computationalBase.startNewState();

    this.requestGrowthRecalculation();
  }

  async deserialize(serializedState: IGlobalSerializedState): Promise<void> {
    this._randomSeed = serializedState.randomSeed;
    this._gameSpeed = serializedState.gameSpeed;
    await this.money.deserialize(serializedState.money);
    await this.time.deserialize(serializedState.time);
    await this.cityDevelopment.deserialize(serializedState.cityDevelopment);
    await this.computationalBase.deserialize(serializedState.computationalBase);

    this.requestGrowthRecalculation();
  }

  serialize(): IGlobalSerializedState {
    return {
      randomSeed: this._randomSeed,
      gameSpeed: this._gameSpeed,
      money: this.money.serialize(),
      time: this.time.serialize(),
      cityDevelopment: this.cityDevelopment.serialize(),
      computationalBase: this.computationalBase.serialize(),
    };
  }

  addUiEventListener(): void {}

  removeUiEventListener(): void {}

  fireUiEvents() {
    this.money.fireUiEvents();
    this.time.fireUiEvents();
    this.cityDevelopment.fireUiEvents();
    this.computationalBase.fireUiEvents();
    this.programCompletionSpeed.fireUiEvents();
    this.moneyGrowth.fireUiEvents();
    this.cityDevelopmentGrowth.fireUiEvents();
  }
}