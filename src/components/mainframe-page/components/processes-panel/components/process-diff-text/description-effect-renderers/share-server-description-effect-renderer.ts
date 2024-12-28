import { html } from 'lit';
import { ShareServerProgram } from '@state/progam-factory/programs/share-server';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class ShareServerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: ShareServerProgram;

  private _formatter: IFormatter;

  private _ram: number;

  private _cores: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as ShareServerProgram;
    this._formatter = parameters.formatter;
    this._ram = parameters.ram;
    this._cores = parameters.cores;
  }

  public renderEffect = () => {
    const money = this._program.calculateMoneyDelta(this._cores, this._ram, MS_IN_SECOND);
    const moneyValues = JSON.stringify({
      money: this._formatter.formatNumberLong(money),
    });

    const developmentPoints = this._program.calculateDevelopmentPointsDelta(this._cores, this._ram, MS_IN_SECOND);
    const developmentPointsValues = JSON.stringify({
      developmentPoints: this._formatter.formatNumberLong(developmentPoints),
    });

    return html`
      <p>
        <intl-message label="programs:shareServer:moneyProgram" value=${moneyValues}> Money </intl-message>
      </p>

      <p>
        <intl-message label="programs:shareServer:developmentPointsProgram" value=${developmentPointsValues}>
          Development points
        </intl-message>
      </p>
    `;
  };
}
