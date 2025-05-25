export interface IProcessCompletionSpeedParameter {
  multiplierByHardware: number;
  multiplierByProgram: number;
  totalMultiplier: number;
  requestMultipliersRecalculation(): void;
  recalculateMultipliers(): void;
}
