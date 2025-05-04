import { SidejobName } from '@state/company-state';
import { BaseController } from '@shared/base-controller';

export class AssignCloneSidejobDialogButtonsController extends BaseController {
  getTotalConnectivity(districtIndex: number): number {
    return this.cityState.getDistrictState(districtIndex).parameters.connectivity.totalValue;
  }

  getRequiredConnectivity(sidejobName: SidejobName): number {
    return this.companyState.sidejobs.getConnectivityRequirement(sidejobName);
  }
}
