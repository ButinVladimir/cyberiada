import { html } from 'lit';
import { CodeGeneratorProgram } from '@state/progam-factory/programs/code-generator';
import { IFormatter } from '@shared/interfaces/formatter';
import { diffFormatterParametersLong } from '@shared/formatter-parameters';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class CodeGeneratorDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: CodeGeneratorProgram;

  private _formatter: IFormatter;

  private _threads: number;

  private _currentThreads: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as CodeGeneratorProgram;
    this._formatter = parameters.formatter;
    this._threads = parameters.threads;
    this._currentThreads = parameters.currentThreads;
  }

  public renderEffect = () => {
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

    const values = JSON.stringify({
      value: this._formatter.formatNumberLong(value),
      valueDiff: this._formatter.formatNumberLong(valueDiff, diffFormatterParametersLong),
      minAvgValue: this._formatter.formatNumberLong(minAvgValue),
      maxAvgValue: this._formatter.formatNumberLong(maxAvgValue),
      minAvgValueDiff: this._formatter.formatNumberLong(minAvgValueDiff, diffFormatterParametersLong),
      maxAvgValueDiff: this._formatter.formatNumberLong(maxAvgValueDiff, diffFormatterParametersLong),
    });

    return html`
      <p>
        <intl-message label="programs:codeGenerator:computationalBasePointsDiff" value=${values}>
          Computational base points
        </intl-message>
      </p>
    `;
  };
}
