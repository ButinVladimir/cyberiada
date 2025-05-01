import { IUIEventEmitter } from '@shared/interfaces';

export interface IDistrictSynchronizationParameter extends IUIEventEmitter {
  value: number;
  recalculate(): void;
}
