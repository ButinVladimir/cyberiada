import { t } from 'i18next';
import { html } from 'lit';
import { ShareServerProgram } from '@state/mainframe-state/states/progam-factory/programs/share-server';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
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

    return html`
      <p>
        ${t('shareServer.moneyProcess', {
          ns: 'programs',
          money: this._formatter.formatNumberFloat(
            program.calculateMoneyDelta(usedCores, this._availableRam, MS_IN_SECOND),
          ),
        })}
      </p>

      <p>
        ${t('shareServer.developmentPointsProcess', {
          ns: 'programs',
          developmentPoints: this._formatter.formatNumberFloat(
            program.calculateDevelopmentPointsDelta(usedCores, this._availableRam, MS_IN_SECOND),
          ),
        })}
      </p>
    `;
  };
}
