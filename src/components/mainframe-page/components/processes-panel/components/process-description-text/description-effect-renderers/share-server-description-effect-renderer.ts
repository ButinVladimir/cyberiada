import { html } from 'lit';
import { ShareServerProgram } from '@state/progam-factory/programs/share-server';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class ShareServerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _process: IProcess;

  private _formatter: IFormatter;

  private _availableRam: number;

  constructor(parameters: IDescriptionParameters) {
    this._process = parameters.process;
    this._formatter = parameters.formatter;
    this._availableRam = parameters.availableRam;
  }

  public renderEffect = () => {
    const { usedCores } = this._process;
    const program = this._process.program as ShareServerProgram;

    const money = JSON.stringify({
      money: this._formatter.formatNumberLong(program.calculateMoneyDelta(usedCores, this._availableRam, MS_IN_SECOND)),
    });

    const developmentPoints = JSON.stringify({
      developmentPoints: this._formatter.formatNumberLong(
        program.calculateDevelopmentPointsDelta(usedCores, this._availableRam, MS_IN_SECOND),
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
