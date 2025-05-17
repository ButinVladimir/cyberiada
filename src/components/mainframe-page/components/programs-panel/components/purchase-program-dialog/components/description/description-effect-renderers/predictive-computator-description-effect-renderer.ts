import { html } from 'lit';
import { msg, str } from '@lit/localize';
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
    const value = this._program.calculateProcessCompletionSpeedMultiplier(this._cores, this._ram);
    const valueDiff = this._ownedProgram
      ? value - this._ownedProgram.calculateProcessCompletionSpeedMultiplier(this._cores, this._ram)
      : value;

    const formattedValue = this._formatter.formatNumberFloat(value);
    const formattedValueDiff = this._formatter.formatNumberFloat(valueDiff, diffFormatterParameters);

    return html` <p>${msg(str`Speed multiplier: Up to ${formattedValue} (${formattedValueDiff})`)}</p> `;
  };

  public partialUpdate(): void {}
}
