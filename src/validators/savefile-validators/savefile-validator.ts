import { inject, injectable } from 'inversify';
import { styleText } from 'node:util';
import { ISerializedState } from '@state/app-state';
import { CURRENT_VERSION } from '@shared/constants';
import { VALIDATOR_TYPES } from '../types';
import {
  type ISavefileValidator,
  type ISavefileScenarioValidator,
  type ISavefileFactionValidator,
  type ISavefileUnlockValidator,
  type ISavefileClonesValidator,
} from '../interfaces';

@injectable()
export class SavefileValidator implements ISavefileValidator {
  @inject(VALIDATOR_TYPES.SavefileScenarioValidator)
  private _savefileScenarioValidator!: ISavefileScenarioValidator;

  @inject(VALIDATOR_TYPES.SavefileFactionValidator)
  private _savefileFactionValidator!: ISavefileFactionValidator;

  @inject(VALIDATOR_TYPES.SavefileUnlockValidator)
  private _savefileUnlockValidator!: ISavefileUnlockValidator;

  @inject(VALIDATOR_TYPES.SavefileClonesValidator)
  private _savefileClonesValidator!: ISavefileClonesValidator;

  private _currentState!: ISerializedState;

  validate(state: ISerializedState): void {
    console.log(`\tValidating serialized state`);

    this._currentState = state;

    this.validateGameVersion();

    this._savefileScenarioValidator.validate(state.scenario);
    this._savefileFactionValidator.validate(state.faction);
    this._savefileUnlockValidator.validate(state.unlock);
    this._savefileClonesValidator.validate(state.clones);
  }

  private validateGameVersion() {
    if (this._currentState.gameVersion !== CURRENT_VERSION) {
      console.log(
        `\t\tSavefile ${styleText('cyanBright', 'game version')} is ${styleText('redBright', 'outdated')}, current one is ${CURRENT_VERSION}`,
      );
    }
  }
}
