import { BaseController } from '@shared/base-controller';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';

export class OverviewUnlockedCloneTemplatesController extends BaseController {
  listItems() {
    return this.globalState.availableItems.cloneTemplates.listAvailableItems();
  }

  getItemHighestAvailableQuality(itemName: CloneTemplateName) {
    return this.globalState.availableItems.cloneTemplates.getItemHighestAvailableQuality(itemName);
  }
}
