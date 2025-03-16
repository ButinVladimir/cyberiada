import { inject, injectable } from 'inversify';
import { decorators } from '@state/container';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { ClonesEvent, Feature, PurchaseEvent, PurchaseType } from '@shared/types';
import { moveElementInArray } from '@shared/helpers';
import type { ICompanyState } from '../../interfaces/company-state';
import { IClone } from '../clone-factory/interfaces/clone';
import { IMakeCloneParameters } from '../clone-factory/interfaces/make-clone-parameters';
import { ICompanyClonesSerializedState, ICompanyClonesState } from './interfaces';
import { COMPANY_CLONES_STATE_UI_EVENTS } from './constants';

const { lazyInject } = decorators;

@injectable()
export class CompanyClonesState implements ICompanyClonesState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.CompanyState)
  private _companyState!: ICompanyState;

  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  private _stateUiConnector: IStateUIConnector;
  private _globalState: IGlobalState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private _reservedCores: number;
  private _reservedRam: number;
  private _clonesList: IClone[];
  private _clonesMap: Map<string, IClone>;

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

    this._reservedCores = 0;
    this._reservedRam = 0;
    this._clonesList = [];
    this._clonesMap = new Map<string, IClone>();

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get reservedCores() {
    this._stateUiConnector.connectEventHandler(this, COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);

    return this._reservedCores;
  }

  get reservedRam() {
    this._stateUiConnector.connectEventHandler(this, COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);

    return this._reservedRam;
  }

  listClones(): IClone[] {
    this._stateUiConnector.connectEventHandler(this, COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);

    return this._clonesList;
  }

  getCloneById(id: string): IClone | undefined {
    this._stateUiConnector.connectEventHandler(this, COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);

    return this._clonesMap.get(id);
  }

  purchaseClone(cloneParameters: IMakeCloneParameters): boolean {
    if (!this._globalState.unlockedFeatures.isFeatureUnlocked(Feature.companyManagement)) {
      return false;
    }

    if (!cloneParameters.name) {
      return false;
    }

    const clone = this._companyState.cloneFactory.makeClone(cloneParameters);

    if (clone.cores + this._reservedCores > this._mainframeState.hardware.cores.level) {
      return false;
    }

    if (clone.ram > this._mainframeState.processes.availableRam) {
      return false;
    }

    const bought = this._globalState.money.purchase(clone.cost, PurchaseType.clones, this.handlePurhaseClone(clone));

    return bought;
  }

  toggleAllClones(active: boolean): void {
    for (const clone of this._clonesList) {
      clone.autoUpgradeEnabled = active;
    }
  }

  deleteClone(id: string): void {
    const clone: IClone | undefined = this.getCloneById(id);
    const index = this._clonesList.findIndex((clone) => clone.id === id);

    if (index >= 0) {
      this._clonesList.splice(index, 1);
    }

    if (clone) {
      clone.removeEventListeners();

      this._clonesMap.delete(id);

      this._messageLogState.postMessage(ClonesEvent.cloneDeleted, {
        name: clone.name,
      });
    }

    this.recalculateReservedMainframeValues();

    this.uiEventBatcher.enqueueEvent(COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);
  }

  deleteAllClones(): void {
    this.clearState();

    this._messageLogState.postMessage(ClonesEvent.allClonesDeleted);

    this.recalculateReservedMainframeValues();

    this.uiEventBatcher.enqueueEvent(COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);
  }

  processTick(): void {
    for (const clone of this._clonesList) {
      clone.increaseExperience(1);
    }
  }

  moveClone(id: string, newPosition: number): void {
    const oldPosition = this._clonesList.findIndex((clone) => clone.id === id);

    if (oldPosition >= 0) {
      moveElementInArray(this._clonesList, oldPosition, newPosition);
    }

    this.uiEventBatcher.enqueueEvent(COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);
  }

  async startNewState(): Promise<void> {
    this.clearState();

    this.uiEventBatcher.enqueueEvent(COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);
  }

  async deserialize(serializedState: ICompanyClonesSerializedState): Promise<void> {
    this.clearState();

    serializedState.clones.forEach((makeCloneParameters) => {
      const clone = this._companyState.cloneFactory.makeClone(makeCloneParameters);
      this._clonesList.push(clone);
      this._clonesMap.set(clone.id, clone);
    });

    this.recalculateReservedMainframeValues();

    this.uiEventBatcher.enqueueEvent(COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);
  }

  serialize(): ICompanyClonesSerializedState {
    return {
      clones: this._clonesList.map((clone) => clone.serialize()),
    };
  }

  private recalculateReservedMainframeValues() {
    this._reservedCores = 0;
    this._reservedRam = 0;

    for (const clone of this._clonesList) {
      this._reservedCores += clone.cores;
      this._reservedRam += clone.ram;
    }

    this._mainframeState.processes.requestUpdateProcesses();
  }

  private clearState() {
    for (const clone of this._clonesList) {
      clone.removeEventListeners();
    }

    this._clonesList = [];
    this._clonesMap.clear();
  }

  private addClone(clone: IClone) {
    if (!this._clonesMap.has(clone.id)) {
      this._clonesList.push(clone);
    }

    this._clonesMap.set(clone.id, clone);

    this.recalculateReservedMainframeValues();
  }

  private handlePurhaseClone = (clone: IClone) => () => {
    this.addClone(clone);

    this._messageLogState.postMessage(PurchaseEvent.clonePurchased, {
      name: clone.name,
      templateName: clone.templateName,
      level: this._formatter.formatNumberDecimal(clone.level),
      quality: this._formatter.formatQuality(clone.quality),
    });
  };
}
