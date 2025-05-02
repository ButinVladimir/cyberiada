import sidejobs from '@configs/sidejobs.json';
import { Feature } from '@shared/types';
import { ISidejobTemplate, SidejobName } from '@state/company-state';
import { BaseAvailableActivities } from './base-available-activities';

export class AvailableSidejobs extends BaseAvailableActivities<SidejobName> {
  protected recalculateNeutralActivitiesList(): void {
    this._neutralActivities.clear();

    this._globalState.faction.neutralFactionValues.sidejobs.forEach((sidejobName) => {
      this._neutralActivities.add(sidejobName);
    });
  }

  protected getActivityRequiredFeatures(sidejobName: SidejobName): Feature[] {
    const template = sidejobs[sidejobName] as ISidejobTemplate;

    return [...(template.requirements.requiredFeatures as Feature[]), Feature.companyManagement];
  }
}
