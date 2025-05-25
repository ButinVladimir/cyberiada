import { html } from 'lit';
import { PeerReviewerProgram } from '@state/mainframe-state';
import { RewardParameter, IFormatter } from '@shared/index';
import { COMMON_TEXTS, PROGRAM_DESCRIPTION_TEXTS, REWARD_PARAMETER_NAMES } from '@texts/index';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class PeerReviewerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  public readonly values = {};
  public readonly diffs = {};

  private _program: PeerReviewerProgram;

  private _formatter: IFormatter;

  private _ram: number;

  private _cores: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as PeerReviewerProgram;
    this._formatter = parameters.formatter;
    this._ram = parameters.maxRam;
    this._cores = parameters.maxCores;
  }

  public renderEffect = () => {
    const formattedValue = this._formatter.formatNumberFloat(
      this._program.calculateExperienceShareMultiplier(this._cores, this._ram),
    );

    return html`<p>
      ${COMMON_TEXTS.parameterValue(
        REWARD_PARAMETER_NAMES[RewardParameter.sharedExperienceMultiplier](),
        PROGRAM_DESCRIPTION_TEXTS.upToValue(formattedValue),
      )}
    </p>`;
  };

  public recalculateValues(): void {}
}
