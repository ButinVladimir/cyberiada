import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import { ICompanySerializedState, ICompanyState } from './interfaces';
import type { ICloneFactory } from './states/clone-factory/interfaces/clone-factory';

@injectable()
export class CompanyState implements ICompanyState {
  private _cloneFactory: ICloneFactory;

  constructor(@inject(TYPES.CloneFactory) _cloneFactory: ICloneFactory) {
    this._cloneFactory = _cloneFactory;
  }

  get cloneFactory() {
    return this._cloneFactory;
  }

  async startNewState(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deserialize(serializedState: ICompanySerializedState): Promise<void> {
    throw new Error('Method not implemented.');
  }

  serialize(): ICompanySerializedState {
    throw new Error('Method not implemented.');
  }
}
