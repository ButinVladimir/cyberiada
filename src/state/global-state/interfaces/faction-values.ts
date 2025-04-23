import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';

export interface IFactionValues {
  programs: ProgramName[];
  cloneTemplates: CloneTemplateName[];
}
