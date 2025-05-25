import { html } from 'lit';
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

  protected program;

  protected formatter: IFormatter;

  protected threads: number;

  protected currentThreads: number;

  constructor(parameters: IDescriptionParameters) {
    this.program = parameters.program;
    this.formatter = parameters.formatter;
    this.threads = parameters.threads;
    this.currentThreads = parameters.currentThreads;
  }

  public renderEffect = () => {
    const minTime = this.program.calculateCompletionMinTime(this.threads);
    const maxTime = this.program.calculateCompletionMaxTime(this.threads);
    const minAvgValue = (this.threads / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (this.threads / minTime) * MS_IN_SECOND;

    const valueDiff = this.threads - this.currentThreads;
    let minAvgValueDiff = minAvgValue;
    let maxAvgValueDiff = maxAvgValue;

    if (this.currentThreads) {
      const currentMinTime = this.program.calculateCompletionMinTime(this.currentThreads);
      const currentMaxTime = this.program.calculateCompletionMaxTime(this.currentThreads);
      const currentMinAvgValue = (this.currentThreads / currentMaxTime) * MS_IN_SECOND;
      const currentMaxAvgValue = (this.currentThreads / currentMinTime) * MS_IN_SECOND;

      minAvgValueDiff = minAvgValue - currentMinAvgValue;
      maxAvgValueDiff = maxAvgValue - currentMaxAvgValue;
    }

    const formattedValue = this.formatter.formatNumberFloat(this.threads);
    const formattedMinAvgValue = this.formatter.formatNumberFloat(minAvgValue);
    const formattedMaxAvgValue = this.formatter.formatNumberFloat(maxAvgValue);

    const diffClass = getHighlightDifferenceClass(valueDiff);
    const diffEl = html`<span class=${diffClass}
      >${this.formatter.formatNumberFloat(valueDiff, diffFormatterParameters)}</span
    >`;

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
          PROGRAM_DESCRIPTION_TEXTS.parameterCompletionDiffs(
            formattedValue,
            diffEl,
            formattedMinAvgValue,
            minAvgDiffEl,
            formattedMaxAvgValue,
            maxAvgDiffEl,
          ),
        )}
      </p>
    `;
  };

  public recalculateValues(): void {}
}
