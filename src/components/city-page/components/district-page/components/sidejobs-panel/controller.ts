import { SidejobName } from '@state/company-state';
import { BaseController } from '@shared/base-controller';

export class CityDistrictSidejobsPanelController extends BaseController {
  getAvailableSidejobs(): SidejobName[] {
    return this.globalState.availableActivities.sidejobs.listAvailableActivities();
  }
}
