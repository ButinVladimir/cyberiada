import { html } from 'lit';
import { msg, str } from '@lit/localize';
import { CodeGeneratorProgram } from '@state/mainframe-state/states/progam-factory/programs/code-generator';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

const PARAGRAPH_NAME_POINTS = 'points';

export class CodeGeneratorDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: CodeGeneratorProgram;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as CodeGeneratorProgram;
    this._formatter = parameters.formatter;
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
    const value = this._program.calculateDelta(1);
    const minTime = this._program.calculateCompletionMinTime(1);
    const maxTime = this._program.calculateCompletionMaxTime(1);
    const minAvgValue = (value / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (value / minTime) * MS_IN_SECOND;

    const formattedValue = this._formatter.formatNumberFloat(value);
    const formattedMinAvgValue = this._formatter.formatNumberFloat(minAvgValue);
    const formattedMaxAvgValue = this._formatter.formatNumberFloat(maxAvgValue);

    element.textContent = msg(
      str`Code base points: ${formattedValue} per completion (${formattedMinAvgValue} \u2014 ${formattedMaxAvgValue} per second)`,
    );
  }
}
