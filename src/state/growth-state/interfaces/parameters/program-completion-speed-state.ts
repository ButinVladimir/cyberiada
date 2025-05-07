export interface IProgramCompletionSpeedState {
  multiplierByHardware: number;
  multiplierByProgram: number;
  totalMultiplier: number;
  requestMultipliersRecalculation(): void;
  recalculateMultipliers(): void;
}
