import { t } from 'i18next';
import { html } from 'lit';
import { PredictiveComputatorProgram } from '@state/mainframe-state/states/progam-factory/programs/predictive-computator';
import { IFormatter } from '@shared/interfaces/formatter';
import { diffFormatterParameters } from '@shared/formatter-parameters';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class PredictiveComputatorDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: PredictiveComputatorProgram;

  private _ownedProgram?: PredictiveComputatorProgram;

  private _formatter: IFormatter;

  private _ram: number;

  private _cores: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as PredictiveComputatorProgram;
    this._ownedProgram = parameters.ownedProgram as PredictiveComputatorProgram;
    this._formatter = parameters.formatter;
    this._ram = parameters.ram;
    this._cores = parameters.cores;
  }

  public renderEffect = () => {
    const value = this._program.calculateProgramCompletionSpeedMultiplier(this._cores, this._ram);
    const valueDiff = this._ownedProgram
      ? value - this._ownedProgram.calculateProgramCompletionSpeedMultiplier(this._cores, this._ram)
      : value;

    return html`
      <p>
        ${t('predictiveComputator.speedMultiplierDiff', {
          ns: 'programs',
          value: this._formatter.formatNumberFloat(value),
          valueDiff: this._formatter.formatNumberFloat(valueDiff, diffFormatterParameters),
        })}
      </p>
    `;
  };
}
