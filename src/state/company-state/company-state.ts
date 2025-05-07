import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import { ICompanySerializedState, ICompanyState } from './interfaces';
import { type ICloneFactory, type ICompanyClonesState, ISidejobsState, SidejobsState } from './states';

@injectable()
export class CompanyState implements ICompanyState {
  private _cloneFactory: ICloneFactory;
  private _clones: ICompanyClonesState;
  private _sidejobs: ISidejobsState;

  constructor(
    @inject(TYPES.CloneFactory) _cloneFactory: ICloneFactory,
    @inject(TYPES.CompanyClonesState) _clones: ICompanyClonesState,
  ) {
    this._cloneFactory = _cloneFactory;
    this._clones = _clones;
    this._sidejobs = new SidejobsState();
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

  async startNewState(): Promise<void> {
    await this._clones.startNewState();
    await this._sidejobs.startNewState();
  }

  async deserialize(serializedState: ICompanySerializedState): Promise<void> {
    await this._clones.deserialize(serializedState.clones);
    await this._sidejobs.deserialize(serializedState.sidejobs);
  }

  serialize(): ICompanySerializedState {
    return {
      clones: this._clones.serialize(),
      sidejobs: this._sidejobs.serialize(),
    };
  }
}
