import { t } from 'i18next';
import { TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent } from '@shared/base-component';
import { GAME_STATE_ALERTS, PROGRAM_ALERTS } from '@shared/constants';
import { GameAlert } from '@shared/types';
import { AlertFilterDialogCloseEvent } from './events';
import { AlertFilterDialogController } from './controller';

@customElement('ca-alert-filter-dialog')
export class AlertFilterDialog extends BaseComponent<AlertFilterDialogController> {
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

  protected controller: AlertFilterDialogController;

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  constructor() {
    super();

    this.controller = new AlertFilterDialogController(this);
  }

  renderContent() {
    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${t('settings.alertFilter', { ns: 'ui' })}</h4>

        <div class="body">
          <p class="hint">${t('settings.alertFilterHint', { ns: 'ui' })}</p>

          <div class="events-container">
            ${repeat(GAME_STATE_ALERTS, (gameAlert) => gameAlert, this.renderGameAlertCheckbox)}
          </div>

          <sl-divider></sl-divider>

          <div class="events-container">${repeat(PROGRAM_ALERTS, (event) => event, this.renderGameAlertCheckbox)}</div>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          ${t('common.close', { ns: 'ui' })}
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
        ?checked=${this.controller.isAlertEnabled(gameAlert)}
        @sl-change=${this.handleToggleAlert}
      >
        ${t(`${gameAlert}.name`, { ns: 'alerts' })}
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

    this.controller.toggleAlertFilterEvent(target.value as GameAlert, target.checked);
  };
}
