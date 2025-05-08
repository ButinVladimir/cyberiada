import { injectable, inject } from 'inversify';
import constants from '@configs/constants.json';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IMainframeState } from '../../interfaces/mainframe-state';
import type { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { moveElementInArray } from '@shared/helpers';
import {
  IMainframeHardwareState,
  IMainframeHardwareSerializedState,
  IMainframeHardwareParameterArguments,
  IMainframeHardwareParameter,
} from './interfaces';
import { MainframeHardwarePerformance } from './mainframe-hardware-performance';
import { MainframeHardwareCores } from './mainframe-hardware-cores';
import { MainframeHardwareRam } from './mainframe-hardware-ram';
import { MainframeHardwareParameterType } from './types';

const { lazyInject } = decorators;

@injectable()
export class MainframeHardwareState implements IMainframeHardwareState {
  private UI_EVENTS = {
    HARDWARE_LIST_CHANGED: Symbol('HARDWARE_LIST_CHANGED'),
  };

  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  @lazyInject(TYPES.GrowthState)
  private _growthState!: IGrowthState;

  private _stateUiConnector: IStateUIConnector;
  private _globalState: IGlobalState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private _parametersList!: IMainframeHardwareParameter[];
  private _performance: MainframeHardwarePerformance;
  private _cores: MainframeHardwareCores;
  private _ram: MainframeHardwareRam;

  constructor(
    @inject(TYPES.StateUIConnector) _stateUiConnector: IStateUIConnector,
    @inject(TYPES.GlobalState) _globalState: IGlobalState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.Formatter) _formatter: IFormatter,
  ) {
    this._stateUiConnector = _stateUiConnector;
    this._globalState = _globalState;
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

    this._stateUiConnector.registerEvents(this.UI_EVENTS);
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

  listParameters(): IMainframeHardwareParameter[] {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.HARDWARE_LIST_CHANGED);

    return this._parametersList;
  }

  moveParameter(parameterType: MainframeHardwareParameterType, newPosition: number) {
    const oldPosition = this._parametersList.findIndex((parameter) => parameter.type === parameterType);

    if (oldPosition === -1) {
      return;
    }

    moveElementInArray(this._parametersList, oldPosition, newPosition);

    this._stateUiConnector.enqueueEvent(this.UI_EVENTS.HARDWARE_LIST_CHANGED);
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
    this._mainframeState.processes.requestUpdatePerformance();
    this._growthState.programCompletionSpeed.requestMultipliersRecalculation();
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
      parametersList: this._parametersList.map(this.serializeParameterType),
    };
  }

  private buildParametersList(parameterTypes: MainframeHardwareParameterType[]) {
    this._parametersList = parameterTypes.map(this.getParameterByType);
  }

  private serializeParameterType = (parameter: IMainframeHardwareParameter): MainframeHardwareParameterType => {
    return parameter.type;
  };

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
