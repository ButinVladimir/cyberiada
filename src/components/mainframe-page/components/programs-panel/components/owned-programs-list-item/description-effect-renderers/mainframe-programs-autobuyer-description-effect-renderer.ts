import { html } from 'lit';
import { MainframeProgramsAutobuyerProgram } from '@state/progam-factory/programs/mainframe-programs-autobuyer';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class MainframeProgramsAutobuyerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: MainframeProgramsAutobuyerProgram;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as MainframeProgramsAutobuyerProgram;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    const minTime = this._program.calculateCompletionMinTime(1);
    const maxTime = this._program.calculateCompletionMaxTime(1);
    const minAvgValue = 1 / maxTime * MS_IN_SECOND;
    const maxAvgValue = 1 / minTime * MS_IN_SECOND;

    const values = JSON.stringify({
      minAvgValue: this._formatter.formatNumberFloat(minAvgValue),
      maxAvgValue: this._formatter.formatNumberFloat(maxAvgValue),
    });

    return html`
      <p>
        <intl-message label="programs:mainframeProgramsAutobuyer:actionsProgram" value=${values}> Actions </intl-message>
      </p>
    `;
  };
}
