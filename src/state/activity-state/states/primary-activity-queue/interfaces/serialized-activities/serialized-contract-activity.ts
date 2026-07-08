import { ISerializedPrimaryActivity } from '../serialized-primary-activity';

export interface ISerializedContractActivity extends ISerializedPrimaryActivity {
  type: 'contract';
  contractAssignmentId: string;
  passedTime: number;
}
