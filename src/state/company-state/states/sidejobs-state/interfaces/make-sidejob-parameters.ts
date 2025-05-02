import { SidejobName } from '../types';

export interface IMakeSidejobParameters {
  id: string;
  templateName: SidejobName;
  district: number;
  assignedClone: string;
}
