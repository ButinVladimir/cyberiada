import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { ProcessesPanelController } from './controller';

@customElement('ca-mainframe-processes-panel')
export class MainframeHardwarePanel extends BaseComponent<ProcessesPanelController> {
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
        display: flex;
        align-items: center;
        gap: var(--sl-spacing-3x-large);
      }

      ca-processes-list {
        margin-top: var(--sl-spacing-large);
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

  renderContent() {
    const formatter = this.controller.formatter;

    return html`
      <p class="hint">${t('mainframe.processes.processesHint', { ns: 'ui' })}</p>

      <div class="top-container">
        <sl-button variant="primary" size="medium" @click=${this.handleStartProcessDialogOpen}>
          ${t('mainframe.processes.startProcess', { ns: 'ui' })}
        </sl-button>
        <div>
          ${t('mainframe.processes.availableCores', {
            ns: 'ui',
            cores: formatter.formatNumberDecimal(this.controller.availableCores),
          })}
        </div>
        <div>
          ${t('mainframe.processes.availableRam', {
            ns: 'ui',
            ram: formatter.formatNumberDecimal(this.controller.availableRam),
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
