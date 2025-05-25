import { injectable } from 'inversify';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';
import { Feature } from '@shared/types';
import { BaseAvailableCategoryItemsState } from './base-available-category-items-state';

@injectable()
export class AvailableCloneTemplatesState extends BaseAvailableCategoryItemsState<CloneTemplateName> {
  private _requiredFeatures = [Feature.companyManagement];

  protected recalculateNeutralItemsList(): void {
    this._neutralItems.clear();

    this._globalState.faction.neutralFactionValues.cloneTemplates.forEach((cloneTemplate) => {
      this._neutralItems.add(cloneTemplate);
    });
  }

  protected getItemRequiredFeatures(): Feature[] {
    return this._requiredFeatures;
  }
}
