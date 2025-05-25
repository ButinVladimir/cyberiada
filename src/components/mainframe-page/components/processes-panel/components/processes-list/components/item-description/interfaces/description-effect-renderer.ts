export interface IDescriptionEffectRenderer {
  values: Record<string, any>;
  renderEffect(): unknown;
  recalculateValues(): void;
}
