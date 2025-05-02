import { IDistrictState } from '@state/city-state';
import { IClone } from '../../clone-factory';
import { SidejobName } from '../types';

export interface ISidejobArguments {
  id: string;
  templateName: SidejobName;
  district: IDistrictState;
  assignedClone: IClone;
}
