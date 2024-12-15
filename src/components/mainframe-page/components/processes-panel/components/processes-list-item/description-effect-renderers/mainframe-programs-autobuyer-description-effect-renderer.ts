import { html } from 'lit';
import { MainframeProgramsAutobuyerProgram } from '@state/progam-factory/programs/mainframe-programs-autobuyer';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class MainframeProgramsAutobuyerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: MainframeProgramsAutobuyerProgram;

  private _formatter: IFormatter;

  private _usedCores: number;

  private _threads: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as MainframeProgramsAutobuyerProgram;
    this._formatter = parameters.formatter;
    this._usedCores = parameters.usedCores;
    this._threads = parameters.threads;
  }

  public renderEffect = () => {
    const time = this._program.calculateCompletionTime(this._threads, this._usedCores);
    const avgValue = this._threads / time * MS_IN_SECOND;

    const values = JSON.stringify({
      value: this._formatter.formatNumberDecimal(this._threads),
      avgValue: this._formatter.formatNumberFloat(avgValue),
    });

    return html`
      <p>
        <intl-message label="programs:mainframeProgramsAutobuyer:actionsProcess" value=${values}> Actions </intl-message>
      </p>
    `;
  };
}
