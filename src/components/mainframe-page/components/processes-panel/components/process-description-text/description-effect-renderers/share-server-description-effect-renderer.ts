import { html } from 'lit';
import { msg, str } from '@lit/localize';
import { ShareServerProgram } from '@state/mainframe-state/states/progam-factory/programs/share-server';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

const PARAGRAPH_NAME_MONEY = 'money';
const PARAGRAPH_NAME_POINTS = 'points';

export class ShareServerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _process: IProcess;

  private _formatter: IFormatter;

  private _autoscalableProcessRam: number;

  constructor(parameters: IDescriptionParameters) {
    this._process = parameters.process;
    this._formatter = parameters.formatter;
    this._autoscalableProcessRam = parameters.autoscalableProcessRam;
  }

  public renderEffect = () => {
    return html`
      <p data-name=${PARAGRAPH_NAME_MONEY}></p>

      <p data-name=${PARAGRAPH_NAME_POINTS}></p>
    `;
  };

  public partialUpdate(nodeList: NodeListOf<HTMLParagraphElement>): void {
    nodeList.forEach((element) => {
      switch (element.dataset.name) {
        case PARAGRAPH_NAME_MONEY:
          this.partialUpdateMoney(element);
          break;
        case PARAGRAPH_NAME_POINTS:
          this.partialUpdatePoints(element);
          break;
      }
    });
  }

  private partialUpdateMoney(element: HTMLParagraphElement) {
    const { usedCores } = this._process;
    const program = this._process.program as ShareServerProgram;

    const value = program.calculateMoneyDelta(usedCores, this._autoscalableProcessRam, MS_IN_SECOND);

    const formattedValue = this._formatter.formatNumberFloat(value);

    element.textContent = msg(str`Money: ${formattedValue} per second`);
  }

  private partialUpdatePoints(element: HTMLParagraphElement) {
    const { usedCores } = this._process;
    const program = this._process.program as ShareServerProgram;

    const value = program.calculateDevelopmentPointsDelta(usedCores, this._autoscalableProcessRam, MS_IN_SECOND);

    const formattedValue = this._formatter.formatNumberDecimal(value);

    element.textContent = msg(str`Development points: ${formattedValue} per second`);
  }
}
