import { t } from 'i18next';
import { html } from 'lit';
import { MainframeHardwareAutobuyerProgram } from '@state/progam-factory/programs/mainframe-hardware-autobuyer';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class MainframeHardwareAutobuyerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _process: IProcess;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._process = parameters.process;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    const { usedCores, threads } = this._process;
    const program = this._process.program as MainframeHardwareAutobuyerProgram;

    const time = program.calculateCompletionTime(threads, usedCores);
    const avgValue = (threads / time) * MS_IN_SECOND;

    return html`
      <p>
        ${t('mainframeHardwareAutobuyer.actionsProcess', {
          ns: 'programs',
          value: this._formatter.formatNumberLong(threads),
          avgValue: this._formatter.formatNumberLong(avgValue),
        })}
      </p>
    `;
  };
}
