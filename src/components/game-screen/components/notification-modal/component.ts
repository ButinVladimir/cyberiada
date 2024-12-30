import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent } from '@shared/base-component';
import { FORCE_NOTIFICATION_TYPES } from '@shared/constants';
import { NotificationModalController } from './controller';

@customElement('ca-notification-modal')
export class NotificationModal extends BaseComponent<NotificationModalController> {
  static styles = css`
    sl-dialog::part(footer) {
      text-align: right;
    }

    p {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
    }
  `;

  protected controller: NotificationModalController;

  private _notificationTypeToggleRef = createRef<SlCheckbox>();

  @state()
  private _notificationTypeToggled = true;

  constructor() {
    super();

    this.controller = new NotificationModalController(this);
  }

  renderContent() {
    const isOpen = this.controller.hasUnreadNotifications();

    if (!isOpen) {
      return null;
    }

    const notification = this.controller.getUnreadNotification()!;
    const parameters = notification.parameters ?? {};
    const showToggle = !FORCE_NOTIFICATION_TYPES.has(notification.notificationType);

    return html`
      <sl-dialog no-header ?open=${isOpen} @sl-request-close=${this.handleClose}>
        <p>${t(`${notification.notificationType}.message`, { ns: 'notifications', ...parameters })}</p>

        ${showToggle
          ? html`
              <sl-checkbox
                ref=${ref(this._notificationTypeToggleRef)}
                size="medium"
                name="notification-type"
                ?checked=${this._notificationTypeToggled}
                @sl-change=${this.handleToggleNotificationType}
              >
                ${t('settings.notificationTypeToggle', { ns: 'ui' })}
              </sl-checkbox>
            `
          : null}

        <sl-button slot="footer" size="medium" variant="primary" @click=${this.handleClose}>
          ${t('common.continue', { ns: 'ui' })}
        </sl-button>
      </sl-dialog>
    `;
  }

  private handleClose = (event: Event) => {
    event.stopPropagation();

    if (this.controller.hasUnreadNotifications()) {
      const notification = this.controller.getUnreadNotification()!;

      this.controller.toggleNotificationType(notification.notificationType, this._notificationTypeToggled);
      this.controller.popUnreadNotification();

      this._notificationTypeToggled = true;
    }
  };

  private handleToggleNotificationType = (event: Event) => {
    event.stopPropagation();

    if (this._notificationTypeToggleRef.value) {
      this._notificationTypeToggled = this._notificationTypeToggleRef.value.checked;
    }
  };
}
