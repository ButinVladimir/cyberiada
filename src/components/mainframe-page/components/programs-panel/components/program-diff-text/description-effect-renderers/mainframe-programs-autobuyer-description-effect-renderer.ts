import { html } from 'lit';
import { MainframeProgramsAutobuyerProgram } from '@state/progam-factory/programs/mainframe-programs-autobuyer';
import { IFormatter } from '@shared/interfaces/formatter';
import { diffFormatterParametersFloat } from '@shared/formatter-parameters';
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

    const values = JSON.stringify({
      minAvgValue: this._formatter.formatNumberFloat(minAvgValue),
      maxAvgValue: this._formatter.formatNumberFloat(maxAvgValue),
      minAvgValueDiff: this._formatter.formatNumberFloat(minAvgValueDiff, diffFormatterParametersFloat),
      maxAvgValueDiff: this._formatter.formatNumberFloat(maxAvgValueDiff, diffFormatterParametersFloat),
    });

    return html`
      <p>
        <intl-message label="programs:mainframeProgramsAutobuyer:actionsProgramDiff" value=${values}>
          Actions
        </intl-message>
      </p>
    `;
  };
}
