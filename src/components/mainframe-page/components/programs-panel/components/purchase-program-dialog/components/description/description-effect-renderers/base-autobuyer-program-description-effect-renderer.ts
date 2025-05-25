import { html } from 'lit';
import { IProgram } from '@state/mainframe-state';
import {
  RewardParameter,
  IFormatter,
  diffFormatterParameters,
  MS_IN_SECOND,
  getHighlightDifferenceClass,
} from '@shared/index';
import { COMMON_TEXTS, PROGRAM_DESCRIPTION_TEXTS, REWARD_PARAMETER_NAMES } from '@texts/index';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export abstract class BaseAutobuyerProgramDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  public readonly values = {};
  public readonly diffs = {};

  protected program: IProgram;

  protected ownedProgram?: IProgram;

  protected formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this.program = parameters.program;
    this.ownedProgram = parameters.ownedProgram;
    this.formatter = parameters.formatter;
  }

  public renderEffect = () => {
    const minTime = this.program.calculateCompletionMinTime(1);
    const maxTime = this.program.calculateCompletionMaxTime(1);
    const minAvgValue = (1 / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (1 / minTime) * MS_IN_SECOND;

    let minAvgValueDiff = minAvgValue;
    let maxAvgValueDiff = maxAvgValue;

    if (this.ownedProgram) {
      const ownedMinTime = this.ownedProgram.calculateCompletionMinTime(1);
      const ownedMaxTime = this.ownedProgram.calculateCompletionMaxTime(1);
      const ownedMinAvgValue = (1 / ownedMaxTime) * MS_IN_SECOND;
      const ownedMaxAvgValue = (1 / ownedMinTime) * MS_IN_SECOND;

      minAvgValueDiff = minAvgValue - ownedMinAvgValue;
      maxAvgValueDiff = maxAvgValue - ownedMaxAvgValue;
    }

    const formattedMinAvgValue = this.formatter.formatNumberFloat(minAvgValue);
    const formattedMaxAvgValue = this.formatter.formatNumberFloat(maxAvgValue);

    const minAvgDiffClass = getHighlightDifferenceClass(minAvgValueDiff);
    const minAvgDiffEl = html`<span class=${minAvgDiffClass}
      >${this.formatter.formatNumberFloat(minAvgValueDiff, diffFormatterParameters)}</span
    >`;

    const maxAvgDiffClass = getHighlightDifferenceClass(maxAvgValueDiff);
    const maxAvgDiffEl = html`<span class=${maxAvgDiffClass}
      >${this.formatter.formatNumberFloat(maxAvgValueDiff, diffFormatterParameters)}</span
    >`;

    return html`
      <p>
        ${COMMON_TEXTS.parameterValue(
          REWARD_PARAMETER_NAMES[RewardParameter.actions](),
          PROGRAM_DESCRIPTION_TEXTS.actionCompletionDiffs(
            '1',
            formattedMinAvgValue,
            minAvgDiffEl,
            formattedMaxAvgValue,
            maxAvgDiffEl,
          ),
        )}
      </p>
    `;
  };

  public recalculateValues() {}
}
