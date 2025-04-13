import { html } from 'lit';
import { msg, str } from '@lit/localize';
import { CircuitDesignerProgram } from '@state/mainframe-state/states/progam-factory/programs/circuit-designer';
import { IFormatter } from '@shared/interfaces/formatter';
import { diffFormatterParameters } from '@shared/formatter-parameters';
import { MS_IN_SECOND } from '@shared/constants';
import { IDescriptionParameters, IDescriptionEffectRenderer } from '../interfaces';

const PARAGRAPH_NAME_POINTS = 'points';

export class CircuitDesignerDescriptionEffectRenderer implements IDescriptionEffectRenderer {
  private _program: CircuitDesignerProgram;

  private _ownedProgram?: CircuitDesignerProgram;

  private _formatter: IFormatter;

  constructor(parameters: IDescriptionParameters) {
    this._program = parameters.program as CircuitDesignerProgram;
    this._ownedProgram = parameters.ownedProgram as CircuitDesignerProgram;
    this._formatter = parameters.formatter;
  }

  public renderEffect = () => {
    return html` <p data-name=${PARAGRAPH_NAME_POINTS}></p> `;
  };

  public partialUpdate(nodeList: NodeListOf<HTMLParagraphElement>): void {
    nodeList.forEach((element) => {
      if (element.dataset.name === PARAGRAPH_NAME_POINTS) {
        this.partialUpdatePoints(element);
      }
    });
  }

  private partialUpdatePoints(element: HTMLParagraphElement) {
    const value = this._program.calculateDelta(1);
    const minTime = this._program.calculateCompletionMinTime(1);
    const maxTime = this._program.calculateCompletionMaxTime(1);
    const minAvgValue = (value / maxTime) * MS_IN_SECOND;
    const maxAvgValue = (value / minTime) * MS_IN_SECOND;

    let valueDiff = value;
    let minAvgValueDiff = minAvgValue;
    let maxAvgValueDiff = maxAvgValue;

    if (this._ownedProgram) {
      const ownedValue = this._ownedProgram.calculateDelta(1);
      const ownedMinTime = this._ownedProgram.calculateCompletionMinTime(1);
      const ownedMaxTime = this._ownedProgram.calculateCompletionMaxTime(1);
      const ownedMinAvgValue = (ownedValue / ownedMaxTime) * MS_IN_SECOND;
      const ownedMaxAvgValue = (ownedValue / ownedMinTime) * MS_IN_SECOND;

      valueDiff = value - ownedValue;
      minAvgValueDiff = minAvgValue - ownedMinAvgValue;
      maxAvgValueDiff = maxAvgValue - ownedMaxAvgValue;
    }

    const formattedValue = this._formatter.formatNumberFloat(value);
    const formattedValueDiff = this._formatter.formatNumberFloat(valueDiff, diffFormatterParameters);
    const formattedMinAvgValue = this._formatter.formatNumberFloat(minAvgValue);
    const formattedMaxAvgValue = this._formatter.formatNumberFloat(maxAvgValue);
    const formattedMinAvgValueDiff = this._formatter.formatNumberFloat(minAvgValueDiff, diffFormatterParameters);
    const formattedMaxAvgValueDiff = this._formatter.formatNumberFloat(maxAvgValueDiff, diffFormatterParameters);

    element.textContent = msg(
      str`Computational base points: ${formattedValue} (${formattedValueDiff}) per completion (${formattedMinAvgValue} \u2014 ${formattedMaxAvgValue} per second) (${formattedMinAvgValueDiff} \u2014 ${formattedMaxAvgValueDiff})`,
    );
  }
}
