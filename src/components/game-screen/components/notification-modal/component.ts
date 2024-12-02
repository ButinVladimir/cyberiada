import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent } from '@shared/base-component';
import { NotificationModalController } from './controller';

@customElement('ca-notification-modal')
export class NotificationModal extends BaseComponent<NotificationModalController> {
  static styles = css`
    sl-dialog::part(footer) {
      text-align: right;
    }

    p {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-2x-large);
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
    const parameters = notification.parameters ? JSON.stringify(notification.parameters) : '';

    return html`
      <sl-dialog no-header ?open=${isOpen} @sl-request-close=${this.handleClose}>
        <p>
          <intl-message label="notifications:${notification.notificationType}:message" value=${parameters}>
            Message
          </intl-message>
        </p>

        <sl-checkbox
          ref=${ref(this._notificationTypeToggleRef)}
          size="medium"
          name="notification-type"
          ?checked=${this._notificationTypeToggled}
          @sl-change=${this.handleToggleNotificationType}
        >
          <intl-message label="ui:settings:notificationTypeToggle"> Toggle notification type </intl-message>
        </sl-checkbox>

        <sl-button slot="footer" size="medium" variant="primary" @click=${this.handleClose}>
          <intl-message label="ui:common:continue"> Continue </intl-message>
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
