import { t } from 'i18next';
import { html } from 'lit';
import { ShareServerProgram } from '@state/mainframe-state/states/progam-factory/programs/share-server';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { diffFormatterParameters } from '@shared/formatter-parameters';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

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
    const money = this._program.calculateMoneyDelta(this._cores, this._ram, MS_IN_SECOND);
    const moneyDiff = this._ownedProgram
      ? money - this._ownedProgram.calculateMoneyDelta(this._cores, this._ram, MS_IN_SECOND)
      : money;

    const developmentPoints = this._program.calculateDevelopmentPointsDelta(this._cores, this._ram, MS_IN_SECOND);
    const developmentPointsDiff = this._ownedProgram
      ? money - this._ownedProgram.calculateDevelopmentPointsDelta(this._cores, this._ram, MS_IN_SECOND)
      : money;

    return html`
      <p>
        ${t('shareServer.moneyDiff', {
          ns: 'programs',
          money: this._formatter.formatNumberFloat(money),
          moneyDiff: this._formatter.formatNumberFloat(moneyDiff, diffFormatterParameters),
        })}
      </p>

      <p>
        ${t('shareServer.developmentPointsDiff', {
          ns: 'programs',
          developmentPoints: this._formatter.formatNumberFloat(developmentPoints),
          developmentPointsDiff: this._formatter.formatNumberFloat(developmentPointsDiff, diffFormatterParameters),
        })}
      </p>
    `;
  };
}
