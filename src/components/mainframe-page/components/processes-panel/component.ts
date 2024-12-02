import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ProcessesPanelController } from './controller';

@customElement('ca-mainframe-processes-panel')
export class MainframeHardwarePanel extends BaseComponent<ProcessesPanelController> {
  static styles = css`
    :host {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    p.hint {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    div.top-container {
      display: flex;
      align-items: center;
      gap: var(--sl-spacing-3x-large);
    }

    ca-processes-list {
      margin-top: var(--sl-spacing-large);
    }
  `;

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
      <p class="hint">
        <intl-message label="ui:mainframe:processes:processesHint"> Start process hint. </intl-message>
      </p>

      <div class="top-container">
        <sl-button variant="primary" size="medium" @click=${this.handleStartProcessDialogOpen}>
          <intl-message label="ui:mainframe:processes:startProcess"> Purchase a program </intl-message>
        </sl-button>
        <div>
          <intl-message
            label="ui:mainframe:processes:availableCores"
            value=${formatter.formatNumberDecimal(this.controller.availableCores)}
          >
            Available cores
          </intl-message>
        </div>
        <div>
          <intl-message
            label="ui:mainframe:processes:availableRam"
            value=${formatter.formatNumberDecimal(this.controller.availableRam)}
          >
            Available ram
          </intl-message>
        </div>
      </div>

      <ca-start-process-dialog
        ?is-open=${this._isStartProcessDialogOpen}
        @start-process-dialog-close=${this.handleStartProcessDialogClose}
      >
      </ca-start-process-dialog>

      <ca-processes-list></ca-processes-list>
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
