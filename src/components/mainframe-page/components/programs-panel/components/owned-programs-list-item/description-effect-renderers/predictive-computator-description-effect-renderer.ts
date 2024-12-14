import { html } from 'lit';
import { PredictiveComputatorProgram } from '@state/progam-factory/programs/predictive-computator';
import { IFormatter } from '@shared/interfaces/formatter';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class PredictiveComputatorDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: PredictiveComputatorProgram;

  private _formatter: IFormatter;

  private _ram: number;

  private _cores: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as PredictiveComputatorProgram;
    this._formatter = parameters.formatter;
    this._ram = parameters.ram;
    this._cores = parameters.cores;
  }

  public renderEffect = () => {
    const value = JSON.stringify({ value: this._formatter.formatNumberFloat(
      this._program.calculateProgramCompletionSpeedMultiplier(this._cores, this._ram),
    )});

    return html`
      <p>
        <intl-message label="programs:predictiveComputator:speedMultiplierProgram" value=${value}>
          Speed multiplier
        </intl-message>
      </p>
    `;
  };
}
