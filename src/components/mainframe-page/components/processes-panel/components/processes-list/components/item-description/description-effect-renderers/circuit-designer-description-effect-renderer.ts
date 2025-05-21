import { CircuitDesignerProgram } from '@state/mainframe-state';
import { RewardParameter } from '@shared/index';
import { BaseMultiplierDescriptionEffectRenderer } from './base-multiplier-program-description-effect-renderer';

export class CircuitDesignerDescriptionEffectRenderer extends BaseMultiplierDescriptionEffectRenderer {
  protected parameterName = RewardParameter.computationalBase;

  protected getProgramValue() {
    return (this.process.program as CircuitDesignerProgram).calculateDelta(this.process.threads);
  }
}
