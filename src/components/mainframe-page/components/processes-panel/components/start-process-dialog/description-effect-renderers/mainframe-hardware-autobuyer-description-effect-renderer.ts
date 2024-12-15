import { html } from 'lit';
import { MainframeHardwareAutobuyerProgram } from '@state/progam-factory/programs/mainframe-hardware-autobuyer';
import { IFormatter } from '@shared/interfaces/formatter';
import { diffFormatterParametersDecimal, diffFormatterParametersFloat } from '@shared/formatter-parameters';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class MainframeHardwareAutobuyerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: MainframeHardwareAutobuyerProgram;

  private _formatter: IFormatter;

  private _threads: number;

  private _currentThreads: number; 

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as MainframeHardwareAutobuyerProgram;
    this._formatter = parameters.formatter;
    this._threads = parameters.threads;
    this._currentThreads = parameters.currentThreads;
  }

  public renderEffect = () => {
    const minTime = this._program.calculateCompletionMinTime(this._threads);
    const maxTime = this._program.calculateCompletionMaxTime(this._threads);
    const minAvgValue = this._threads / maxTime * MS_IN_SECOND;
    const maxAvgValue = this._threads / minTime * MS_IN_SECOND;

    const valueDiff = this._threads - this._currentThreads;
    let minAvgValueDiff = minAvgValue;
    let maxAvgValueDiff = maxAvgValue;

    if (this._currentThreads) {
      const currentMinTime = this._program.calculateCompletionMinTime(this._currentThreads);
      const currentMaxTime = this._program.calculateCompletionMaxTime(this._currentThreads);
      const currentMinAvgValue = this._currentThreads / currentMaxTime * MS_IN_SECOND;
      const currentMaxAvgValue = this._currentThreads / currentMinTime * MS_IN_SECOND;      

      minAvgValueDiff = minAvgValue - currentMinAvgValue;
      maxAvgValueDiff = maxAvgValue - currentMaxAvgValue;
    }

    const values = JSON.stringify({
      value: this._formatter.formatNumberDecimal(this._threads),
      valueDiff: this._formatter.formatNumberDecimal(valueDiff, diffFormatterParametersDecimal),
      minAvgValue: this._formatter.formatNumberFloat(minAvgValue),
      maxAvgValue: this._formatter.formatNumberFloat(maxAvgValue),
      minAvgValueDiff: this._formatter.formatNumberFloat(minAvgValueDiff, diffFormatterParametersFloat),
      maxAvgValueDiff: this._formatter.formatNumberFloat(maxAvgValueDiff, diffFormatterParametersFloat),
    });

    return html`
      <p>
        <intl-message label="programs:mainframeHardwareAutobuyer:actionsProcessDiff" value=${values}> Actions </intl-message>
      </p>
    `;
  };
}
