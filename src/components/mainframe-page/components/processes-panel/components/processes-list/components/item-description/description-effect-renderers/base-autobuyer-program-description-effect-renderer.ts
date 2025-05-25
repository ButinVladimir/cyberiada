import { html } from 'lit';
import { MainframeHardwareAutobuyerProgram, IProcess } from '@state/mainframe-state';
import { RewardParameter, IFormatter, MS_IN_SECOND } from '@shared/index';
import { COMMON_TEXTS, PROGRAM_DESCRIPTION_TEXTS, REWARD_PARAMETER_NAMES } from '@texts/index';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export abstract class BaseAutobuyerProgramDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  public readonly values = {};

  protected process: IProcess;

  protected formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this.process = parameters.process;
    this.formatter = parameters.formatter;
  }

  public renderEffect = () => {
    const { usedCores, threads } = this.process;
    const program = this.process.program as MainframeHardwareAutobuyerProgram;

    const time = program.calculateCompletionTime(threads, usedCores);
    const avgValue = (threads / time) * MS_IN_SECOND;

    const formattedValue = this.formatter.formatNumberDecimal(threads);
    const formattedAvgValue = this.formatter.formatNumberFloat(avgValue);

    return html`<p>
      ${COMMON_TEXTS.parameterValue(
        REWARD_PARAMETER_NAMES[RewardParameter.actions](),
        PROGRAM_DESCRIPTION_TEXTS.processCompletionValues(formattedValue, formattedAvgValue),
      )}
    </p>`;
  };

  public recalculateValues() {}
}
