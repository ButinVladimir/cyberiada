import { html } from 'lit';
import { msg, str } from '@lit/localize';
import { MainframeProgramsAutobuyerProgram } from '@state/mainframe-state/states/progam-factory/programs/mainframe-programs-autobuyer';
import { IFormatter } from '@shared/interfaces/formatter';
import { diffFormatterParameters } from '@shared/formatter-parameters';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class MainframeProgramsAutobuyerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
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
    const formattedValueDiff = this._formatter.formatNumberFloat(valueDiff, diffFormatterParameters);
    const formattedMinAvgValue = this._formatter.formatNumberFloat(minAvgValue);
    const formattedMaxAvgValue = this._formatter.formatNumberFloat(maxAvgValue);
    const formattedMinAvgValueDiff = this._formatter.formatNumberFloat(minAvgValueDiff, diffFormatterParameters);
    const formattedMaxAvgValueDiff = this._formatter.formatNumberFloat(maxAvgValueDiff, diffFormatterParameters);

    return html`
      <p>
        ${msg(
          str`Actions: ${formattedValue} (${formattedValueDiff}) per completion (${formattedMinAvgValue} \u2014 ${formattedMaxAvgValue} per second) (${formattedMinAvgValueDiff} \u2014 ${formattedMaxAvgValueDiff})`,
        )}
      </p>
    `;
  };

  public partialUpdate(): void {}
}
