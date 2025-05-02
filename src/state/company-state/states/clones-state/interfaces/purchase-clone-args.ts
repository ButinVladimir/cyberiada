import { CloneTemplateName } from '../../clone-factory';

export interface IPurchaseCloneArgs {
  name: string;
  templateName: CloneTemplateName;
  quality: number;
  level: number;
}
