export interface ISynchronizationParameter {
  baseValue: number;
  totalValue: number;
  requestRecalculation(): void;
  recalculate(): void;
}
