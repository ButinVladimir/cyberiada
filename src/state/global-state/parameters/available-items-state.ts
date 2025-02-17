import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import { IAvailableItemsSerializedState } from '../interfaces/serialized-states/available-items-serialized-state';
import type { IAvailableProgramsState } from '../interfaces/parameters/available-items';
import { IAvailableItemsState } from '../interfaces/parameters/available-items-state';

@injectable()
export class AvailableItemsState implements IAvailableItemsState {
  private _availableProgramsState: IAvailableProgramsState;

  constructor(@inject(TYPES.AvailableProgramsState) _availableProgramsState: IAvailableProgramsState) {
    this._availableProgramsState = _availableProgramsState;
  }

  get programs(): IAvailableProgramsState {
    return this._availableProgramsState;
  }

  async startNewState(): Promise<void> {
    await this._availableProgramsState.startNewState();
  }

  async deserialize(serializedState: IAvailableItemsSerializedState): Promise<void> {
    await this._availableProgramsState.deserialize(serializedState.programs);
  }

  serialize(): IAvailableItemsSerializedState {
    return {
      programs: this._availableProgramsState.serialize(),
    };
  }
}
