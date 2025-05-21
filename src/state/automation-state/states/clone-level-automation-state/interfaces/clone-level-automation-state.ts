import { ISerializeable } from '@shared/interfaces';
import { ICloneLevelAutomationSerializedState } from './clone-level-automation-serialized-state';

export interface ICloneLevelAutomationState extends ISerializeable<ICloneLevelAutomationSerializedState> {
  moneyShare: number;
}
