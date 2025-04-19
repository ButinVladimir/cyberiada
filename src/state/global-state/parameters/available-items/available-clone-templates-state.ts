import { injectable } from 'inversify';
import { BaseAvailableCategoryItemsState } from './base-available-category-items-state';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';

@injectable()
export class AvailableCloneTemplatesState extends BaseAvailableCategoryItemsState<CloneTemplateName> {
  protected recalculateNeutralItemsList(): void {
    this._neutralItems.clear();

    this._globalState.faction.neutralFactionValues.cloneTemplates.forEach((cloneTemplate) => {
      this._neutralItems.add(cloneTemplate);
    });
  }
}
