import { html } from 'lit';
import { MainframeProgramsAutobuyerProgram } from '@state/progam-factory/programs/mainframe-programs-autobuyer';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class MainframeProgramsAutobuyerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _process: IProcess;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._process = parameters.process;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    const { usedCores, threads } = this._process;
    const program = this._process.program as MainframeProgramsAutobuyerProgram;

    const time = program.calculateCompletionTime(threads, usedCores);
    const avgValue = (threads / time) * MS_IN_SECOND;

    const values = JSON.stringify({
      value: this._formatter.formatNumberDecimal(threads),
      avgValue: this._formatter.formatNumberFloat(avgValue),
    });

    return html`
      <p>
        <intl-message label="programs:mainframeProgramsAutobuyer:actionsProcess" value=${values}>
          Actions
        </intl-message>
      </p>
    `;
  };
}
