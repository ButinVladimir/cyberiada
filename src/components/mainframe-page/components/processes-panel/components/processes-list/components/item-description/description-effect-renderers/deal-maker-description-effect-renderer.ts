import { DealMakerProgram } from '@state/mainframe-state';
import { RewardParameter } from '@shared/index';
import { BaseMultiplierDescriptionEffectRenderer } from './base-multiplier-program-description-effect-renderer';

export class DealMakerDescriptionEffectRenderer extends BaseMultiplierDescriptionEffectRenderer {
  protected parameterName = RewardParameter.rewards;

  protected getProgramValue() {
    return (this.process.program as DealMakerProgram).calculateDelta(this.process.threads);
  }
}
