import { injectable } from 'inversify';
import { styleText } from 'node:util';
import { IAutomationSerializedState, ISerializedContractAssignment } from '@state/automation-state';
import { typedContracts } from '@state/activity-state';
import { ISerializedState } from '@state/app-state';
import { ISavefileAutomationValidator } from '../interfaces';

@injectable()
export class SavefileAutomationValidator implements ISavefileAutomationValidator {
  private _currentState!: IAutomationSerializedState;
  private _fullState!: ISerializedState;

  validate(state: IAutomationSerializedState, fullState: ISerializedState): void {
    console.log(`\t\tValidating automation serialized state`);

    this._currentState = state;
    this._fullState = fullState;

    this.validateContractAssigments();
  }

  private validateContractAssigments() {
    for (const contractAssigment of this._currentState.contracts.contractAssignments) {
      this.validateContractAssignment(contractAssigment);
    }

    this.validateContractAssignmentIdsUniqueness();
    this.validateContractAssignmentKeysUniqueness();
  }

  private validateContractAssignment(contractAssignment: ISerializedContractAssignment) {
    const contractName = contractAssignment.contract.contractName;
    const contractDistrictIndex = contractAssignment.contract.districtIndex;
    const contractId = contractAssignment.id;

    if (!typedContracts[contractName]) {
      console.log(
        `\t\t\tContract ${styleText('cyanBright', contractName)} for assignment ${styleText('cyanBright', contractId)} is ${styleText('redBright', 'missing')}`,
      );
    }

    if (this._fullState.city.districts[contractDistrictIndex] === undefined) {
      console.log(
        `\t\t\tDistrict ${styleText('cyanBright', contractDistrictIndex.toString())} for assignment ${styleText('cyanBright', contractId)} is ${styleText('redBright', 'missing')}`,
      );
    }

    this.validateContractAssignmentClones(contractAssignment);
  }

  private validateContractAssignmentClones(contractAssignment: ISerializedContractAssignment) {
    const contractId = contractAssignment.id;

    for (const cloneId of contractAssignment.contract.assignedCloneIds) {
      if (!this._fullState.clones.ownedClones.clones.find((clone) => clone.id === cloneId)) {
        console.log(
          `\t\t\tClone ${styleText('cyanBright', cloneId)} for assignment ${styleText('cyanBright', contractId)} is ${styleText('redBright', 'missing')}`,
        );
      }
    }
  }

  private validateContractAssignmentIdsUniqueness() {
    const ids = new Set<string>();

    for (const contractAssignment of this._currentState.contracts.contractAssignments) {
      if (ids.has(contractAssignment.id)) {
        console.log(
          `\t\t\tContract assignment id ${styleText('cyanBright', contractAssignment.id)} is ${styleText('redBright', 'not unique')}`,
        );
      }

      ids.add(contractAssignment.id);
    }
  }

  private validateContractAssignmentKeysUniqueness() {
    const keys = new Set<string>();

    for (const contractAssignment of this._currentState.contracts.contractAssignments) {
      const contractId = contractAssignment.id;
      const key = `${contractAssignment.contract.contractName}-${contractAssignment.contract.districtIndex}`;

      if (keys.has(key)) {
        console.log(
          `\t\t\tContract assignment key ${styleText('cyanBright', key)} for assignment ${styleText('cyanBright', contractId)} is ${styleText('redBright', 'not unique')}`,
        );
      }

      keys.add(key);
    }
  }
}
