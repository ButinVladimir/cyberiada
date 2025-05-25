import { ProgramName } from '@state/mainframe-state';
import { CloneTemplateName } from '@state/company-state';
import { SidejobName } from '@state/company-state';

export interface IFactionValues {
  programs: ProgramName[];
  cloneTemplates: CloneTemplateName[];
  sidejobs: SidejobName[];
}
