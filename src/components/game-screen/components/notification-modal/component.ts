import { html, nothing } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent, FORCE_NOTIFICATION_TYPES } from '@shared/index';
import { NotificationModalController } from './controller';
import styles from './styles';

@localized()
@customElement('ca-notification-modal')
export class NotificationModal extends BaseComponent {
  static styles = styles;

  private _controller: NotificationModalController;

  private _notificationTypeToggleRef = createRef<SlCheckbox>();

  @state()
  private _notificationTypeToggled = true;

  constructor() {
    super();

    this._controller = new NotificationModalController(this);
  }

  protected renderDesktop() {
    const hasNotifications = this._controller.hasUnreadNotifications();
    const hasNextNotification = this._controller.hasNextNotification();

    return html`
      <form id="notification-modal" @submit=${this.handleSubmit}>
        <sl-dialog no-header ?open=${hasNotifications} @sl-request-close=${this.handleCloseAllNotifications}>
          ${this.renderModalContent()}

          <sl-button slot="footer" ?disabled=${!hasNextNotification} size="medium" variant="primary" type="submit">
            ${msg('Read next notification')}
          </sl-button>

          <sl-button slot="footer" size="medium" variant="danger" @click=${this.handleCloseAllNotifications}>
            ${msg('Close all notifications')}
          </sl-button>
        </sl-dialog>
      </form>
    `;
  }

  private renderModalContent = () => {
    const notification = this._controller.getUnreadNotification();

    if (!notification) {
      return nothing;
    }

    const showToggle = !FORCE_NOTIFICATION_TYPES.has(notification.notificationType);

    return html`
      <p>${notification.message}</p>

      ${showToggle
        ? html`
            <sl-checkbox
              ref=${ref(this._notificationTypeToggleRef)}
              size="small"
              name="notification-type"
              ?checked=${this._notificationTypeToggled}
              @sl-change=${this.handleToggleNotificationType}
            >
              ${msg('Show notifications like this in the future')}
            </sl-checkbox>
          `
        : nothing}
    `;
  };

  private handleSubmit = (event: Event) => {
    event.preventDefault();

    this.closeCurrentNotification();
  };

  private handleCloseAllNotifications = () => {
    this.closeCurrentNotification();

    this._controller.clearNotifications();
  };

  private handleToggleNotificationType = () => {
    if (this._notificationTypeToggleRef.value) {
      this._notificationTypeToggled = this._notificationTypeToggleRef.value.checked;
    }
  };

  private closeCurrentNotification = () => {
    if (this._controller.hasUnreadNotifications()) {
      this._controller.popNotification(this._notificationTypeToggled);
      this._notificationTypeToggled = true;
    }
  };
}
