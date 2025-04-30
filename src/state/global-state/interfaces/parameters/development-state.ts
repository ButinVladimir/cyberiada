import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { IncomeSource } from '@shared/types';
import { IDevelopmentSerializedState } from '../serialized-states/development-serialized-state';

export interface IDevelopmentState extends ISerializeable<IDevelopmentSerializedState>, IUIEventEmitter {
  points: number;
  level: number;
  increase(pointsDelta: number, incomeSource: IncomeSource): void;
  getIncome(incomeSource: IncomeSource): number;
  getLevelRequirements(level: number): number;
  recalculateLevel(): void;
}
