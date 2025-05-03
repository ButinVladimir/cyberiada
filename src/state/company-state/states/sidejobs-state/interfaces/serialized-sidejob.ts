import { SidejobName } from '../types';

export interface ISerializedSidejob {
  id: string;
  sidejobName: SidejobName;
  districtIndex: number;
  assignedCloneId?: string;
}
