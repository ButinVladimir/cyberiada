import { t } from 'i18next';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ProgramName } from '@state/progam-factory/types';
import { DevelopingProgramActionsColumnController } from './controller';

@customElement('ca-developing-program-actions-column')
export class DevelopingProgramActionsColumn extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: var(--sl-spacing-small);
      font-size: var(--sl-font-size-large);
    }

    sl-progress-bar {
      flex: 1 1 auto;
    }

    sl-icon-button#delete-btn::part(base):hover {
      color: var(--sl-color-danger-600);
    }
  `;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName: string = ProgramName.shareServer;

  @property({
    attribute: 'current-development-points',
    type: Number,
  })
  currentDevelopmentPoints = 0;

  @property({
    attribute: 'max-development-points',
    type: Number,
  })
  maxDevelopmentPoints = 0;

  @property({
    attribute: 'active',
    type: Boolean,
  })
  active = true;

  private _developingProgramActionsColumnController: DevelopingProgramActionsColumnController;

  constructor() {
    super();

    this._developingProgramActionsColumnController = new DevelopingProgramActionsColumnController(this);
  }

  render() {
    const formatter = this._developingProgramActionsColumnController.formatter;
    const progressBarValues = JSON.stringify({
      currentDevelopmentPoints: formatter.formatNumberLong(this.currentDevelopmentPoints),
      maxDevelopmentPoints: formatter.formatNumberLong(this.maxDevelopmentPoints),
    });

    return html`
      <sl-progress-bar value=${Math.round((this.currentDevelopmentPoints / this.maxDevelopmentPoints) * 100)}>
        <intl-message label="ui:mainframe:developingPrograms:progressBarLabel" value=${progressBarValues}>
          Progress
        </intl-message>
      </sl-progress-bar>

      <sl-icon-button
        name=${this.active ? 'play-fill' : 'pause-fill'}
        label=${t('mainframe.developingPrograms.developingProgramToggle', { ns: 'ui' })}
        @click=${this.handleToggleDevelopingProgram}
      >
      </sl-icon-button>

      <sl-icon-button
        id="delete-btn"
        name="x-lg"
        label=${t('mainframe.developingPrograms.developingProgramDelete', { ns: 'ui' })}
        @click=${this.handleDeleteDevelopingProgram}
      >
      </sl-icon-button>
    `;
  }

  private handleToggleDevelopingProgram = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._developingProgramActionsColumnController.toggleDevelopingProgram(
      this.programName as ProgramName,
      !this.active,
    );
  };

  private handleDeleteDevelopingProgram = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._developingProgramActionsColumnController.deleteDevelopingProgram(this.programName as ProgramName);
  };
}
