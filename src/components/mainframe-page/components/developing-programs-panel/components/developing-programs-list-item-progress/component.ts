import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ProgramName } from '@state/progam-factory/types';
import { DevelopingProgramsListItemProgressController } from './controller';

@customElement('ca-developing-programs-list-item-progress')
export class DevelopingProgramsListItemProgress extends LitElement {
  static styles = css`
    :host {
      flex: 1 1 auto;
    }
  `;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName: string = ProgramName.shareServer;

  private _developingProgramsListItemProgressController: DevelopingProgramsListItemProgressController;

  constructor() {
    super();

    this._developingProgramsListItemProgressController = new DevelopingProgramsListItemProgressController(this);
  }

  render() {
    const developingProgram = this._developingProgramsListItemProgressController.getDevelopingProgram(
      this.programName as ProgramName,
    );

    if (!developingProgram) {
      return html``;
    }

    const formatter = this._developingProgramsListItemProgressController.formatter;

    let progressBarHintLabel: string;
    let progressBarHintValue: string;

    const programDevelopmentDelta = this._developingProgramsListItemProgressController.getProgressDelta();

    if (programDevelopmentDelta > 0) {
      progressBarHintLabel = 'ui:mainframe:developingPrograms:progressBarHintActive';
      progressBarHintValue = formatter.formatTimeShort(
        (developingProgram.program.developmentPoints - developingProgram.currentDevelopmentPoints) /
          programDevelopmentDelta,
      );
    } else {
      progressBarHintLabel = 'ui:mainframe:developingPrograms:progressBarHintPaused';
      progressBarHintValue = '';
    }

    const progressBarLabelValues = JSON.stringify({
      currentDevelopmentPoints: formatter.formatNumberLong(developingProgram.currentDevelopmentPoints),
      maxDevelopmentPoints: formatter.formatNumberLong(developingProgram.program.developmentPoints),
    });
    const progressBarValue = Math.round(
      (developingProgram.currentDevelopmentPoints / developingProgram.program.developmentPoints) * 100,
    );

    return html`
      <sl-tooltip>
        <intl-message slot="content" label=${progressBarHintLabel} value=${progressBarHintValue}>
          Progress bar hint
        </intl-message>

        <sl-progress-bar value=${progressBarValue}>
          <intl-message label="ui:mainframe:developingPrograms:progressBarLabel" value=${progressBarLabelValues}>
            Progress
          </intl-message>
        </sl-progress-bar>
      </sl-tooltip>
    `;
  }
}
