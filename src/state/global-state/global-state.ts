import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import type { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import type { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import {
  IMoneyParameter,
  IGlobalSerializedState,
  ITimeParameter,
  IDevelopmentParameter,
  IProgramCompletionSpeedParameter,
  IMoneyGrowthParameter,
  IDevelopmentGrowthParameter,
  IComputationalBaseParameter,
  IProgramsGrowthParameter,
  IUnlockedFeaturesParameter,
  IStoryEventsParameter,
} from './interfaces';
import { IGlobalState } from './interfaces/global-state';
import { GameSpeed } from './types';
import { MoneyParameter } from './money-parameter';
import { TimeParameter } from './time-parameter';
import { DevelopmentParameter } from './development-parameter';
import { ProgramCompletionSpeedParameter } from './program-completion-speed-parameter';
import { MoneyGrowthParameter } from './money-growth-parameter';
import { DevelopmentGrowthParameter } from './development-growth-parameter';
import { ComputationalBaseParameter } from './computational-base-parameter';
import { ProgramsGrowthParameter } from './programs-growth-parameter';
import { UnlockedFeaturesParameter } from './unlocked-features-parameter';
import { StoryEventsParameter } from './story-events-parameter';

const { lazyInject } = decorators;

@injectable()
export class GlobalState implements IGlobalState {
  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.ScenarioState)
  private _scenarioState!: IScenarioState;

  @lazyInject(TYPES.SettingsState)
  private _settingsState!: ISettingsState;

  @lazyInject(TYPES.MainframeProcessesState)
  private _mainframeProcessesState!: IMainframeProcessesState;

  @lazyInject(TYPES.MainframeHardwareState)
  private _mainframeHardwareState!: IMainframeHardwareState;

  @lazyInject(TYPES.MessageLogState)
  private _messageLogState!: IMessageLogState;

  @lazyInject(TYPES.NotificationsState)
  private _notificationsState!: INotificationsState;

  @lazyInject(TYPES.Formatter)
  private _formatter!: IFormatter;

  private _randomSeed: number;
  private _gameSpeed: GameSpeed;
  private _money: IMoneyParameter | undefined;
  private _time: ITimeParameter | undefined;
  private _development: IDevelopmentParameter | undefined;
  private _computationalBase: IComputationalBaseParameter | undefined;
  private _programCompletionSpeed: IProgramCompletionSpeedParameter | undefined;
  private _moneyGrowth: IMoneyGrowthParameter | undefined;
  private _developmentGrowth: IDevelopmentGrowthParameter | undefined;
  private _programsGrowth: IProgramsGrowthParameter | undefined;
  private _unlockedFeatures: IUnlockedFeaturesParameter | undefined;
  private _storyEvents: IStoryEventsParameter | undefined;

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
        stateUiConnector: this._stateUiConnector,
        scenarioState: this._scenarioState,
      });
    }

    return this._money;
  }

  get time(): ITimeParameter {
    if (!this._time) {
      this._time = new TimeParameter({
        stateUiConnector: this._stateUiConnector,
        settingsState: this._settingsState,
        scenarioState: this._scenarioState,
        notificationsState: this._notificationsState,
        formatter: this._formatter,
      });
    }

    return this._time;
  }

  get development(): IDevelopmentParameter {
    if (!this._development) {
      this._development = new DevelopmentParameter({
        stateUiConnector: this._stateUiConnector,
        scenarioState: this._scenarioState,
        messageLogState: this._messageLogState,
        globalState: this,
      });
    }

    return this._development;
  }

  get computationalBase(): IComputationalBaseParameter {
    if (!this._computationalBase) {
      this._computationalBase = new ComputationalBaseParameter({
        stateUiConnector: this._stateUiConnector,
        scenarioState: this._scenarioState,
      });
    }

    return this._computationalBase;
  }

  get programCompletionSpeed(): IProgramCompletionSpeedParameter {
    if (!this._programCompletionSpeed) {
      this._programCompletionSpeed = new ProgramCompletionSpeedParameter({
        stateUiConnector: this._stateUiConnector,
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
        stateUiConnector: this._stateUiConnector,
        mainframeProcessesState: this._mainframeProcessesState,
      });
    }

    return this._moneyGrowth;
  }

  get developmentGrowth(): IDevelopmentGrowthParameter {
    if (!this._developmentGrowth) {
      this._developmentGrowth = new DevelopmentGrowthParameter({
        stateUiConnector: this._stateUiConnector,
        mainframeProcessesState: this._mainframeProcessesState,
      });
    }

    return this._developmentGrowth;
  }

  get programsGrowth(): IProgramsGrowthParameter {
    if (!this._programsGrowth) {
      this._programsGrowth = new ProgramsGrowthParameter({
        stateUiConnector: this._stateUiConnector,
        mainframeProcessesState: this._mainframeProcessesState,
      });
    }

    return this._programsGrowth;
  }

  get unlockedFeatures(): IUnlockedFeaturesParameter {
    if (!this._unlockedFeatures) {
      this._unlockedFeatures = new UnlockedFeaturesParameter({
        stateUiConnector: this._stateUiConnector,
        messageLogState: this._messageLogState,
        notificationsState: this._notificationsState,
      });
    }

    return this._unlockedFeatures;
  }

  get storyEvents(): IStoryEventsParameter {
    if (!this._storyEvents) {
      this._storyEvents = new StoryEventsParameter({
        globalState: this,
        scenarioState: this._scenarioState,
        messageLogState: this._messageLogState,
        notificationsState: this._notificationsState,
      });
    }

    return this._storyEvents;
  }

  requestGrowthRecalculation() {
    this.programCompletionSpeed.requestRecalculation();
    this.moneyGrowth.requestRecalculation();
    this.developmentGrowth.requestRecalculation();
    this.programsGrowth.requestRecalculation();
  }

  recalculate() {
    this.time.recalculate();
    this.development.recalculateLevel();
    this.computationalBase.recalculateDiscount();
    this.programCompletionSpeed.recalculate();
    this.moneyGrowth.recalculate();
    this.developmentGrowth.recalculate();
    this.programsGrowth.recalculate();
  }

  async startNewState(): Promise<void> {
    this._randomSeed = Date.now();
    this._gameSpeed = GameSpeed.normal;
    await this.money.startNewState();
    await this.time.startNewState();
    await this.development.startNewState();
    await this.computationalBase.startNewState();
    await this.unlockedFeatures.startNewState();
    await this.storyEvents.startNewState();

    this.requestGrowthRecalculation();
  }

  async deserialize(serializedState: IGlobalSerializedState): Promise<void> {
    this._randomSeed = serializedState.randomSeed;
    this._gameSpeed = serializedState.gameSpeed;
    await this.money.deserialize(serializedState.money);
    await this.time.deserialize(serializedState.time);
    await this.development.deserialize(serializedState.development);
    await this.computationalBase.deserialize(serializedState.computationalBase);
    await this.unlockedFeatures.deserialize(serializedState.unlockedFeatures);
    await this.storyEvents.deserialize(serializedState.storyEvents);

    this.requestGrowthRecalculation();
  }

  serialize(): IGlobalSerializedState {
    return {
      randomSeed: this._randomSeed,
      gameSpeed: this._gameSpeed,
      money: this.money.serialize(),
      time: this.time.serialize(),
      development: this.development.serialize(),
      computationalBase: this.computationalBase.serialize(),
      unlockedFeatures: this.unlockedFeatures.serialize(),
      storyEvents: this.storyEvents.serialize(),
    };
  }
}
