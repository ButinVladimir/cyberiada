import { IAssignSidejobArguments, IClone, ISidejob, SidejobName } from '@state/company-state';
import { BaseController } from '@shared/base-controller';
import { IDistrictState } from '@/state/city-state';

export class AssignCloneSidejobDialogController extends BaseController {
  private _sidejob?: ISidejob;

  hostDisconnected() {
    super.hostDisconnected();

    this.deleteSidejob();
  }

  listClones(): IClone[] {
    return this.companyState.clones.listClones();
  }

  listAvailableSidejobs(): SidejobName[] {
    return this.globalState.availableActivities.sidejobs.listAvailableActivities();
  }

  listAvailableDistricts(): IDistrictState[] {
    return this.cityState.listAvailableDistricts();
  }

  getTotalConnectivity(districtIndex: number): number {
    return this.cityState.getDistrictState(districtIndex).parameters.connectivity.totalValue;
  }

  getRequiredConnectivity(sidejobName: SidejobName): number {
    return this.companyState.sidejobs.getConnectivityRequirement(sidejobName);
  }

  getSidejob(args: IAssignSidejobArguments): ISidejob {
    if (
      this._sidejob?.assignedClone?.id !== args.assignedCloneId ||
      this._sidejob?.sidejobName !== args.sidejobName ||
      this._sidejob?.district.index !== args.districtIndex
    ) {
      this.deleteSidejob();

      this._sidejob = this.companyState.sidejobs.makeSidejob({
        id: 'temporary',
        ...args,
      });
    }

    return this._sidejob;
  }

  getExistingSidejobByClone(cloneId?: string): ISidejob | undefined {
    if (!cloneId) {
      return undefined;
    }

    return this.companyState.sidejobs.getSidejobByCloneId(cloneId);
  }

  assignClone(args: IAssignSidejobArguments) {
    this.companyState.sidejobs.assignSidejob(args);
  }

  private deleteSidejob() {
    if (this._sidejob) {
      this._sidejob.removeAllEventListeners();
    }
  }
}
