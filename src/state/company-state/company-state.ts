import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import { ICompanySerializedState, ICompanyState } from './interfaces';
import type { ICloneFactory } from './states/clone-factory/interfaces/clone-factory';
import type { ICompanyClonesState } from './states/clones-state/interfaces/clones-state';

@injectable()
export class CompanyState implements ICompanyState {
  private _cloneFactory: ICloneFactory;
  private _clones: ICompanyClonesState;

  constructor(
    @inject(TYPES.CloneFactory) _cloneFactory: ICloneFactory,
    @inject(TYPES.CompanyClonesState) _clones: ICompanyClonesState,
  ) {
    this._cloneFactory = _cloneFactory;
    this._clones = _clones;
  }

  get cloneFactory() {
    return this._cloneFactory;
  }

  get clones() {
    return this._clones;
  }

  async startNewState(): Promise<void> {
    await this._clones.startNewState();
  }

  async deserialize(serializedState: ICompanySerializedState): Promise<void> {
    await this._clones.deserialize(serializedState.clones);
  }

  serialize(): ICompanySerializedState {
    return {
      clones: this._clones.serialize(),
    };
  }
}
