import { html } from 'lit';
import { InformationCollectorProgram } from '@state/mainframe-state';
import { IFormatter, MS_IN_SECOND, RewardParameter } from '@shared/index';
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

  private _program: InformationCollectorProgram;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as InformationCollectorProgram;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    return html`
      <p>
        ${COMMON_TEXTS.parameterValue(
          REWARD_PARAMETER_NAMES[RewardParameter.connectivity](),
          PROGRAM_DESCRIPTION_TEXTS.parameterCompletionValues(
            html`<span data-value=${VALUES.value}></span>`,
            html`<span data-value=${VALUES.minAvgValue}></span>`,
            html`<span data-value=${VALUES.maxAvgValue}></span>`,
          ),
        )}
      </p>
    `;
  };

  public recalculateValues() {
    const value = this._program.calculateDelta(1);
    const minTime = this._program.calculateCompletionMinTime(1);
    const maxTime = this._program.calculateCompletionMaxTime(1);
    const minAvgValue = (value / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (value / minTime) * MS_IN_SECOND;

    this.values[VALUES.value] = this._formatter.formatNumberFloat(value);
    this.values[VALUES.minAvgValue] = this._formatter.formatNumberFloat(minAvgValue);
    this.values[VALUES.maxAvgValue] = this._formatter.formatNumberFloat(maxAvgValue);
  }
}
