import { t } from 'i18next';
import { TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent } from '@shared/base-component';
import { NOTIFICATION_TYPES } from '@shared/constants';
import { NotificationType } from '@shared/types';
import { hintStyle } from '@shared/styles';
import { NotificationTypeFilterDialogCloseEvent } from './events';
import { NotificationTypeFilterDialogController } from './controller';

@customElement('ca-notification-type-filter-dialog')
export class NotificationTypeFilterDialog extends BaseComponent<NotificationTypeFilterDialogController> {
  static styles = [
    hintStyle,
    css`
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
    `,
  ];

  protected controller: NotificationTypeFilterDialogController;

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  constructor() {
    super();

    this.controller = new NotificationTypeFilterDialogController(this);
  }

  renderContent() {
    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${t('settings.notificationTypeFilter', { ns: 'ui' })}</h4>

        <div class="body">
          <p class="hint">${t('settings.notificationTypeFilterHint', { ns: 'ui' })}</p>

          <div class="events-container">
            ${repeat(NOTIFICATION_TYPES, (gameAlert) => gameAlert, this.renderGameAlertCheckbox)}
          </div>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          ${t('common.close', { ns: 'ui' })}
        </sl-button>
      </sl-dialog>
    `;
  }

  private renderGameAlertCheckbox = (notificationType: NotificationType): TemplateResult => {
    return html`
      <sl-checkbox
        size="medium"
        name="event"
        value=${notificationType}
        ?checked=${this.controller.isNotificationTypeEnabled(notificationType)}
        @sl-change=${this.handleToggleAlert}
      >
        ${t(`${notificationType}.name`, { ns: 'notifications' })}
      </sl-checkbox>
    `;
  };

  private handleClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new NotificationTypeFilterDialogCloseEvent());
  };

  private handleToggleAlert = (event: Event) => {
    const target = event.target as SlCheckbox;

    this.controller.toggleNotificationTypeFilter(target.value as NotificationType, target.checked);
  };
}
