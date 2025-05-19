import { html } from 'lit';
import { MainframeProgramsAutobuyerProgram } from '@state/mainframe-state';
import {
  IFormatter,
  diffFormatterParameters,
  MS_IN_SECOND,
  getHighlightDifferenceClass,
  RewardParameter,
} from '@shared/index';
import { COMMON_TEXTS, PROGRAM_DESCRIPTION_TEXTS, REWARD_PARAMETER_NAMES } from '@texts/index';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class MainframeProgramsAutobuyerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  public readonly values = {};
  public readonly diffs = {};

  private _program: MainframeProgramsAutobuyerProgram;

  private _formatter: IFormatter;

  private _threads: number;

  private _currentThreads: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as MainframeProgramsAutobuyerProgram;
    this._formatter = parameters.formatter;
    this._threads = parameters.threads;
    this._currentThreads = parameters.currentThreads;
  }

  public renderEffect = () => {
    const minTime = this._program.calculateCompletionMinTime(this._threads);
    const maxTime = this._program.calculateCompletionMaxTime(this._threads);
    const minAvgValue = (this._threads / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (this._threads / minTime) * MS_IN_SECOND;

    const valueDiff = this._threads - this._currentThreads;
    let minAvgValueDiff = minAvgValue;
    let maxAvgValueDiff = maxAvgValue;

    if (this._currentThreads) {
      const currentMinTime = this._program.calculateCompletionMinTime(this._currentThreads);
      const currentMaxTime = this._program.calculateCompletionMaxTime(this._currentThreads);
      const currentMinAvgValue = (this._currentThreads / currentMaxTime) * MS_IN_SECOND;
      const currentMaxAvgValue = (this._currentThreads / currentMinTime) * MS_IN_SECOND;

      minAvgValueDiff = minAvgValue - currentMinAvgValue;
      maxAvgValueDiff = maxAvgValue - currentMaxAvgValue;
    }

    const formattedValue = this._formatter.formatNumberFloat(this._threads);
    const formattedMinAvgValue = this._formatter.formatNumberFloat(minAvgValue);
    const formattedMaxAvgValue = this._formatter.formatNumberFloat(maxAvgValue);

    const diffClass = getHighlightDifferenceClass(valueDiff);
    const diffEl = html`<span class=${diffClass}
      >${this._formatter.formatNumberFloat(valueDiff, diffFormatterParameters)}</span
    >`;

    const minAvgDiffClass = getHighlightDifferenceClass(minAvgValueDiff);
    const minAvgDiffEl = html`<span class=${minAvgDiffClass}
      >${this._formatter.formatNumberFloat(minAvgValueDiff, diffFormatterParameters)}</span
    >`;

    const maxAvgDiffClass = getHighlightDifferenceClass(maxAvgValueDiff);
    const maxAvgDiffEl = html`<span class=${maxAvgDiffClass}
      >${this._formatter.formatNumberFloat(maxAvgValueDiff, diffFormatterParameters)}</span
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
