import { html } from 'lit';
import { CodeGeneratorProgram } from '@state/progam-factory/programs/code-generator';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class CodeGeneratorDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: CodeGeneratorProgram;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as CodeGeneratorProgram;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    const value = this._program.calculateDelta(1);
    const minTime = this._program.calculateCompletionMinTime(1);
    const maxTime = this._program.calculateCompletionMaxTime(1);
    const minAvgValue = (value / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (value / minTime) * MS_IN_SECOND;

    const values = JSON.stringify({
      value: this._formatter.formatNumberLong(value),
      minAvgValue: this._formatter.formatNumberLong(minAvgValue),
      maxAvgValue: this._formatter.formatNumberLong(maxAvgValue),
    });

    return html`
      <p>
        <intl-message label="programs:codeGenerator:computationalBasePointsProgram" value=${values}>
          Computational base points
        </intl-message>
      </p>
    `;
  };
}
