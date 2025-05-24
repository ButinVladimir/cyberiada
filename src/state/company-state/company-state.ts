import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import { ICompanySerializedState, ICompanyState } from './interfaces';
import { type ICloneFactory, type ICompanyClonesState, ISidejobsState, SidejobsState } from './states';

@injectable()
export class CompanyState implements ICompanyState {
  private _cloneFactory: ICloneFactory;
  private _clones: ICompanyClonesState;
  private _sidejobs: ISidejobsState;

  private _assignmentRequested: boolean;

  constructor(
    @inject(TYPES.CloneFactory) _cloneFactory: ICloneFactory,
    @inject(TYPES.CompanyClonesState) _clones: ICompanyClonesState,
  ) {
    this._cloneFactory = _cloneFactory;
    this._clones = _clones;
    this._sidejobs = new SidejobsState();

    this._assignmentRequested = true;
  }

  get cloneFactory() {
    return this._cloneFactory;
  }

  get clones() {
    return this._clones;
  }

  get sidejobs() {
    return this._sidejobs;
  }

  requestReassignment() {
    this._assignmentRequested = true;
  }

  processTick() {
    this.reassign();
    this._sidejobs.perform();
    this._clones.recalculateClones();
  }

  private reassign() {
    if (!this._assignmentRequested) {
      return;
    }

    this._assignmentRequested = false;

    this.sidejobs.filterSidejobs();

    for (const sidejob of this._sidejobs.listSidejobs()) {
      sidejob.isActive = true;
    }
  }

  async startNewState(): Promise<void> {
    await this._clones.startNewState();
    await this._sidejobs.startNewState();
    this.requestReassignment();
  }

  async deserialize(serializedState: ICompanySerializedState): Promise<void> {
    await this._clones.deserialize(serializedState.clones);
    await this._sidejobs.deserialize(serializedState.sidejobs);
    this.requestReassignment();
  }

  serialize(): ICompanySerializedState {
    return {
      clones: this._clones.serialize(),
      sidejobs: this._sidejobs.serialize(),
    };
  }
}
