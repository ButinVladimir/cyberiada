import { html } from 'lit';
import { PredictiveComputatorProgram } from '@state/progam-factory/programs/predictive-computator';
import { IFormatter } from '@shared/interfaces/formatter';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class PredictiveComputatorDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _process: IProcess;

  private _formatter: IFormatter;

  private _availableRam: number;

  constructor(parameters: IDescriptionParameters) {
    this._process = parameters.process;
    this._formatter = parameters.formatter;
    this._availableRam = parameters.availableRam;
  }

  public renderEffect = () => {
    const { usedCores } = this._process;
    const program = this._process.program as PredictiveComputatorProgram;

    const value = JSON.stringify({
      value: this._formatter.formatNumberFloat(
        program.calculateProgramCompletionSpeedMultiplier(usedCores, this._availableRam),
      ),
    });

    return html`
      <p>
        <intl-message label="programs:predictiveComputator:speedMultiplierProcess" value=${value}>
          Speed multiplier
        </intl-message>
      </p>
    `;
  };
}
