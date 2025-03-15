import { t } from 'i18next';
import { html } from 'lit';
import { CircuitDesignerProgram } from '@state/mainframe-state/states/progam-factory/programs/circuit-designer';
import { IFormatter } from '@shared/interfaces/formatter';
import { MS_IN_SECOND } from '@shared/constants';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class CircuitDesignerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _process: IProcess;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._process = parameters.process;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    const { usedCores, threads } = this._process;
    const program = this._process.program as CircuitDesignerProgram;

    const value = program.calculateDelta(threads);
    const time = program.calculateCompletionTime(threads, usedCores);
    const avgValue = (value / time) * MS_IN_SECOND;

    return html`
      <p>
        ${t('circuitDesigner.computationalBasePointsProcess', {
          ns: 'programs',
          value: this._formatter.formatNumberFloat(value),
          avgValue: this._formatter.formatNumberFloat(avgValue),
        })}
      </p>
    `;
  };
}
