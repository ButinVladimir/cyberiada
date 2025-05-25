import { SidejobName } from '../types';

export interface IAssignSidejobArguments {
  sidejobName: SidejobName;
  districtIndex: number;
  assignedCloneId?: string;
}
