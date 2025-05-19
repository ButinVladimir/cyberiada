import { html } from 'lit';
import { InformationCollectorProgram } from '@state/mainframe-state';
import {
  RewardParameter,
  IFormatter,
  diffFormatterParameters,
  MS_IN_SECOND,
  getHighlightDifferenceClass,
} from '@shared/index';
import { COMMON_TEXTS, PROGRAM_DESCRIPTION_TEXTS, REWARD_PARAMETER_NAMES } from '@texts/index';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

const VALUES = {
  value: 'value',
  minAvgValue: 'min-avg-value',
  maxAvgValue: 'max-avg-value',
};

export class InformationCollectorDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  public readonly values = {
    [VALUES.value]: '',
    [VALUES.minAvgValue]: '',
    [VALUES.maxAvgValue]: '',
  };

  public readonly diffs = {
    [VALUES.value]: { value: '', className: '' },
    [VALUES.minAvgValue]: { value: '', className: '' },
    [VALUES.maxAvgValue]: { value: '', className: '' },
  };

  private _program: InformationCollectorProgram;

  private _formatter: IFormatter;

  private _threads: number;

  private _currentThreads: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as InformationCollectorProgram;
    this._formatter = parameters.formatter;
    this._threads = parameters.threads;
    this._currentThreads = parameters.currentThreads;
  }

  public renderEffect = () => {
    return html` <p>
      ${COMMON_TEXTS.parameterValue(
        REWARD_PARAMETER_NAMES[RewardParameter.connectivity](),
        PROGRAM_DESCRIPTION_TEXTS.parameterCompletionDiffs(
          html`<span data-value=${VALUES.value}></span>`,
          html`<span data-diff=${VALUES.value}></span>`,
          html`<span data-value=${VALUES.minAvgValue}></span>`,
          html`<span data-diff=${VALUES.minAvgValue}></span>`,
          html`<span data-value=${VALUES.maxAvgValue}></span>`,
          html`<span data-diff=${VALUES.maxAvgValue}></span>`,
        ),
      )}
    </p>`;
  };

  public recalculateValues() {
    const value = this._program.calculateDelta(this._threads);
    const minTime = this._program.calculateCompletionMinTime(this._threads);
    const maxTime = this._program.calculateCompletionMaxTime(this._threads);
    const minAvgValue = (value / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (value / minTime) * MS_IN_SECOND;

    let valueDiff = value;
    let minAvgValueDiff = minAvgValue;
    let maxAvgValueDiff = maxAvgValue;

    if (this._currentThreads) {
      const currentValue = this._program.calculateDelta(this._currentThreads);
      const currentMinTime = this._program.calculateCompletionMinTime(this._currentThreads);
      const currentMaxTime = this._program.calculateCompletionMaxTime(this._currentThreads);
      const currentMinAvgValue = (currentValue / currentMaxTime) * MS_IN_SECOND;
      const currentMaxAvgValue = (currentValue / currentMinTime) * MS_IN_SECOND;

      valueDiff = value - currentValue;
      minAvgValueDiff = minAvgValue - currentMinAvgValue;
      maxAvgValueDiff = maxAvgValue - currentMaxAvgValue;
    }

    this.values[VALUES.value] = this._formatter.formatNumberFloat(value);
    this.diffs[VALUES.value].value = this._formatter.formatNumberFloat(valueDiff, diffFormatterParameters);
    this.diffs[VALUES.value].className = getHighlightDifferenceClass(valueDiff);

    this.values[VALUES.minAvgValue] = this._formatter.formatNumberFloat(minAvgValue);
    this.diffs[VALUES.minAvgValue].value = this._formatter.formatNumberFloat(minAvgValueDiff, diffFormatterParameters);
    this.diffs[VALUES.minAvgValue].className = getHighlightDifferenceClass(minAvgValueDiff);

    this.values[VALUES.maxAvgValue] = this._formatter.formatNumberFloat(maxAvgValue);
    this.diffs[VALUES.maxAvgValue].value = this._formatter.formatNumberFloat(maxAvgValueDiff, diffFormatterParameters);
    this.diffs[VALUES.maxAvgValue].className = getHighlightDifferenceClass(maxAvgValueDiff);
  }
}
