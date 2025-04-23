import { html } from 'lit';
import { msg, str } from '@lit/localize';
import { CodeGeneratorProgram } from '@state/mainframe-state/states/progam-factory/programs/code-generator';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

const PARAGRAPH_NAME_POINTS = 'points';

export class CodeGeneratorDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _process: IProcess;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._process = parameters.process;
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
    const { usedCores, threads } = this._process;
    const program = this._process.program as CodeGeneratorProgram;

    const value = program.calculateDelta(threads);
    const time = program.calculateCompletionTime(threads, usedCores);
    const avgValue = (value / time) * MS_IN_SECOND;

    const formattedValue = this._formatter.formatNumberFloat(value);
    const formattedAvgValue = this._formatter.formatNumberFloat(avgValue);

    element.textContent = msg(
      str`Code base points: ${formattedValue} per completion (${formattedAvgValue} per second)`,
    );
  }
}
