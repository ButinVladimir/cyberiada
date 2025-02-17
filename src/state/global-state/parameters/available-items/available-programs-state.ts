import { injectable } from 'inversify';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { EventBatcher } from '@shared/event-batcher';
import { TYPES } from '@state/types';
import { ProgramName } from '@state/progam-factory';
import type { IGlobalState } from '../../interfaces/global-state';
import { IAvailableProgramsState } from '../../interfaces/parameters/available-items/available-programs-state';
import { IAvailableProgramsSerializedState } from '../../interfaces/serialized-states/available-items/available-programs-serialized-state';

const { lazyInject } = decorators;

@injectable()
export class AvailableProgramsState implements IAvailableProgramsState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  private _loanedProgramQuality: number;
  private _neutralPrograms: Set<ProgramName>;
  private _loanedPrograms: Set<ProgramName>;
  private _programList: ProgramName[];

  constructor() {
    this._loanedProgramQuality = 0;
    this._neutralPrograms = new Set();
    this._loanedPrograms = new Set();
    this._programList = [];

    this.recalculateProgramList();

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get loanedProgramQuality() {
    return this._loanedProgramQuality;
  }

  listAvailablePrograms(): ProgramName[] {
    return this._programList;
  }

  isProgramAvailable(programName: ProgramName, quality: number, level: number): boolean {
    if (!(this._neutralPrograms.has(programName) || this._loanedPrograms.has(programName))) {
      return false;
    }

    const highestAvailableQuality = this.getProgramHighestAvailableQuality(programName);
    if (quality > highestAvailableQuality) {
      return false;
    }

    return level <= this._globalState.development.level;
  }

  getProgramHighestAvailableQuality(programName: ProgramName): number {
    let result: number | undefined = undefined;

    if (this._neutralPrograms.has(programName) || this._loanedPrograms.has(programName)) {
      result = this._loanedProgramQuality;
    }

    if (result === undefined) {
      throw new Error(`Program ${programName} is not available`);
    }

    return result;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._loanedProgramQuality = 6;
    this._loanedPrograms.clear();

    this.recalculateNeutralProgramList();
    this.recalculateProgramList();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IAvailableProgramsSerializedState): Promise<void> {
    this._loanedProgramQuality = serializedState.loanedProgramQuality;
    this._loanedPrograms.clear();

    serializedState.loanedPrograms.forEach((programName: ProgramName) => {
      this._loanedPrograms.add(programName);
    });

    this.recalculateNeutralProgramList();
    this.recalculateProgramList();
  }

  serialize(): IAvailableProgramsSerializedState {
    return {
      loanedProgramQuality: this._loanedProgramQuality,
      loanedPrograms: Array.from(this._loanedPrograms.values()),
    };
  }

  private recalculateNeutralProgramList() {
    this._neutralPrograms.clear();

    this._globalState.faction.neutralFactionValues.programs.forEach((programName) => {
      this._neutralPrograms.add(programName);
    });
  }

  private recalculateProgramList() {
    this._programList = Array.from(this._neutralPrograms.values());

    this._loanedPrograms.forEach((programName: ProgramName) => {
      if (!this._neutralPrograms.has(programName)) {
        this._programList.push(programName);
      }
    });
  }
}
