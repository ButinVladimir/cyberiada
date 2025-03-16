import { t } from 'i18next';
import { html } from 'lit';
import { PredictiveComputatorProgram } from '@state/mainframe-state/states/progam-factory/programs/predictive-computator';
import { IFormatter } from '@shared/interfaces/formatter';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class PredictiveComputatorDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _process: IProcess;

  private _formatter: IFormatter;

  private _autoscalableProcessRam: number;

  constructor(parameters: IDescriptionParameters) {
    this._process = parameters.process;
    this._formatter = parameters.formatter;
    this._autoscalableProcessRam = parameters.autoscalableProcessRam;
  }

  public renderEffect = () => {
    const { usedCores } = this._process;
    const program = this._process.program as PredictiveComputatorProgram;

    return html`
      <p>
        ${t('predictiveComputator.speedMultiplierProcess', {
          ns: 'programs',
          value: this._formatter.formatNumberFloat(
            program.calculateProgramCompletionSpeedMultiplier(usedCores, this._autoscalableProcessRam),
          ),
        })}
      </p>
    `;
  };
}
