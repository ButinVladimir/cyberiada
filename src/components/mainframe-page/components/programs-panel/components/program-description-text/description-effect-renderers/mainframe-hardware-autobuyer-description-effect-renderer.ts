import { t } from 'i18next';
import { html } from 'lit';
import { MainframeHardwareAutobuyerProgram } from '@state/progam-factory/programs/mainframe-hardware-autobuyer';
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

    return html`
      <p>
        ${t('mainframeHardwareAutobuyer.actionsProgram', {
          ns: 'programs',
          minAvgValue: this._formatter.formatNumberFloat(minAvgValue),
          maxAvgValue: this._formatter.formatNumberFloat(maxAvgValue),
        })}
      </p>
    `;
  };
}
