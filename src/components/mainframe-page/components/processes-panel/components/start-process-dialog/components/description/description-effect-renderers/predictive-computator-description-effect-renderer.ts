import { html } from 'lit';
import { msg, str } from '@lit/localize';
import { PredictiveComputatorProgram } from '@state/mainframe-state/states/progam-factory/programs/predictive-computator';
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
    this._ram = parameters.maxRam;
    this._cores = parameters.maxCores;
  }

  public renderEffect = () => {
    const value = this._program.calculateProgramCompletionSpeedMultiplier(this._cores, this._ram);

    const formattedValue = this._formatter.formatNumberFloat(value);

    return html` <p>${msg(str`Speed multiplier: Up to ${formattedValue}`)}</p> `;
  };

  public partialUpdate(): void {}
}
