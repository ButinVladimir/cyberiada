import { inject, injectable } from 'inversify';
import { decorators } from '@state/container';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { ClonesEvent, Feature, PurchaseEvent, PurchaseType } from '@shared/types';
import { moveElementInArray, removeElementsFromArray } from '@shared/helpers';
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

  private _stateUiConnector: IStateUIConnector;
  private _globalState: IGlobalState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private _totalSynchronization: number;
  private _availableSynchronization: number;
  private _experienceModifier: number;
  private _extraExperience: number;
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

    this._totalSynchronization = 0;
    this._availableSynchronization = 0;
    this._experienceModifier = 0;
    this._extraExperience = 0;
    this._clonesList = [];
    this._clonesMap = new Map<string, IClone>();

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get totalSynchronization() {
    this._stateUiConnector.connectEventHandler(this, COMPANY_CLONES_STATE_UI_EVENTS.SYNCHRONIZATION_UPDATED);

    return this._totalSynchronization;
  }

  get availableSynchronization() {
    this._stateUiConnector.connectEventHandler(this, COMPANY_CLONES_STATE_UI_EVENTS.SYNCHRONIZATION_UPDATED);

    return this._availableSynchronization;
  }

  get experienceModifier() {
    this._stateUiConnector.connectEventHandler(this, COMPANY_CLONES_STATE_UI_EVENTS.SYNCHRONIZATION_UPDATED);

    return this._experienceModifier;
  }

  get extraExperience() {
    return this._extraExperience;
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

    if (clone.synchonization + this.availableSynchronization > this.totalSynchronization) {
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
      removeElementsFromArray(this._clonesList, index, 1);
    }

    if (clone) {
      clone.removeEventListeners();

      this._clonesMap.delete(id);

      this._messageLogState.postMessage(ClonesEvent.cloneDeleted, {
        name: clone.name,
      });
    }

    this.recalculateSynchronization();

    this.uiEventBatcher.enqueueEvent(COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);
  }

  deleteAllClones(): void {
    this.clearState();

    this._messageLogState.postMessage(ClonesEvent.allClonesDeleted);

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

  earnExtraExperience(delta: number) {
    const modifiedDelta = Math.max(delta * (this.experienceModifier - 1), 0);
    this._extraExperience += modifiedDelta;
  }

  spendExtraExperience() {
    for (const clone of this._clonesList) {
      clone.increaseExperience(this._extraExperience);
    }

    this._extraExperience = 0;
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

    this.recalculateSynchronization();

    this.uiEventBatcher.enqueueEvent(COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);
  }

  serialize(): ICompanyClonesSerializedState {
    return {
      clones: this._clonesList.map((clone) => clone.serialize()),
      extraExperience: this.extraExperience,
    };
  }

  private recalculateSynchronization() {
    this._totalSynchronization = this._globalState.scenario.currentValues.baseSynchronization;
    this._availableSynchronization = this._totalSynchronization;

    for (const clone of this._clonesList) {
      this._availableSynchronization -= clone.synchonization;
    }

    const usedSynchronization = this._totalSynchronization - this._availableSynchronization;

    this._availableSynchronization = Math.max(0, this._availableSynchronization);

    if (!this._globalState.unlockedFeatures.isFeatureUnlocked(Feature.experienceShare)) {
      this._experienceModifier = 1;
    } else if (usedSynchronization > 0) {
      this._experienceModifier = this._totalSynchronization / usedSynchronization;
    } else {
      this._experienceModifier = 0;
    }

    this.uiEventBatcher.enqueueEvent(COMPANY_CLONES_STATE_UI_EVENTS.SYNCHRONIZATION_UPDATED);
  }

  private clearState() {
    for (const clone of this._clonesList) {
      clone.removeEventListeners();
    }

    this._clonesList.length = 0;
    this._clonesMap.clear();

    this.recalculateSynchronization();
  }

  private addClone(clone: IClone) {
    if (!this._clonesMap.has(clone.id)) {
      this._clonesList.push(clone);
    }

    this._clonesMap.set(clone.id, clone);

    this.recalculateSynchronization();
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
