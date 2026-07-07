import { injectable } from 'inversify';
import { styleText } from 'node:util';
import { IClonesSerializedState, IMakeCloneParameters, typedCloneTemplates } from '@state/clones-state';
import { ISavefileClonesValidator } from '../interfaces';

@injectable()
export class SavefileClonesValidator implements ISavefileClonesValidator {
  private _currentState!: IClonesSerializedState;

  validate(state: IClonesSerializedState): void {
    console.log(`\t\tValidating clones serialized state`);

    this._currentState = state;

    this.validateOwnedClones();
  }

  private validateOwnedClones() {
    for (const clone of this._currentState.ownedClones.clones) {
      this.validateClone(clone);
    }

    this.validateOwnedCloneIdUniqueness();
  }

  private validateClone(cloneParameters: IMakeCloneParameters) {
    const cloneTemplate = cloneParameters.templateName;
    const cloneId = cloneParameters.id;

    if (!typedCloneTemplates[cloneParameters.templateName]) {
      console.log(
        `\t\t\tClone template ${styleText('cyanBright', cloneTemplate)} design for clone ${styleText('cyanBright', cloneId)} is ${styleText('redBright', 'missing')}`,
      );
    }
  }

  private validateOwnedCloneIdUniqueness() {
    const ids = new Set<string>();

    for (const clone of this._currentState.ownedClones.clones) {
      if (ids.has(clone.id)) {
        console.log(`\t\t\tClone id ${styleText('cyanBright', clone.id)} is ${styleText('redBright', 'not unique')}`);
      }

      ids.add(clone.id);
    }
  }
}
