import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { GAME_STATE_ALERTS, PROGRAM_ALERTS } from '@shared/constants';
import { GameAlert } from '@shared/types';
import { AlertFilterDialogCloseEvent } from './events';
import { AlertFilterDialogController } from './controller';

@customElement('ca-alert-filter-dialog')
export class AlertFilterDialog extends LitElement {
  static styles = css`
    sl-dialog {
      --width: 50rem;
    }

    sl-dialog::part(body) {
      padding-top: 0;
      padding-bottom: 0;
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin: 0;
    }

    div.body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    p.hint {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-small);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    div.events-container {
      display: grid;
      column-gap: var(--sl-spacing-3x-small);
      row-gap: var(--sl-spacing-3x-small);
      grid-template-columns: repeat(2, minmax(0, 30em));
      grid-auto-rows: auto;
    }

    sl-divider {
      --spacing: var(--sl-spacing-medium);
    }
  `;

  private _alertFilterDialogController: AlertFilterDialogController;

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  constructor() {
    super();

    this._alertFilterDialogController = new AlertFilterDialogController(this);
  }

  render() {
    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">
          <intl-message label="ui:settings:alertFilter"> Alert filter </intl-message>
        </h4>

        <div class="body">
          <p class="hint">
            <intl-message label="ui:settings:alertFilterHint">
              Enable alerts in filter to make them visible when event happens.
            </intl-message>
          </p>

          <div class="events-container">
            ${repeat(GAME_STATE_ALERTS, (gameAlert) => gameAlert, this.renderGameAlertCheckbox)}
          </div>

          <sl-divider></sl-divider>

          <div class="events-container">${repeat(PROGRAM_ALERTS, (event) => event, this.renderGameAlertCheckbox)}</div>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:close"> Close </intl-message>
        </sl-button>
      </sl-dialog>
    `;
  }

  private renderGameAlertCheckbox = (gameAlert: GameAlert): TemplateResult => {
    return html`
      <sl-checkbox
        size="medium"
        name="event"
        value=${gameAlert}
        ?checked=${this._alertFilterDialogController.isGameAlertEnabled(gameAlert)}
        @sl-change=${this.handleToggleAlert}
      >
        <intl-message label=${`alerts:${gameAlert}:name`}> Alert </intl-message>
      </sl-checkbox>
    `;
  };

  private handleClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new AlertFilterDialogCloseEvent());
  };

  private handleToggleAlert = (event: Event) => {
    const target = event.target as SlCheckbox;

    this._alertFilterDialogController.toggleMessageFilterEvent(target.value as GameAlert, target.checked);
  };
}
