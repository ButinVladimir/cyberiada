import { html } from 'lit';
import { ShareServerProgram } from '@state/progam-factory/programs/share-server';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class ShareServerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: ShareServerProgram;

  private _formatter: IFormatter;

  private _availableRam: number;

  private _usedCores: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as ShareServerProgram;
    this._formatter = parameters.formatter;
    this._availableRam = parameters.availableRam;
    this._usedCores = parameters.usedCores;
  }

  public renderEffect = () => {
    const money = JSON.stringify({
      money: this._formatter.formatNumberLong(
        this._program.calculateMoneyDelta(this._usedCores, this._availableRam, MS_IN_SECOND),
      ),
    });

    const developmentPoints = JSON.stringify({
      developmentPoints: this._formatter.formatNumberLong(
        this._program.calculateDevelopmentPointsDelta(this._usedCores, this._availableRam, MS_IN_SECOND),
      ),
    });

    return html`
      <p>
        <intl-message label="programs:shareServer:moneyProcess" value=${money}> Money </intl-message>
      </p>

      <p>
        <intl-message label="programs:shareServer:developmentPointsProcess" value=${developmentPoints}>
          Development points
        </intl-message>
      </p>
    `;
  };
}
