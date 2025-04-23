import { Feature } from '@shared/types';
import { BaseController } from '@shared/base-controller';

export class CompanyPageController extends BaseController {
  isCompanyManagementUnlocked(): boolean {
    return this.globalState.unlockedFeatures.isFeatureUnlocked(Feature.companyManagement);
  }
}
