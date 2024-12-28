import { html } from 'lit';
import { CodeGeneratorProgram } from '@state/progam-factory/programs/code-generator';
import { IFormatter } from '@shared/interfaces/formatter';
import { diffFormatterParametersLong } from '@shared/formatter-parameters';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class CodeGeneratorDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: CodeGeneratorProgram;

  private _ownedProgram?: CodeGeneratorProgram;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as CodeGeneratorProgram;
    this._ownedProgram = parameters.ownedProgram as CodeGeneratorProgram;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    const value = this._program.calculateDelta(1);
    const minTime = this._program.calculateCompletionMinTime(1);
    const maxTime = this._program.calculateCompletionMaxTime(1);
    const minAvgValue = (value / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (value / minTime) * MS_IN_SECOND;

    let valueDiff = value;
    let minAvgValueDiff = minAvgValue;
    let maxAvgValueDiff = maxAvgValue;

    if (this._ownedProgram) {
      const ownedValue = this._ownedProgram.calculateDelta(1);
      const ownedMinTime = this._ownedProgram.calculateCompletionMinTime(1);
      const ownedMaxTime = this._ownedProgram.calculateCompletionMaxTime(1);
      const ownedMinAvgValue = (ownedValue / ownedMaxTime) * MS_IN_SECOND;
      const ownedMaxAvgValue = (ownedValue / ownedMinTime) * MS_IN_SECOND;

      valueDiff = value - ownedValue;
      minAvgValueDiff = minAvgValue - ownedMinAvgValue;
      maxAvgValueDiff = maxAvgValue - ownedMaxAvgValue;
    }

    const values = JSON.stringify({
      value: this._formatter.formatNumberLong(value),
      valueDiff: this._formatter.formatNumberLong(valueDiff, diffFormatterParametersLong),
      minAvgValue: this._formatter.formatNumberLong(minAvgValue),
      maxAvgValue: this._formatter.formatNumberLong(maxAvgValue),
      minAvgValueDiff: this._formatter.formatNumberLong(minAvgValueDiff, diffFormatterParametersLong),
      maxAvgValueDiff: this._formatter.formatNumberLong(maxAvgValueDiff, diffFormatterParametersLong),
    });

    return html`
      <p>
        <intl-message label="programs:codeGenerator:computationalBasePointsDiff" value=${values}>
          Computational base points
        </intl-message>
      </p>
    `;
  };
}
