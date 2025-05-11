import { html } from 'lit';
import { msg, str } from '@lit/localize';
import { DealMakerProgram } from '@state/mainframe-state/states/progam-factory/programs/deal-maker';
import { IFormatter } from '@shared/interfaces/formatter';
import { diffFormatterParameters } from '@shared/formatter-parameters';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

const PARAGRAPH_NAME_POINTS = 'points';

export class DealMakerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: DealMakerProgram;

  private _formatter: IFormatter;

  private _threads: number;

  private _currentThreads: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as DealMakerProgram;
    this._formatter = parameters.formatter;
    this._threads = parameters.threads;
    this._currentThreads = parameters.currentThreads;
  }

  public renderEffect = () => {
    return html` <p data-name=${PARAGRAPH_NAME_POINTS}></p> `;
  };

  public partialUpdate(nodeList: NodeListOf<HTMLParagraphElement>): void {
    nodeList.forEach((element) => {
      if (element.dataset.name === PARAGRAPH_NAME_POINTS) {
        this.partialUpdatePoints(element);
      }
    });
  }

  private partialUpdatePoints(element: HTMLParagraphElement) {
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

    const formattedValue = this._formatter.formatNumberFloat(value);
    const formattedValueDiff = this._formatter.formatNumberFloat(valueDiff, diffFormatterParameters);
    const formattedMinAvgValue = this._formatter.formatNumberFloat(minAvgValue);
    const formattedMaxAvgValue = this._formatter.formatNumberFloat(maxAvgValue);
    const formattedMinAvgValueDiff = this._formatter.formatNumberFloat(minAvgValueDiff, diffFormatterParameters);
    const formattedMaxAvgValueDiff = this._formatter.formatNumberFloat(maxAvgValueDiff, diffFormatterParameters);

    element.textContent = msg(
      str`Rewards points: ${formattedValue} (${formattedValueDiff}) per completion (${formattedMinAvgValue} \u2014 ${formattedMaxAvgValue} per second) (${formattedMinAvgValueDiff} \u2014 ${formattedMaxAvgValueDiff})`,
    );
  }
}
