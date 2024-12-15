import { html } from 'lit';
import { CodeGeneratorProgram } from '@state/progam-factory/programs/code-generator';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class CodeGeneratorDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: CodeGeneratorProgram;

  private _formatter: IFormatter;

  private _usedCores: number;

  private _threads: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as CodeGeneratorProgram;
    this._formatter = parameters.formatter;
    this._usedCores = parameters.usedCores;
    this._threads = parameters.threads;
  }

  public renderEffect = () => {
    const value = this._program.calculateDelta(this._threads);
    const time = this._program.calculateCompletionTime(this._threads, this._usedCores);
    const avgValue = (value / time) * MS_IN_SECOND;

    const values = JSON.stringify({
      value: this._formatter.formatNumberLong(value),
      avgValue: this._formatter.formatNumberLong(avgValue),
    });

    return html`
      <p>
        <intl-message label="programs:codeGenerator:computationalBasePointsProcess" value=${values}>
          Computational base points
        </intl-message>
      </p>
    `;
  };
}
