import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';
import { IAvailableCategoryItemsSerializedState } from './available-category-items-serialized-state';

export interface IAvailableItemsSerializedState {
  programs: IAvailableCategoryItemsSerializedState<ProgramName>;
  cloneTemplates: IAvailableCategoryItemsSerializedState<CloneTemplateName>;
}
