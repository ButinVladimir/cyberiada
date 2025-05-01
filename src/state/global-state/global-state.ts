import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import { IGlobalSerializedState } from './interfaces/serialized-states/global-serialized-state';
import type {
  ITimeState,
  IScenarioState,
  IStoryEventsState,
  IDevelopmentState,
  IMoneyState,
  IUnlockedFeaturesState,
  IMultipliersState,
  IFactionState,
  IAvailableItemsState,
  IConnectivityState,
  IThreatState,
  ISynchronizationParameter,
} from './interfaces';
import { IGlobalState } from './interfaces/global-state';
import { GameSpeed } from './types';
import { ConnectivityState, ThreatState } from './parameters';
import { SynchronizationParameter } from './parameters/synchronization-parameter';

@injectable()
export class GlobalState implements IGlobalState {
  private _scenarioState: IScenarioState;
  private _factionState: IFactionState;
  private _timeState: ITimeState;
  private _developmentState: IDevelopmentState;
  private _moneyState: IMoneyState;
  private _connectivity: IConnectivityState;
  private _threat: IThreatState;
  private _synchronization: ISynchronizationParameter;
  private _multipliersState: IMultipliersState;
  private _availableItemsState: IAvailableItemsState;
  private _unlockedFeaturesState: IUnlockedFeaturesState;
  private _storyEventsState: IStoryEventsState;

  private _randomSeed: number;
  private _randomShift: bigint;
  private _gameSpeed: GameSpeed;

  constructor(
    @inject(TYPES.ScenarioState) _scenarioState: IScenarioState,
    @inject(TYPES.FactionState) _factionState: IFactionState,
    @inject(TYPES.TimeState) _timeState: ITimeState,
    @inject(TYPES.DevelopmentState) _developmentState: IDevelopmentState,
    @inject(TYPES.MoneyState) _moneyState: IMoneyState,
    @inject(TYPES.MultipliersState) _multipliersState: IMultipliersState,
    @inject(TYPES.AvailableItemsState) _availableItemsState: IAvailableItemsState,
    @inject(TYPES.UnlockedFeaturesState) _unlockedFeaturesState: IUnlockedFeaturesState,
    @inject(TYPES.StoryEventsState) _storyEventsState: IStoryEventsState,
  ) {
    this._scenarioState = _scenarioState;
    this._factionState = _factionState;
    this._timeState = _timeState;
    this._developmentState = _developmentState;
    this._moneyState = _moneyState;
    this._connectivity = new ConnectivityState();
    this._threat = new ThreatState();
    this._synchronization = new SynchronizationParameter();
    this._multipliersState = _multipliersState;
    this._unlockedFeaturesState = _unlockedFeaturesState;
    this._storyEventsState = _storyEventsState;
    this._availableItemsState = _availableItemsState;

    this._randomSeed = 0;
    this._randomShift = 0n;
    this._gameSpeed = GameSpeed.normal;
  }

  get randomSeed() {
    return this._randomSeed;
  }

  get randomShift() {
    return this._randomShift;
  }

  get scenario() {
    return this._scenarioState;
  }

  get faction() {
    return this._factionState;
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

  get connectivity(): IConnectivityState {
    return this._connectivity;
  }

  get threat(): IThreatState {
    return this._threat;
  }

  get synchronization(): ISynchronizationParameter {
    return this._synchronization;
  }

  get multipliers(): IMultipliersState {
    return this._multipliersState;
  }

  get availableItems(): IAvailableItemsState {
    return this._availableItemsState;
  }

  get unlockedFeatures(): IUnlockedFeaturesState {
    return this._unlockedFeaturesState;
  }

  get storyEvents(): IStoryEventsState {
    return this._storyEventsState;
  }

  recalculate() {
    this._developmentState.recalculateLevel();
    this._multipliersState.recalculate();
    this._synchronization.recalculate();
  }

  makeNextTick() {
    this.time.makeNextTick();
  }

  setRandomShift(value: number | bigint | string | boolean) {
    this._randomShift = BigInt(value);
  }

  async startNewState(): Promise<void> {
    const startingSeed = Date.now();
    this._randomSeed = startingSeed;
    this.setRandomShift(startingSeed);

    this._gameSpeed = GameSpeed.normal;

    await this._scenarioState.startNewState();
    await this._factionState.startNewState();
    await this._moneyState.startNewState();
    await this._timeState.startNewState();
    await this._developmentState.startNewState();
    await this._connectivity.startNewState();
    await this._multipliersState.startNewState();
    await this._availableItemsState.startNewState();
    await this._unlockedFeaturesState.startNewState();
    this.storyEvents.startNewState();
  }

  async deserialize(serializedState: IGlobalSerializedState): Promise<void> {
    this._randomSeed = serializedState.randomSeed;
    this.setRandomShift(serializedState.randomShift);
    this._gameSpeed = serializedState.gameSpeed;
    await this._scenarioState.deserialize(serializedState.scenario);
    await this._factionState.deserialize(serializedState.faction);
    await this._moneyState.deserialize(serializedState.money);
    await this._timeState.deserialize(serializedState.time);
    await this._developmentState.deserialize(serializedState.development);
    await this._connectivity.deserialize(serializedState.connectivity);
    await this._multipliersState.deserialize(serializedState.multipliers);
    await this._availableItemsState.deserialize(serializedState.availableItems);
    await this._unlockedFeaturesState.deserialize(serializedState.unlockedFeatures);
  }

  serialize(): IGlobalSerializedState {
    return {
      randomSeed: this.randomSeed,
      randomShift: this.randomShift.toString(),
      gameSpeed: this.gameSpeed,
      scenario: this._scenarioState.serialize(),
      faction: this._factionState.serialize(),
      money: this._moneyState.serialize(),
      time: this._timeState.serialize(),
      development: this._developmentState.serialize(),
      connectivity: this._connectivity.serialize(),
      multipliers: this._multipliersState.serialize(),
      availableItems: this._availableItemsState.serialize(),
      unlockedFeatures: this._unlockedFeaturesState.serialize(),
    };
  }
}
