import { ISerializeable } from '@shared/interfaces';
import { IMainframeProgramsAutomationSerializedState } from './mainframe-programs-automation-serialized-state';

export interface IMainframeProgramsAutomationState extends ISerializeable<IMainframeProgramsAutomationSerializedState> {
  moneyShare: number;
}
