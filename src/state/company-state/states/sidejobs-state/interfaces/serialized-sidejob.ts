import { SidejobName } from '../types';

export interface ISerializedSidejob {
  id: string;
  templateName: SidejobName;
  district: number;
  assignedClone: string;
}
