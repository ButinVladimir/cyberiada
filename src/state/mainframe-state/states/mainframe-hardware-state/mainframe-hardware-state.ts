import { injectable, inject } from 'inversify';
import constants from '@configs/constants.json';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IMainframeState } from '../../interfaces/mainframe-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { EventBatcher } from '@shared/event-batcher';
import { moveElementInArray } from '@shared/helpers';
import {
  IMainframeHardwareState,
  IMainframeHardwareSerializedState,
  IMainframeHardwareParameterArguments,
  IMainframeHardwareParameter,
} from './interfaces';
import { MAINFRAME_HARDWARE_STATE_UI_EVENTS } from './constants';
import { MainframeHardwarePerformance } from './mainframe-hardware-performance';
import { MainframeHardwareCores } from './mainframe-hardware-cores';
import { MainframeHardwareRam } from './mainframe-hardware-ram';
import { MainframeHardwareParameterType } from './types';

const { lazyInject } = decorators;

@injectable()
export class MainframeHardwareState implements IMainframeHardwareState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  private _stateUiConnector: IStateUIConnector;
  private _globalState: IGlobalState;
  private _growthState: IGrowthState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private _parametersList!: IMainframeHardwareParameter[];
  private _performance: MainframeHardwarePerformance;
  private _cores: MainframeHardwareCores;
  private _ram: MainframeHardwareRam;

  constructor(
    @inject(TYPES.StateUIConnector) _stateUiConnector: IStateUIConnector,
    @inject(TYPES.GlobalState) _globalState: IGlobalState,
    @inject(TYPES.GrowthState) _growthState: IGrowthState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.Formatter) _formatter: IFormatter,
  ) {
    this._stateUiConnector = _stateUiConnector;
    this._globalState = _globalState;
    this._growthState = _growthState;
    this._messageLogState = _messageLogState;
    this._formatter = _formatter;

    const parameterArguments: IMainframeHardwareParameterArguments = {
      stateUiConnector: this._stateUiConnector,
      mainframeHardwareState: this,
      globalState: this._globalState,
      messageLogState: this._messageLogState,
      formatter: this._formatter,
    };

    this._performance = new MainframeHardwarePerformance(parameterArguments);
    this._cores = new MainframeHardwareCores(parameterArguments);
    this._ram = new MainframeHardwareRam(parameterArguments);

    this.buildParametersList(
      constants.defaultAutomationSettings.mainframeHardwareAutobuyer.priority as MainframeHardwareParameterType[],
    );

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get performance() {
    this._stateUiConnector.connectEventHandler(this, MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPGRADED);

    return this._performance;
  }

  get cores() {
    this._stateUiConnector.connectEventHandler(this, MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPGRADED);

    return this._cores;
  }

  get ram() {
    this._stateUiConnector.connectEventHandler(this, MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPGRADED);

    return this._ram;
  }

  listParameters(): IMainframeHardwareParameter[] {
    this._stateUiConnector.connectEventHandler(this, MAINFRAME_HARDWARE_STATE_UI_EVENTS.AUTOBUYER_UPDATED);

    return this._parametersList;
  }

  moveParameter(parameterType: MainframeHardwareParameterType, newPosition: number) {
    const oldPosition = this._parametersList.findIndex((parameter) => parameter.type === parameterType);

    if (oldPosition === -1) {
      return;
    }

    moveElementInArray(this._parametersList, oldPosition, newPosition);

    this.emitAutobuyerUpdatedEvent();
  }

  purchaseMax() {
    for (const parameter of this._parametersList) {
      if (parameter.autoUpgradeEnabled) {
        parameter.purchaseMax();
      }
    }
  }

  emitUpgradedEvent() {
    this._mainframeState.processes.requestUpdateProcesses();
    this._growthState.requestGrowthRecalculation();
    this.uiEventBatcher.enqueueEvent(MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPGRADED);
  }

  emitAutobuyerUpdatedEvent() {
    this.uiEventBatcher.enqueueEvent(MAINFRAME_HARDWARE_STATE_UI_EVENTS.AUTOBUYER_UPDATED);
  }

  async startNewState(): Promise<void> {
    await this._performance.startNewState();
    await this._cores.startNewState();
    await this._ram.startNewState();

    this.buildParametersList(
      constants.defaultAutomationSettings.mainframeHardwareAutobuyer.priority as MainframeHardwareParameterType[],
    );
  }

  async deserialize(serializedState: IMainframeHardwareSerializedState): Promise<void> {
    await this._performance.deserialize(serializedState.performance);
    await this._cores.deserialize(serializedState.cores);
    await this._ram.deserialize(serializedState.ram);

    this.buildParametersList(serializedState.parametersList);
  }

  serialize(): IMainframeHardwareSerializedState {
    return {
      performance: this._performance.serialize(),
      cores: this._cores.serialize(),
      ram: this._ram.serialize(),
      parametersList: this._parametersList.map((parameter) => parameter.type),
    };
  }

  private buildParametersList(parameterTypes: MainframeHardwareParameterType[]) {
    this._parametersList = parameterTypes.map(this.getParameterByType);
  }

  private getParameterByType = (type: MainframeHardwareParameterType): IMainframeHardwareParameter => {
    switch (type) {
      case 'performance':
        return this.performance;
      case 'cores':
        return this.cores;
      case 'ram':
        return this.ram;
    }
  };
}
