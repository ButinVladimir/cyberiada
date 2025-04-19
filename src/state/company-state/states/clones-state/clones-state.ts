import { inject, injectable } from 'inversify';
import { v4 as uuid } from 'uuid';
import { msg, str } from '@lit/localize';
import cloneTemplates from '@configs/clone-templates.json';
import { decorators } from '@state/container';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { ClonesEvent, Feature, PurchaseEvent, PurchaseType } from '@shared/types';
import { calculatePowWithQuality, moveElementInArray, removeElementsFromArray } from '@shared/helpers';
import { CLONE_TEMPLATE_TEXTS } from '@texts/clone-templates';
import type { ICompanyState } from '../../interfaces/company-state';
import { IClone } from '../clone-factory/interfaces/clone';
import { ICompanyClonesSerializedState, ICompanyClonesState } from './interfaces';
import { COMPANY_CLONES_STATE_UI_EVENTS } from './constants';
import { CloneTemplateName } from '../clone-factory/types';

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

  listClones(): IClone[] {
    this._stateUiConnector.connectEventHandler(this, COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);

    return this._clonesList;
  }

  getCloneById(id: string): IClone | undefined {
    this._stateUiConnector.connectEventHandler(this, COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);

    return this._clonesMap.get(id);
  }

  getCloneCost(templateName: CloneTemplateName, quality: number, level: number): number {
    return calculatePowWithQuality(level - 1, quality, cloneTemplates[templateName].cost);
  }

  getCloneSynchronization(templateName: CloneTemplateName, quality: number): number {
    const template = cloneTemplates[templateName];

    return Math.ceil(
      template.synchronization.baseMultiplier * Math.pow(template.synchronization.qualityMultiplier, quality),
    );
  }

  purchaseClone(name: string, templateName: CloneTemplateName, quality: number, level: number): boolean {
    if (!this._globalState.unlockedFeatures.isFeatureUnlocked(Feature.companyManagement)) {
      return false;
    }

    if (!name) {
      return false;
    }

    const synchronization = this.getCloneSynchronization(templateName, quality);

    if (synchronization + this.availableSynchronization > this.totalSynchronization) {
      return false;
    }

    const cost = this.getCloneCost(templateName, quality, level);

    const bought = this._globalState.money.purchase(
      cost,
      PurchaseType.clones,
      this.handlePurhaseClone(name, templateName, quality, level),
    );

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
      clone.removeAllEventListeners();

      this._clonesMap.delete(id);

      this._messageLogState.postMessage(ClonesEvent.cloneDeleted, msg(str`Clone ${clone.name} has been deleted`));
    }

    this.recalculateSynchronization();

    this.uiEventBatcher.enqueueEvent(COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);
  }

  deleteAllClones(): void {
    this.clearState();

    this._messageLogState.postMessage(ClonesEvent.allClonesDeleted, msg('All clones have been deleted'));

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

    this.recalculateSynchronization();

    this.uiEventBatcher.enqueueEvent(COMPANY_CLONES_STATE_UI_EVENTS.CLONES_UPDATED);
  }

  serialize(): ICompanyClonesSerializedState {
    return {
      clones: this._clonesList.map((clone) => clone.serialize()),
    };
  }

  private recalculateSynchronization() {
    this._totalSynchronization = this._globalState.scenario.currentValues.baseSynchronization;
    this._availableSynchronization = this._totalSynchronization;

    for (const clone of this._clonesList) {
      this._availableSynchronization -= this.getCloneSynchronization(clone.templateName, clone.quality);
    }

    this.uiEventBatcher.enqueueEvent(COMPANY_CLONES_STATE_UI_EVENTS.SYNCHRONIZATION_UPDATED);
  }

  private clearState() {
    for (const clone of this._clonesList) {
      clone.removeAllEventListeners();
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

  private handlePurhaseClone =
    (name: string, templateName: CloneTemplateName, quality: number, level: number) => () => {
      const clone = this._companyState.cloneFactory.makeClone({
        id: uuid(),
        name,
        templateName,
        quality,
        level,
        experience: 0,
        autoUpgradeEnabled: true,
      });

      this.addClone(clone);

      const formattedLevel = this._formatter.formatNumberDecimal(clone.level);
      const formattedQuality = this._formatter.formatQuality(clone.quality);

      this._messageLogState.postMessage(
        PurchaseEvent.clonePurchased,
        msg(
          str`Clone ${clone.name} with template ${CLONE_TEMPLATE_TEXTS[clone.templateName].title()}, quality ${formattedQuality} and level ${formattedLevel} has been purchased`,
        ),
      );
    };
}
