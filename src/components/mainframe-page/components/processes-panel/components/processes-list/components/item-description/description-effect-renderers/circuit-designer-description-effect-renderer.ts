import { html } from 'lit';
import { CircuitDesignerProgram, IProcess } from '@state/mainframe-state';
import { RewardParameter, IFormatter, MS_IN_SECOND } from '@shared/index';
import { COMMON_TEXTS, PROGRAM_DESCRIPTION_TEXTS, REWARD_PARAMETER_NAMES } from '@texts/index';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

const VALUES = {
  value: 'value',
  avgValue: 'avg-value',
};

export class CircuitDesignerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  public readonly values = {
    [VALUES.value]: '',
    [VALUES.avgValue]: '',
  };

  private _process: IProcess;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._process = parameters.process;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    return html`<p>
      ${COMMON_TEXTS.parameterValue(
        REWARD_PARAMETER_NAMES[RewardParameter.computationalBase](),
        PROGRAM_DESCRIPTION_TEXTS.processCompletionValues(
          html`<span data-value=${VALUES.value}></span>`,
          html`<span data-value=${VALUES.avgValue}></span>`,
        ),
      )}
    </p> `;
  };

  public recalculateValues() {
    const { usedCores, threads } = this._process;
    const program = this._process.program as CircuitDesignerProgram;

    const value = program.calculateDelta(threads);
    const time = program.calculateCompletionTime(threads, usedCores);
    const avgValue = (value / time) * MS_IN_SECOND;

    this.values[VALUES.value] = this._formatter.formatNumberFloat(value);
    this.values[VALUES.avgValue] = this._formatter.formatNumberFloat(avgValue);
  }
}
