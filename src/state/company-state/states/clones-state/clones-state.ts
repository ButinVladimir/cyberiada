import { inject, injectable } from 'inversify';
import { v4 as uuid } from 'uuid';
import { msg, str } from '@lit/localize';
import padStart from 'lodash/padStart';
import cloneTemplates from '@configs/clone-templates.json';
import names from '@configs/names.json';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from '@state/types';
import { ClonesEvent, Feature, PurchaseType } from '@shared/types';
import {
  calculateTierMultiplier,
  calculateTierPower,
  moveElementInArray,
  removeElementsFromArray,
} from '@shared/helpers';
import { CLONE_TEMPLATE_TEXTS, CLONE_NAMES } from '@texts/index';
import type { ICompanyState } from '../../interfaces/company-state';
import { IClone } from '../clone-factory/interfaces/clone';
import {
  ICompanyClonesSerializedState,
  ICompanyClonesState,
  type IExperienceShareParameter,
  IPurchaseCloneArgs,
} from './interfaces';
import { CloneTemplateName, IMakeCloneParameters } from '../clone-factory';


const { lazyInject } = decorators;

@injectable()
export class CompanyClonesState implements ICompanyClonesState {
  @lazyInject(TYPES.CompanyState)
  private _companyState!: ICompanyState;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.MessageLogState)
  private _messageLogState!: IMessageLogState;

  @lazyInject(TYPES.Formatter)
  private _formatter!: IFormatter;

  private _experienceShare: IExperienceShareParameter;

  private _availableSynchronization: number;
  private _clonesList: IClone[];
  private _clonesMap: Map<string, IClone>;

  constructor(@inject(TYPES.ExperienceShareParameter) _experienceShare: IExperienceShareParameter) {
    this._experienceShare = _experienceShare;

    this._availableSynchronization = 0;
    this._clonesList = [];
    this._clonesMap = new Map<string, IClone>();

    this._stateUiConnector.registerEventEmitter(this, ['_availableSynchronization', '_clonesList']);
  }

  get availableSynchronization() {
    return this._availableSynchronization;
  }

  get experienceShare() {
    return this._experienceShare;
  }

  listClones(): IClone[] {
    return this._clonesList;
  }

  earnCloneExperience(id: string, delta: number): void {
    const clone = this.getCloneById(id);

    if (!clone) {
      return;
    }

    clone.increaseExperience(delta);
    this._experienceShare.increaseExperience(delta);
  }

  getCloneById(id: string): IClone | undefined {
    return this._clonesMap.get(id);
  }

  getCloneCost(templateName: CloneTemplateName, tier: number, level: number): number {
    return calculateTierPower(level, tier, cloneTemplates[templateName].cost);
  }

  getCloneSynchronization(templateName: CloneTemplateName, tier: number): number {
    const template = cloneTemplates[templateName];

    return Math.ceil(
      template.synchronization.multiplier * calculateTierMultiplier(tier, template.synchronization.baseTier),
    );
  }

  purchaseClone(args: IPurchaseCloneArgs): boolean {
    if (!this._globalState.unlockedFeatures.isFeatureUnlocked(Feature.companyManagement)) {
      return false;
    }

    if (!args.name) {
      return false;
    }

    const synchronization = this.getCloneSynchronization(args.templateName, args.tier);

    if (synchronization > this._availableSynchronization) {
      return false;
    }

    const cost = this.getCloneCost(args.templateName, args.tier, args.level);

    const bought = this._globalState.money.purchase(cost, PurchaseType.clones, this.handlePurhaseClone(args));

    return bought;
  }

  toggleAllClonesAutoupgrade(active: boolean): void {
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
      this.deleteCloneRelatedObjects(clone);

      this._messageLogState.postMessage(ClonesEvent.cloneDeleted, msg(str`Clone "${clone.name}" has been deleted`));
    }

    this.updateSynchronization();

    this._companyState.requestReassignment();
  }

  deleteAllClones(): void {
    this.clearState();
    this._companyState.sidejobs.cancelAllSidejobs();

    this._messageLogState.postMessage(ClonesEvent.allClonesDeleted, msg('All clones have been deleted'));

    this.updateSynchronization();

    this._companyState.requestReassignment();
  }

  recalculateClones(): void {
    this._experienceShare.spendExperience();

    for (const clone of this._clonesList) {
      clone.recalculate();
    }
  }

  moveClone(id: string, newPosition: number): void {
    const oldPosition = this._clonesList.findIndex((clone) => clone.id === id);

    if (oldPosition >= 0) {
      moveElementInArray(this._clonesList, oldPosition, newPosition);
    }
  }

  generateCloneName(): string {
    const namePart = CLONE_NAMES[this._globalState.random.choice(names.clones)]();

    const serialNumber = this._globalState.random.randRange(0, 9999);
    const serialNumberPart = padStart(serialNumber.toString(), 4, '0');

    return `${namePart}#${serialNumberPart}`;
  }

  updateSynchronization() {
    this._availableSynchronization = this._globalState.synchronization.totalValue;

    for (const clone of this._clonesList) {
      this._availableSynchronization -= this.getCloneSynchronization(clone.templateName, clone.tier);
    }

    this._experienceShare.recalculateMultipliers();
  }

  upgradeMaxAllLevels() {
    for (const clone of this._clonesList) {
      if (clone.autoUpgradeEnabled) {
        clone.upgradeMaxLevel();
      }
    }
  }

  async startNewState(): Promise<void> {
    this.clearState();
    this.handleStateReset();
  }

  async deserialize(serializedState: ICompanyClonesSerializedState): Promise<void> {
    this.clearState();

    serializedState.clones.forEach((makeCloneParameters) => {
      const clone = this._companyState.cloneFactory.makeClone(makeCloneParameters);
      this._clonesList.push(clone);
      this._clonesMap.set(clone.id, clone);
    });

    this.handleStateReset();
  }

  serialize(): ICompanyClonesSerializedState {
    return {
      clones: this._clonesList.map(this.serializeClone),
    };
  }

  private serializeClone = (clone: IClone): IMakeCloneParameters => {
    return clone.serialize();
  };

  private clearState() {
    for (const clone of this._clonesList) {
      clone.removeAllEventListeners();
    }

    this._clonesList.length = 0;
    this._clonesMap.clear();
  }

  private addClone(clone: IClone) {
    if (!this._clonesMap.has(clone.id)) {
      this._clonesList.push(clone);
    }

    this._clonesMap.set(clone.id, clone);

    this.updateSynchronization();
  }

  private handlePurhaseClone = (args: IPurchaseCloneArgs) => () => {
    const clone = this._companyState.cloneFactory.makeClone({
      id: uuid(),
      name: args.name,
      templateName: args.templateName,
      tier: args.tier,
      level: args.level,
      experience: 0,
      autoUpgradeEnabled: true,
    });

    this.addClone(clone);

    const formattedLevel = this._formatter.formatLevel(clone.level);
    const formattedTier = this._formatter.formatTier(clone.tier);

    this._messageLogState.postMessage(
      ClonesEvent.clonePurchased,
      msg(
        str`Clone "${clone.name}" with template "${CLONE_TEMPLATE_TEXTS[clone.templateName].title()}", tier ${formattedTier} and level ${formattedLevel} has been purchased`,
      ),
    );
  };

  private deleteCloneRelatedObjects(clone: IClone) {
    const sidejob = this._companyState.sidejobs.getSidejobByCloneId(clone.id);

    if (sidejob) {
      this._companyState.sidejobs.cancelSidejob(sidejob.id);
    }
  }

  private handleStateReset() {
    this._experienceShare.resetExperience();
    this.recalculateClones();
    this.updateSynchronization();
  }
}
