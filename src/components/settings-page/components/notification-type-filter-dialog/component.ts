import { TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent } from '@shared/base-component';
import { NOTIFICATION_TYPES } from '@shared/constants';
import { NotificationType } from '@shared/types';
import { NotificationTypeFilterDialogCloseEvent } from './events';
import { NotificationTypeFilterDialogController } from './controller';

@customElement('ca-notification-type-filter-dialog')
export class NotificationTypeFilterDialog extends BaseComponent<NotificationTypeFilterDialogController> {
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
        <h4 slot="label" class="title">
          <intl-message label="ui:settings:notificationTypeFilter"> Notification type filter </intl-message>
        </h4>

        <div class="body">
          <p class="hint">
            <intl-message label="ui:settings:notificationTypeFilterHint">
              Enable notification types in filter to see notifications for those events.
            </intl-message>
          </p>

          <div class="events-container">
            ${repeat(NOTIFICATION_TYPES, (gameAlert) => gameAlert, this.renderGameAlertCheckbox)}
          </div>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:close"> Close </intl-message>
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
        <intl-message label=${`notifications:${notificationType}:name`}> Alert </intl-message>
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
