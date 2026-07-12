import { injectable } from 'inversify';
import { styleText } from 'node:util';
import {
  IActivitySerializedState,
  ISerializedContractActivity,
  ISerializedPrimaryActivity,
  ISerializedSidejobActivity,
  typedSidejobs,
} from '@state/activity-state';
import { ISerializedState } from '@state/app-state';
import { ISavefileActivityValidator } from '../interfaces';

@injectable()
export class SavefileActivityValidator implements ISavefileActivityValidator {
  private _currentState!: IActivitySerializedState;
  private _fullState!: ISerializedState;

  validate(state: IActivitySerializedState, fullState: ISerializedState): void {
    console.log(`\t\tValidating activity serialized state`);

    this._currentState = state;
    this._fullState = fullState;

    this.validateSidejobActivities();
    this.validatePrimaryActivityQueue();
  }

  private validateSidejobActivities() {
    for (const sidejobActivity of this._currentState.sidejobs.activities) {
      this.validateSidejobActivity(sidejobActivity);
    }

    this.validateSidejobActivityIdsUniqueness();
    this.validateSidejobActivityKeysUniqueness();
  }

  private validateSidejobActivity(sidejobActivity: ISerializedSidejobActivity) {
    const sidejobName = sidejobActivity.sidejob.sidejobName;
    const sidejobDistrictIndex = sidejobActivity.sidejob.districtIndex;
    const sidejobId = sidejobActivity.id;
    const sidejobCloneId = sidejobActivity.sidejob.assignedCloneId;

    if (!typedSidejobs[sidejobName]) {
      console.log(
        `\t\t\tSidejob ${styleText('cyanBright', sidejobName)} for sidejob activity ${styleText('cyanBright', sidejobId)} is ${styleText('redBright', 'missing')}`,
      );
    }

    if (this._fullState.city.districts[sidejobDistrictIndex] === undefined) {
      console.log(
        `\t\t\tDistrict ${styleText('cyanBright', sidejobDistrictIndex.toString())} for sidejob activity ${styleText('cyanBright', sidejobId)} is ${styleText('redBright', 'missing')}`,
      );
    }

    if (!this._fullState.clones.ownedClones.clones.find((clone) => clone.id === sidejobCloneId)) {
      console.log(
        `\t\t\tClone ${styleText('cyanBright', sidejobCloneId)} for sidejob activity ${styleText('cyanBright', sidejobId)} is ${styleText('redBright', 'missing')}`,
      );
    }
  }

  private validateSidejobActivityIdsUniqueness() {
    const ids = new Set<string>();

    for (const sidejobActivity of this._currentState.sidejobs.activities) {
      if (ids.has(sidejobActivity.id)) {
        console.log(
          `\t\t\tSidejob activity id ${styleText('cyanBright', sidejobActivity.id)} is ${styleText('redBright', 'not unique')}`,
        );
      }

      ids.add(sidejobActivity.id);
    }
  }

  private validateSidejobActivityKeysUniqueness() {
    const keys = new Set<string>();

    for (const sidejobActivity of this._currentState.sidejobs.activities) {
      const sidejobId = sidejobActivity.id;
      const key = sidejobActivity.sidejob.assignedCloneId;

      if (keys.has(key)) {
        console.log(
          `\t\t\tSidejob activity key ${styleText('cyanBright', key)} for assignment ${styleText('cyanBright', sidejobId)} is ${styleText('redBright', 'not unique')}`,
        );
      }

      keys.add(key);
    }
  }

  private validatePrimaryActivityQueue() {
    for (const primaryActivity of this._currentState.primaryActivityQueue.activities) {
      this.validatePrimaryActivity(primaryActivity);
    }

    this.validatePrimaryActivityIdsUniqueness();
    this.validatePrimaryActivityKeysUniqueness();
  }

  private validatePrimaryActivity(primaryActivity: ISerializedPrimaryActivity) {
    if (primaryActivity.type === 'contract') {
      this.validateContractActivity(primaryActivity as ISerializedContractActivity);
    }
  }

  private validateContractActivity(primaryActivity: ISerializedContractActivity) {
    const activityId = primaryActivity.activityId;
    const contractAssignmentId = primaryActivity.contractAssignmentId;

    if (
      this._fullState.automation.contracts.contractAssignments.find(
        (contractAssignment) => contractAssignment.id === contractAssignmentId,
      ) === undefined
    ) {
      console.log(
        `\t\t\tContract assignment id ${styleText('cyanBright', contractAssignmentId)} for activity ${styleText('cyanBright', activityId)} is ${styleText('redBright', 'missing')}`,
      );
    }
  }

  private validatePrimaryActivityIdsUniqueness() {
    const ids = new Set<string>();

    for (const primaryActivity of this._currentState.primaryActivityQueue.activities) {
      if (ids.has(primaryActivity.activityId)) {
        console.log(
          `\t\t\tPrimary activity id ${styleText('cyanBright', primaryActivity.activityId)} is ${styleText('redBright', 'not unique')}`,
        );
      }

      ids.add(primaryActivity.activityId);
    }
  }

  private validatePrimaryActivityKeysUniqueness() {
    const keys = new Set<string>();

    for (const primaryActivity of this._currentState.primaryActivityQueue.activities) {
      const activityId = primaryActivity.activityId;
      const key = this.getPrimaryActivityKey(primaryActivity);

      if (keys.has(key)) {
        console.log(
          `\t\t\tPrimary activity key ${styleText('cyanBright', key)} for activity ${styleText('cyanBright', activityId)} is ${styleText('redBright', 'not unique')}`,
        );
      }

      keys.add(key);
    }
  }

  private getPrimaryActivityKey(primaryActivity: ISerializedPrimaryActivity): string {
    if (primaryActivity.type === 'contract') {
      return (primaryActivity as ISerializedContractActivity).contractAssignmentId;
    }

    throw new Error(
      `Unrecognized primary activity type ${primaryActivity.type} for activity ${primaryActivity.activityId}`,
    );
  }
}
