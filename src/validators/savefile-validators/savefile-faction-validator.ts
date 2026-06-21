import { injectable } from 'inversify';
import { styleText } from 'node:util';
import { IFactionSerializedState, typedFactions } from '@state/faction-state';
import { ISavefileFactionValidator } from '../interfaces';
import { NEUTRAL_FACTION } from '@/shared';

@injectable()
export class SavefileFactionValidator implements ISavefileFactionValidator {
  private _currentState!: IFactionSerializedState;

  validate(state: IFactionSerializedState): void {
    console.log(`\t\tValidating faction serialized state`);

    this._currentState = state;

    this.validateCurrentFaction();
    this.validateFactionsList();
  }

  validateCurrentFaction() {
    if (this._currentState.currentFaction !== NEUTRAL_FACTION && !this._currentState.joiningFactionAvailable) {
      console.log(
        `\t\t\tFaction ${styleText('cyanBright', this._currentState.currentFaction)} has been joined when it's ${styleText('redBright', 'not allowed')}`,
      );
    }

    if (
      this._currentState.currentFaction !== NEUTRAL_FACTION &&
      !this._currentState.factionsList.includes(this._currentState.currentFaction)
    ) {
      console.log(
        `\t\t\tFaction ${styleText('cyanBright', this._currentState.currentFaction)} is ${styleText('redBright', 'not available')} to join`,
      );
    }
  }

  validateFactionsList() {
    for (const factionName of this._currentState.factionsList) {
      if (!typedFactions[factionName]) {
        console.log(`\t\t\tFaction ${styleText('cyanBright', factionName)} is ${styleText('redBright', 'missing')}`);
      }
    }
  }
}
