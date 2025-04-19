import { html } from 'lit';
import { msg, str } from '@lit/localize';
import { ShareServerProgram } from '@state/mainframe-state/states/progam-factory/programs/share-server';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { diffFormatterParameters } from '@shared/formatter-parameters';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

const PARAGRAPH_NAME_MONEY = 'money';
const PARAGRAPH_NAME_POINTS = 'points';

export class ShareServerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: ShareServerProgram;

  private _ownedProgram?: ShareServerProgram;

  private _formatter: IFormatter;

  private _ram: number;

  private _cores: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as ShareServerProgram;
    this._ownedProgram = parameters.ownedProgram as ShareServerProgram;
    this._formatter = parameters.formatter;
    this._ram = parameters.ram;
    this._cores = parameters.cores;
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
    const money = this._program.calculateMoneyDelta(this._cores, this._ram, MS_IN_SECOND);
    const moneyDiff = this._ownedProgram
      ? money - this._ownedProgram.calculateMoneyDelta(this._cores, this._ram, MS_IN_SECOND)
      : money;

    const formattedMoney = this._formatter.formatNumberFloat(money);
    const formattedMoneyDiff = this._formatter.formatNumberFloat(moneyDiff, diffFormatterParameters);

    element.textContent = msg(str`Money: Up to ${formattedMoney} (${formattedMoneyDiff}) per second`);
  }

  private partialUpdatePoints(element: HTMLParagraphElement) {
    const developmentPoints = this._program.calculateDevelopmentPointsDelta(this._cores, this._ram, MS_IN_SECOND);
    const developmentPointsDiff = this._ownedProgram
      ? developmentPoints - this._ownedProgram.calculateDevelopmentPointsDelta(this._cores, this._ram, MS_IN_SECOND)
      : developmentPoints;

    const formattedPoints = this._formatter.formatNumberFloat(developmentPoints);
    const formattedPointsDiff = this._formatter.formatNumberFloat(developmentPointsDiff, diffFormatterParameters);

    element.textContent = msg(str`Development points: Up to ${formattedPoints} (${formattedPointsDiff}) per second`);
  }
}
