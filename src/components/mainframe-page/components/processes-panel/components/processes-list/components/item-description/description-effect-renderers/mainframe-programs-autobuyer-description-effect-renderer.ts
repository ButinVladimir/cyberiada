import { html } from 'lit';
import { MainframeProgramsAutobuyerProgram, IProcess } from '@state/mainframe-state';
import { RewardParameter, IFormatter, MS_IN_SECOND } from '@shared/index';
import { COMMON_TEXTS, PROGRAM_DESCRIPTION_TEXTS, REWARD_PARAMETER_NAMES } from '@texts/index';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class MainframeProgramsAutobuyerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  public readonly values = {};

  private _process: IProcess;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._process = parameters.process;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    const { usedCores, threads } = this._process;
    const program = this._process.program as MainframeProgramsAutobuyerProgram;

    const time = program.calculateCompletionTime(threads, usedCores);
    const avgValue = (threads / time) * MS_IN_SECOND;

    const formattedValue = this._formatter.formatNumberDecimal(threads);
    const formattedAvgValue = this._formatter.formatNumberFloat(avgValue);

    return html`<p>
      ${COMMON_TEXTS.parameterValue(
        REWARD_PARAMETER_NAMES[RewardParameter.actions](),
        PROGRAM_DESCRIPTION_TEXTS.processCompletionValues(formattedValue, formattedAvgValue),
      )}
    </p>`;
  };

  public recalculateValues() {}
}
