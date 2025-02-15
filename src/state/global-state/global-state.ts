import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import { IGlobalSerializedState } from './interfaces/serialized-states/global-serialized-state';
import type {
  ITimeState,
  IScenarioState,
  IStoryEventsState,
  IDevelopmentState,
  IMoneyState,
  ICodeBaseState,
  IUnlockedFeaturesState,
} from './interfaces';
import { IGlobalState } from './interfaces/global-state';
import { GameSpeed } from './types';

@injectable()
export class GlobalState implements IGlobalState {
  private _scenarioState: IScenarioState;
  private _timeState: ITimeState;
  private _developmentState: IDevelopmentState;
  private _moneyState: IMoneyState;
  private _codeBaseState: ICodeBaseState;

  private _unlockedFeaturesState: IUnlockedFeaturesState;
  private _storyEventsState: IStoryEventsState;

  private _randomSeed: number;
  private _gameSpeed: GameSpeed;

  constructor(
    @inject(TYPES.ScenarioState) _scenarioState: IScenarioState,
    @inject(TYPES.TimeState) _timeState: ITimeState,
    @inject(TYPES.DevelopmentState) _developmentState: IDevelopmentState,
    @inject(TYPES.MoneyState) _moneyState: IMoneyState,
    @inject(TYPES.CodeBaseState) _codeBaseState: ICodeBaseState,
    @inject(TYPES.UnlockedFeaturesState) _unlockedFeaturesState: IUnlockedFeaturesState,
    @inject(TYPES.StoryEventsState) _storyEventsState: IStoryEventsState,
  ) {
    this._scenarioState = _scenarioState;
    this._timeState = _timeState;
    this._developmentState = _developmentState;
    this._moneyState = _moneyState;
    this._codeBaseState = _codeBaseState;
    this._unlockedFeaturesState = _unlockedFeaturesState;
    this._storyEventsState = _storyEventsState;

    this._randomSeed = 0;
    this._gameSpeed = GameSpeed.normal;
  }

  get randomSeed() {
    return this._randomSeed;
  }

  get scenario() {
    return this._scenarioState;
  }

  get gameSpeed() {
    return this._gameSpeed;
  }

  set gameSpeed(value: GameSpeed) {
    this._gameSpeed = value;
  }

  get money(): IMoneyState {
    return this._moneyState;
  }

  get time(): ITimeState {
    return this._timeState;
  }

  get development(): IDevelopmentState {
    return this._developmentState;
  }

  get codeBase(): ICodeBaseState {
    return this._codeBaseState;
  }

  get unlockedFeatures(): IUnlockedFeaturesState {
    return this._unlockedFeaturesState;
  }

  get storyEvents(): IStoryEventsState {
    return this._storyEventsState;
  }

  makeNextTick() {
    this.time.makeNextTick();
    this.recalculate();
  }

  async startNewState(): Promise<void> {
    this._randomSeed = Date.now();
    this._gameSpeed = GameSpeed.normal;
    await this._scenarioState.startNewState();
    await this._moneyState.startNewState();
    await this._timeState.startNewState();
    await this._developmentState.startNewState();
    await this._codeBaseState.startNewState();
    await this._unlockedFeaturesState.startNewState();
    this.storyEvents.startNewState();

    this.recalculate();
  }

  async deserialize(serializedState: IGlobalSerializedState): Promise<void> {
    this._randomSeed = serializedState.randomSeed;
    this._gameSpeed = serializedState.gameSpeed;
    await this._scenarioState.deserialize(serializedState.scenario);
    await this._moneyState.deserialize(serializedState.money);
    await this._timeState.deserialize(serializedState.time);
    await this._developmentState.deserialize(serializedState.development);
    await this._codeBaseState.deserialize(serializedState.codeBase);
    await this._unlockedFeaturesState.deserialize(serializedState.unlockedFeatures);

    this.recalculate();
  }

  serialize(): IGlobalSerializedState {
    return {
      randomSeed: this.randomSeed,
      gameSpeed: this.gameSpeed,
      scenario: this._scenarioState.serialize(),
      money: this._moneyState.serialize(),
      time: this._timeState.serialize(),
      development: this._developmentState.serialize(),
      codeBase: this._codeBaseState.serialize(),
      unlockedFeatures: this._unlockedFeaturesState.serialize(),
    };
  }

  private recalculate() {
    this._developmentState.recalculateLevel();
    this._codeBaseState.recalculateCostMultipliers();
  }
}
