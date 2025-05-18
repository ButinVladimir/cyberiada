import { html } from 'lit';
import { MainframeHardwareAutobuyerProgram } from '@state/mainframe-state';
import {
  RewardParameter,
  IFormatter,
  diffFormatterParameters,
  MS_IN_SECOND,
  getHighlightDifferenceClass,
} from '@shared/index';
import { COMMON_TEXTS, PROGRAM_DESCRIPTION_TEXTS, REWARD_PARAMETER_NAMES } from '@texts/index';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

export class MainframeHardwareAutobuyerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  public readonly values = {};
  public readonly diffs = {};

  private _program: MainframeHardwareAutobuyerProgram;

  private _ownedProgram?: MainframeHardwareAutobuyerProgram;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as MainframeHardwareAutobuyerProgram;
    this._ownedProgram = parameters.ownedProgram as MainframeHardwareAutobuyerProgram;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    const minTime = this._program.calculateCompletionMinTime(1);
    const maxTime = this._program.calculateCompletionMaxTime(1);
    const minAvgValue = (1 / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (1 / minTime) * MS_IN_SECOND;

    let minAvgValueDiff = minAvgValue;
    let maxAvgValueDiff = maxAvgValue;

    if (this._ownedProgram) {
      const ownedMinTime = this._ownedProgram.calculateCompletionMinTime(1);
      const ownedMaxTime = this._ownedProgram.calculateCompletionMaxTime(1);
      const ownedMinAvgValue = (1 / ownedMaxTime) * MS_IN_SECOND;
      const ownedMaxAvgValue = (1 / ownedMinTime) * MS_IN_SECOND;

      minAvgValueDiff = minAvgValue - ownedMinAvgValue;
      maxAvgValueDiff = maxAvgValue - ownedMaxAvgValue;
    }

    const formattedMinAvgValue = this._formatter.formatNumberFloat(minAvgValue);
    const formattedMaxAvgValue = this._formatter.formatNumberFloat(maxAvgValue);

    const minAvgDiffClass = getHighlightDifferenceClass(minAvgValueDiff);
    const minAvgDiffEl = html`<span class=${minAvgDiffClass}
      >${this._formatter.formatNumberFloat(minAvgValueDiff, diffFormatterParameters)}</span
    >`;

    const maxAvgDiffClass = getHighlightDifferenceClass(maxAvgValueDiff);
    const maxAvgDiffEl = html`<span class=${maxAvgDiffClass}
      >${this._formatter.formatNumberFloat(maxAvgValueDiff, diffFormatterParameters)}</span
    >`;

    return html`
      <p>
        ${COMMON_TEXTS.parameterValue(
          REWARD_PARAMETER_NAMES[RewardParameter.actions](),
          PROGRAM_DESCRIPTION_TEXTS.actionCompletionDiffs(
            '1',
            formattedMinAvgValue,
            minAvgDiffEl,
            formattedMaxAvgValue,
            maxAvgDiffEl,
          ),
        )}
      </p>
    `;
  };

  public recalculateValues() {}
}
