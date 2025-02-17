import { t } from 'i18next';
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

    return html`
      <p>
        ${t('codeGenerator.codeBasePointsDiff', {
          ns: 'programs',
          value: this._formatter.formatNumberFloat(value),
          valueDiff: this._formatter.formatNumberFloat(valueDiff, diffFormatterParametersLong),
          minAvgValue: this._formatter.formatNumberFloat(minAvgValue),
          maxAvgValue: this._formatter.formatNumberFloat(maxAvgValue),
          minAvgValueDiff: this._formatter.formatNumberFloat(minAvgValueDiff, diffFormatterParametersLong),
          maxAvgValueDiff: this._formatter.formatNumberFloat(maxAvgValueDiff, diffFormatterParametersLong),
        })}
      </p>
    `;
  };
}
