import { injectable, inject } from 'inversify';
import { decorators } from '@state/container';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { EventBatcher } from '@shared/event-batcher';
import { IMainframeHardwareState, IMainframeHardwareSerializedState } from './interfaces';
import { MAINFRAME_HARDWARE_STATE_UI_EVENTS } from './constants';
import { MainframeHardwarePerformance } from './mainframe-hardware-performance';
import { MainframeHardwareCores } from './mainframe-hardware-cores';
import { MainframeHardwareRam } from './mainframe-hardware-ram';

const { lazyInject } = decorators;

@injectable()
export class MainframeHardwareState implements IMainframeHardwareState {
  @lazyInject(TYPES.MainframeProcessesState)
  private _mainframeProcessesState!: IMainframeProcessesState;

  private _scenarioState: IScenarioState;
  private _globalState: IGlobalState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private readonly _uiEventBatcher: EventBatcher;

  private _performance: MainframeHardwarePerformance;
  private _cores: MainframeHardwareCores;
  private _ram: MainframeHardwareRam;

  constructor(
    @inject(TYPES.ScenarioState) _scenarioState: IScenarioState,
    @inject(TYPES.GlobalState) _globalState: IGlobalState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.Formatter) _formatter: IFormatter,
  ) {
    this._scenarioState = _scenarioState;
    this._globalState = _globalState;
    this._messageLogState = _messageLogState;
    this._formatter = _formatter;

    this._performance = new MainframeHardwarePerformance({
      mainframeHardwareState: this,
      globalState: this._globalState,
      messageLogState: this._messageLogState,
      scenarioState: this._scenarioState,
      formatter: this._formatter,
    });
    this._cores = new MainframeHardwareCores({
      mainframeHardwareState: this,
      globalState: this._globalState,
      messageLogState: this._messageLogState,
      scenarioState: this._scenarioState,
      formatter: this._formatter,
    });
    this._ram = new MainframeHardwareRam({
      mainframeHardwareState: this,
      globalState: this._globalState,
      messageLogState: this._messageLogState,
      scenarioState: this._scenarioState,
      formatter: this._formatter,
    });

    this._uiEventBatcher = new EventBatcher();
  }

  get performance() {
    return this._performance;
  }

  get cores() {
    return this._cores;
  }

  get ram() {
    return this._ram;
  }

  emitUpgradedEvent() {
    this._mainframeProcessesState.requestUpdateProcesses();
    this._globalState.requestGrowthRecalculation();
    this._uiEventBatcher.enqueueEvent(MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPGRADED);
  }

  async startNewState(): Promise<void> {
    await this.performance.startNewState();
    await this.cores.startNewState();
    await this.ram.startNewState();
  }

  async deserialize(serializedState: IMainframeHardwareSerializedState): Promise<void> {
    await this.performance.deserialize(serializedState.performance);
    await this.cores.deserialize(serializedState.cores);
    await this.ram.deserialize(serializedState.ram);
  }

  serialize(): IMainframeHardwareSerializedState {
    return {
      performance: this.performance.serialize(),
      cores: this.cores.serialize(),
      ram: this.ram.serialize(),
    };
  }

  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.removeListener(eventName, handler);
  }

  fireUiEvents() {
    this._uiEventBatcher.fireEvents();
  }
}
