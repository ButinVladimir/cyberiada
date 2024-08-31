import { t } from 'i18next';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ProgramName } from '@state/progam-factory/types';
import { ProcessActionsColumnController } from './controller';

@customElement('ca-process-actions-column')
export class ProcessActionsColumn extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: var(--sl-spacing-small);
      font-size: var(--sl-font-size-large);
    }

    div.progress-gap,
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
    attribute: 'current-completion-points',
    type: Number,
  })
  currentCompletionPoints = 0;

  @property({
    attribute: 'max-completion-points',
    type: Number,
  })
  maxCompletionPoints = 0;

  @property({
    attribute: 'active',
    type: Boolean,
  })
  active = true;

  @property({
    attribute: 'autoscalable',
    type: Boolean,
  })
  autoscalable = false;

  private _processActionsColumnController: ProcessActionsColumnController;

  constructor() {
    super();

    this._processActionsColumnController = new ProcessActionsColumnController(this);
  }

  render() {
    const formatter = this._processActionsColumnController.formatter;

    const progressBarValues = JSON.stringify({
      currentCompletionPoints: formatter.formatNumberLong(this.currentCompletionPoints),
      maxCompletionPoints: formatter.formatNumberLong(this.maxCompletionPoints),
    });

    const progressBar = this.autoscalable
      ? html`<div class="progress-gap"></div>`
      : html` <sl-progress-bar value=${Math.round((this.currentCompletionPoints / this.maxCompletionPoints) * 100)}>
          <intl-message label="ui:mainframe:processes:progressBarLabel" value=${progressBarValues}>
            Progress
          </intl-message>
        </sl-progress-bar>`;

    return html`
      ${progressBar}

      <sl-icon-button
        name=${this.active ? 'play-fill' : 'pause-fill'}
        label=${t('mainframe.processes.processToggle', { ns: 'ui' })}
        @click=${this.handleToggleProcess}
      >
      </sl-icon-button>

      <sl-icon-button
        id="delete-btn"
        name="x-lg"
        label=${t('mainframe.processes.processDelete', { ns: 'ui' })}
        @click=${this.handleDeleteProcess}
      >
      </sl-icon-button>
    `;
  }

  private handleToggleProcess = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._processActionsColumnController.toggleProcess(this.programName as ProgramName, !this.active);
  };

  private handleDeleteProcess = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._processActionsColumnController.deleteProcess(this.programName as ProgramName);
  };
}
