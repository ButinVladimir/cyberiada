import { BaseController } from '@shared/base-controller';
import { ItemCategory } from '@shared/types';

export class OverviewUnlockedCategoryItemsController extends BaseController {
  listItems(itemCategory: ItemCategory) {
    return this.getAvailableCategoryItemsState(itemCategory).listAvailableItems();
  }

  getItemHighestAvailableQuality(itemCategory: ItemCategory, itemName: string) {
    return this.getAvailableCategoryItemsState(itemCategory).getItemHighestAvailableQuality(itemName);
  }

  private getAvailableCategoryItemsState(itemCategory: ItemCategory) {
    switch (itemCategory) {
      case 'programs':
        return this.globalState.availableItems.programs;
    }
  }
}
