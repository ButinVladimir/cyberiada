import { html } from 'lit';
import { DealMakerProgram } from '@state/mainframe-state';
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

export class DealMakerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
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

  private _program: DealMakerProgram;

  private _ownedProgram?: DealMakerProgram;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as DealMakerProgram;
    this._ownedProgram = parameters.ownedProgram as DealMakerProgram;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    return html` <p>
      ${COMMON_TEXTS.parameterValue(
        REWARD_PARAMETER_NAMES[RewardParameter.rewards](),
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
    const value = this._program.calculateDelta(1);
    const minTime = this._program.calculateCompletionMinTime(1);
    const maxTime = this._program.calculateCompletionMaxTime(1);
    const minAvgValue = (value / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (value / minTime) * MS_IN_SECOND;

    let valueDiff = value;
    let minAvgValueDiff = minAvgValue;
    let maxAvgValueDiff = maxAvgValue;

    if (this._ownedProgram) {
      const ownedValue = this._ownedProgram.calculateDelta(1);
      const ownedMinTime = this._ownedProgram.calculateCompletionMinTime(1);
      const ownedMaxTime = this._ownedProgram.calculateCompletionMaxTime(1);
      const ownedMinAvgValue = (ownedValue / ownedMaxTime) * MS_IN_SECOND;
      const ownedMaxAvgValue = (ownedValue / ownedMinTime) * MS_IN_SECOND;

      valueDiff = value - ownedValue;
      minAvgValueDiff = minAvgValue - ownedMinAvgValue;
      maxAvgValueDiff = maxAvgValue - ownedMaxAvgValue;
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
