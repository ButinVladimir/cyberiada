import { injectable } from 'inversify';
import { msg, str } from '@lit/localize';
import { decorators } from '@state/container';
import programs from '@configs/programs.json';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IFormatter } from '@shared/interfaces/formatter';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { TYPES } from '@state/types';
import { Feature, ProgramsEvent, PurchaseType } from '@shared/types';
import { calculateTierPower } from '@shared/helpers';
import { binarySearchDecimal, moveElementInArray } from '@shared/helpers';
import { PROGRAM_TEXTS } from '@texts/programs';
import { IMainframeProgramsState, IMainframeProgramsSerializedState } from './interfaces';
import { ProgramName } from '../progam-factory/types';
import { IMakeProgramParameters, IProgram } from '../progam-factory/interfaces';

const { lazyInject } = decorators;

@injectable()
export class MainframeProgramsState implements IMainframeProgramsState {
  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.MessageLogState)
  private _messageLogState!: IMessageLogState;

  @lazyInject(TYPES.Formatter)
  private _formatter!: IFormatter;

  private _programsList: IProgram[];
  private _ownedPrograms: Map<ProgramName, IProgram>;

  constructor() {
    this._programsList = [];
    this._ownedPrograms = new Map();

    this._stateUiConnector.registerEventEmitter(this, ['_programsList']);
  }

  getProgramCost(name: ProgramName, tier: number, level: number): number {
    const programData = programs[name];

    return calculateTierPower(level, tier, programData.cost) / this._globalState.multipliers.codeBase.totalMultiplier;
  }

  purchaseProgram(name: ProgramName, tier: number, level: number): boolean {
    if (!this._globalState.unlockedFeatures.isFeatureUnlocked(Feature.mainframeUpgrades)) {
      return false;
    }

    if (!this._globalState.availableItems.programs.isItemAvailable(name, tier, level)) {
      return false;
    }

    const cost = this.getProgramCost(name, tier, level);

    const bought = this._globalState.money.purchase(
      cost,
      PurchaseType.mainframePrograms,
      this.handlePurchaseProgram(name, tier, level),
    );

    return bought;
  }

  upgradeMaxProgram(name: ProgramName): boolean {
    const existingProgram = this.getOwnedProgramByName(name);

    if (!existingProgram) {
      return false;
    }

    const checkProgramUpgrade = this.handleCheckProgramUpgrade(existingProgram);
    const level = binarySearchDecimal(existingProgram.level, this._globalState.development.level, checkProgramUpgrade);

    if (level <= existingProgram.level) {
      return false;
    }

    return this.purchaseProgram(name, existingProgram.tier, level);
  }

  upgradeMaxAllPrograms(): void {
    for (const program of this._programsList) {
      if (program.autoUpgradeEnabled) {
        this.upgradeMaxProgram(program.name);
      }
    }
  }

  listOwnedPrograms(): IProgram[] {
    return this._programsList;
  }

  getOwnedProgramByName(name: ProgramName): IProgram | undefined {
    return this._ownedPrograms.get(name);
  }

  toggleProgramsAutoUpgrade(active: boolean) {
    for (const program of this._ownedPrograms.values()) {
      program.autoUpgradeEnabled = active;
    }
  }

  moveProgram(programName: ProgramName, newPosition: number) {
    const oldPosition = this._programsList.findIndex((program) => program.name === programName);

    if (oldPosition === -1) {
      return;
    }

    moveElementInArray(this._programsList, oldPosition, newPosition);
  }

  async startNewState(): Promise<void> {
    this.clearState();

    for (const programName of this._globalState.scenario.currentValues.mainframeSoftware.startingPrograms) {
      this.addProgram(programName, 0, 0);
    }
  }

  async deserialize(serializedState: IMainframeProgramsSerializedState): Promise<void> {
    this.clearState();

    serializedState.ownedPrograms.forEach((programParameters) => {
      const program = this._mainframeState.programFactory.makeProgram(programParameters);
      this._ownedPrograms.set(programParameters.name, program);
      this._programsList.push(program);
    });
  }

  serialize(): IMainframeProgramsSerializedState {
    return {
      ownedPrograms: this._programsList.map(this.serializeProgram),
    };
  }

  private serializeProgram = (program: IProgram): IMakeProgramParameters => {
    return program.serialize();
  };

  private addProgram(name: ProgramName, tier: number, level: number): void {
    const existingProgram = this._ownedPrograms.get(name);

    if (existingProgram) {
      existingProgram.upgrade(tier, level);
    } else {
      const newProgram = this._mainframeState.programFactory.makeProgram({
        name,
        tier: tier,
        level,
        autoUpgradeEnabled: true,
      });

      this._ownedPrograms.set(newProgram.name, newProgram);
      this._programsList.push(newProgram);

      for (const feature of newProgram.unlockFeatures) {
        this._globalState.unlockedFeatures.unlockFeature(feature);
      }
    }
  }

  private handlePurchaseProgram = (name: ProgramName, tier: number, level: number) => () => {
    this.addProgram(name, tier, level);

    const programTitle = PROGRAM_TEXTS[name].title();
    const formattedLevel = this._formatter.formatLevel(level);
    const formattedTier = this._formatter.formatTier(tier);
    this._messageLogState.postMessage(
      ProgramsEvent.programPurchased,
      msg(str`Program "${programTitle}" with tier ${formattedTier} and level ${formattedLevel} has been purchased`),
    );
  };

  private clearState() {
    for (const ownedProgram of this._programsList) {
      ownedProgram.removeAllEventListeners();
    }

    this._ownedPrograms.clear();
    this._programsList.length = 0;
  }

  private handleCheckProgramUpgrade = (existingProgram: IProgram) => (level: number) => {
    if (!this._globalState.availableItems.programs.isItemAvailable(existingProgram.name, existingProgram.tier, level)) {
      return false;
    }

    const cost = this.getProgramCost(existingProgram.name, existingProgram.tier, level);

    return cost <= this._globalState.money.money;
  };
}
