import { injectable } from 'inversify';
import { styleText } from 'node:util';
import { IUnlockSerializedState } from '@state/unlock-state';
import { typedCloneTemplates } from '@state/clones-state';
import { typedContracts, typedSidejobs } from '@state/activity-state';
import { ISavefileUnlockValidator } from '../interfaces';

@injectable()
export class SavefileUnlockValidator implements ISavefileUnlockValidator {
  private _currentState!: IUnlockSerializedState;

  validate(state: IUnlockSerializedState): void {
    console.log(`\t\tValidating unlock serialized state`);

    this._currentState = state;

    this.validateItems();
    this.validateActivities();
  }

  private validateItems() {
    this.validateCloneTemplates();
  }

  private validateCloneTemplates() {
    for (const cloneTemplate of Object.keys(this._currentState.items.cloneTemplates.designs)) {
      if (!typedCloneTemplates[cloneTemplate]) {
        console.log(
          `\t\t\tClone template ${styleText('cyanBright', cloneTemplate)} design is ${styleText('redBright', 'missing')}`,
        );
      }
    }
  }

  private validateActivities() {
    this.validateSidejobs();
    this.validateContracts();
  }

  private validateSidejobs() {
    for (const sidejob of this._currentState.activities.sidejobs.unlockedActivities) {
      if (!typedSidejobs[sidejob]) {
        console.log(
          `\t\t\tSidejob ${styleText('cyanBright', sidejob)} activity is ${styleText('redBright', 'missing')}`,
        );
      }
    }
  }

  private validateContracts() {
    for (const contract of this._currentState.activities.contracts.unlockedActivities) {
      if (!typedContracts[contract]) {
        console.log(
          `\t\t\tContract ${styleText('cyanBright', contract)} activity is ${styleText('redBright', 'missing')}`,
        );
      }
    }
  }
}
