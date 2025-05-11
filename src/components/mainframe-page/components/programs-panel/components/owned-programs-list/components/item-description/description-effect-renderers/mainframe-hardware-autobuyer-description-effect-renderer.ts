import { html } from 'lit';
import { msg, str } from '@lit/localize';
import { MainframeHardwareAutobuyerProgram } from '@state/mainframe-state/states/progam-factory/programs/mainframe-hardware-autobuyer';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class MainframeHardwareAutobuyerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: MainframeHardwareAutobuyerProgram;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as MainframeHardwareAutobuyerProgram;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    const minTime = this._program.calculateCompletionMinTime(1);
    const maxTime = this._program.calculateCompletionMaxTime(1);
    const minAvgValue = (1 / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (1 / minTime) * MS_IN_SECOND;

    const formattedMinAvgValue = this._formatter.formatNumberFloat(minAvgValue);
    const formattedMaxAvgValue = this._formatter.formatNumberFloat(maxAvgValue);

    return html`
      <p>${msg(str`Actions: 1 per completion (${formattedMinAvgValue} \u2014 ${formattedMaxAvgValue} per second)`)}</p>
    `;
  };

  public partialUpdate() {}
}
