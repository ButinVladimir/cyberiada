import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { SCREEN_WIDTH_POINTS } from '@shared/styles';
import { ProcessesPanelController } from './controller';

@customElement('ca-mainframe-processes-panel')
export class MainframeProcessesPanel extends BaseComponent<ProcessesPanelController> {
  static styles = [
    hintStyle,
    css`
      :host {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
      }

      p.hint {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-large);
      }

      div.top-container {
        display: grid;
        grid-template-areas:
          'ram'
          'cores'
          'start-process';
        gap: var(--sl-spacing-medium);
      }

      .start-process {
        grid-area: start-process;
      }

      .cores {
        grid-area: cores;
      }

      .ram {
        grid-area: ram;
      }

      ca-processes-list {
        margin-top: var(--sl-spacing-large);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        div.top-container {
          grid-template-areas: 'start-process ram cores';
          align-items: center;
          gap: var(--sl-spacing-3x-large);
        }
      }
    `,
  ];

  protected controller: ProcessesPanelController;

  @state()
  private _isStartProcessDialogOpen = false;

  constructor() {
    super();

    this.controller = new ProcessesPanelController(this);
  }

  render() {
    const formatter = this.controller.formatter;

    return html`
      <p class="hint">${t('mainframe.processes.processesHint', { ns: 'ui' })}</p>

      <div class="top-container">
        <sl-button class="start-process" variant="primary" size="medium" @click=${this.handleStartProcessDialogOpen}>
          ${t('mainframe.processes.startProcess', { ns: 'ui' })}
        </sl-button>

        <div class="ram">
          ${t('mainframe.processes.availableRam', {
            ns: 'ui',
            ram: formatter.formatNumberDecimal(this.controller.availableRam),
            maxRam: formatter.formatNumberDecimal(this.controller.maxRam),
          })}
        </div>

        <div class="cores">
          ${t('mainframe.processes.availableCores', {
            ns: 'ui',
            cores: formatter.formatNumberDecimal(this.controller.availableCores),
            maxCores: formatter.formatNumberDecimal(this.controller.maxCores),
          })}
        </div>
      </div>

      <ca-processes-list></ca-processes-list>

      <ca-start-process-dialog
        ?is-open=${this._isStartProcessDialogOpen}
        @start-process-dialog-close=${this.handleStartProcessDialogClose}
      >
      </ca-start-process-dialog>
    `;
  }

  private handleStartProcessDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isStartProcessDialogOpen = true;
  };

  private handleStartProcessDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isStartProcessDialogOpen = false;
  };
}
