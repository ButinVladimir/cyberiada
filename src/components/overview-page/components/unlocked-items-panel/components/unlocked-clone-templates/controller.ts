import { BaseController } from '@shared/base-controller';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';

export class OverviewUnlockedCloneTemplatesController extends BaseController {
  listItems() {
    return this.globalState.availableItems.cloneTemplates.listAvailableItems();
  }

  getItemHighestAvailableTier(itemName: CloneTemplateName) {
    return this.globalState.availableItems.cloneTemplates.getItemHighestAvailableTier(itemName);
  }
}
