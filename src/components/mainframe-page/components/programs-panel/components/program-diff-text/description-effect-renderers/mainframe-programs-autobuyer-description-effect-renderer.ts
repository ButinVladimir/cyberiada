import { html } from 'lit';
import { msg, str } from '@lit/localize';
import { MainframeProgramsAutobuyerProgram } from '@state/mainframe-state/states/progam-factory/programs/mainframe-programs-autobuyer';
import { IFormatter } from '@shared/interfaces/formatter';
import { diffFormatterParameters } from '@shared/formatter-parameters';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class MainframeProgramsAutobuyerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: MainframeProgramsAutobuyerProgram;

  private _ownedProgram?: MainframeProgramsAutobuyerProgram;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as MainframeProgramsAutobuyerProgram;
    this._ownedProgram = parameters.ownedProgram as MainframeProgramsAutobuyerProgram;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    const minTime = this._program.calculateCompletionMinTime(1);
    const maxTime = this._program.calculateCompletionMaxTime(1);
    const minAvgValue = (1 / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (1 / minTime) * MS_IN_SECOND;

    let minAvgValueDiff = minAvgValue;
    let maxAvgValueDiff = maxAvgValue;

    if (this._ownedProgram) {
      const ownedMinTime = this._ownedProgram.calculateCompletionMinTime(1);
      const ownedMaxTime = this._ownedProgram.calculateCompletionMaxTime(1);
      const ownedMinAvgValue = (1 / ownedMaxTime) * MS_IN_SECOND;
      const ownedMaxAvgValue = (1 / ownedMinTime) * MS_IN_SECOND;

      minAvgValueDiff = minAvgValue - ownedMinAvgValue;
      maxAvgValueDiff = maxAvgValue - ownedMaxAvgValue;
    }

    const formattedMinAvgValue = this._formatter.formatNumberFloat(minAvgValue);
    const formattedMaxAvgValue = this._formatter.formatNumberFloat(maxAvgValue);
    const formattedMinAvgValueDiff = this._formatter.formatNumberFloat(minAvgValueDiff, diffFormatterParameters);
    const formattedMaxAvgValueDiff = this._formatter.formatNumberFloat(maxAvgValueDiff, diffFormatterParameters);

    return html`
      <p>
        ${msg(
          str`Actions: 1 per completion (${formattedMinAvgValue} \u2014 ${formattedMaxAvgValue} per second) (${formattedMinAvgValueDiff} \u2014 ${formattedMaxAvgValueDiff})`,
        )}
      </p>
    `;
  };

  public partialUpdate() {}
}
