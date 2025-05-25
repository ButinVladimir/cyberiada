import { CloneTemplateName } from '../../clone-factory';

export interface IPurchaseCloneArgs {
  name: string;
  templateName: CloneTemplateName;
  tier: number;
  level: number;
}
