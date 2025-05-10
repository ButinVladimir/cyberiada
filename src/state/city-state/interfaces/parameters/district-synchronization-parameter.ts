export interface IDistrictSynchronizationParameter {
  value: number;
  recalculate(): void;
  removeAllEventListeners(): void;
}
