import { html } from 'lit';
import { MainframeHardwareAutobuyerProgram } from '@state/progam-factory/programs/mainframe-hardware-autobuyer';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class MainframeHardwareAutobuyerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: MainframeHardwareAutobuyerProgram;

  private _formatter: IFormatter;

  private _usedCores: number;

  private _threads: number;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as MainframeHardwareAutobuyerProgram;
    this._formatter = parameters.formatter;
    this._usedCores = parameters.usedCores;
    this._threads = parameters.threads;
  }

  public renderEffect = () => {
    const time = this._program.calculateCompletionTime(this._threads, this._usedCores);
    const avgValue = (this._threads / time) * MS_IN_SECOND;

    const values = JSON.stringify({
      value: this._formatter.formatNumberDecimal(this._threads),
      avgValue: this._formatter.formatNumberFloat(avgValue),
    });

    return html`
      <p>
        <intl-message label="programs:mainframeHardwareAutobuyer:actionsProcess" value=${values}>
          Actions
        </intl-message>
      </p>
    `;
  };
}
