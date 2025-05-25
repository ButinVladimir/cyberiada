import { html } from 'lit';
import { IProgram } from '@state/mainframe-state';
import { RewardParameter, IFormatter, MS_IN_SECOND } from '@shared/index';
import { COMMON_TEXTS, PROGRAM_DESCRIPTION_TEXTS, REWARD_PARAMETER_NAMES } from '@texts/index';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export abstract class BaseAutobuyerProgramDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  public readonly values = {};

  protected program: IProgram;

  protected formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this.program = parameters.program;
    this.formatter = parameters.formatter;
  }

  public renderEffect = () => {
    const minTime = this.program.calculateCompletionMinTime(1);
    const maxTime = this.program.calculateCompletionMaxTime(1);
    const minAvgValue = (1 / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (1 / minTime) * MS_IN_SECOND;

    const formattedMinAvgValue = this.formatter.formatNumberFloat(minAvgValue);
    const formattedMaxAvgValue = this.formatter.formatNumberFloat(maxAvgValue);

    return html`
      <p>
        ${COMMON_TEXTS.parameterValue(
          REWARD_PARAMETER_NAMES[RewardParameter.actions](),
          PROGRAM_DESCRIPTION_TEXTS.parameterCompletionValues('1', formattedMinAvgValue, formattedMaxAvgValue),
        )}
      </p>
    `;
  };

  public recalculateValues() {}
}
