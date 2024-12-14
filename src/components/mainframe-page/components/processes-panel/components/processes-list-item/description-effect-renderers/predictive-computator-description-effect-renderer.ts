import { html } from 'lit';
import { PredictiveComputatorProgram } from '@state/progam-factory/programs/predictive-computator';
import { IFormatter } from '@shared/interfaces/formatter';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class PredictiveComputatorDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: PredictiveComputatorProgram;

  private _formatter: IFormatter;

  private _availableRam: number;

  private _usedCores: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as PredictiveComputatorProgram;
    this._formatter = parameters.formatter;
    this._availableRam = parameters.availableRam;
    this._usedCores = parameters.usedCores;
  }

  public renderEffect = () => {
    const value = JSON.stringify({ value: this._formatter.formatNumberFloat(
      this._program.calculateProgramCompletionSpeedMultiplier(this._usedCores, this._availableRam),
    )});

    return html`
      <p>
        <intl-message label="programs:predictiveComputator:speedMultiplierProcess" value=${value}>
          Speed multiplier
        </intl-message>
      </p>
    `;
  };
}
