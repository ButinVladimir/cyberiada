import { css, html, nothing } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent } from '@shared/base-component';
import { FORCE_NOTIFICATION_TYPES } from '@shared/constants';
import { modalBodyScrollStyle, smallModalStyle } from '@shared/styles';
import { NotificationModalController } from './controller';

@localized()
@customElement('ca-notification-modal')
export class NotificationModal extends BaseComponent<NotificationModalController> {
  static styles = [
    smallModalStyle,
    modalBodyScrollStyle,
    css`
      sl-dialog::part(footer) {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: var(--sl-spacing-small);
      }

      p {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-large);
      }
    `,
  ];

  protected controller: NotificationModalController;

  private _notificationTypeToggleRef = createRef<SlCheckbox>();

  @state()
  private _notificationTypeToggled = true;

  constructor() {
    super();

    this.controller = new NotificationModalController(this);
  }

  render() {
    const hasNotifications = this.controller.hasUnreadNotifications();
    const hasNextNotification = this.controller.hasNextNotification();

    return html`
      <sl-dialog no-header ?open=${hasNotifications} @sl-request-close=${this.handleCloseCurrentNotification}>
        ${this.renderModalContent()}

        <sl-button
          slot="footer"
          ?disabled=${!hasNextNotification}
          size="medium"
          variant="primary"
          @click=${this.handleCloseCurrentNotification}
        >
          ${msg('Read next notification')}
        </sl-button>

        <sl-button slot="footer" size="medium" variant="danger" @click=${this.handleCloseAllNotifications}>
          ${msg('Close all notifications')}
        </sl-button>
      </sl-dialog>
    `;
  }

  private renderModalContent = () => {
    const notification = this.controller.getUnreadNotification();

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

  private handleCloseCurrentNotification = () => {
    this.closeCurrentNotification();
  };

  private handleCloseAllNotifications = () => {
    this.closeCurrentNotification();

    this.controller.clearNotifications();
  };

  private handleToggleNotificationType = () => {
    if (this._notificationTypeToggleRef.value) {
      this._notificationTypeToggled = this._notificationTypeToggleRef.value.checked;
    }
  };

  private closeCurrentNotification = () => {
    if (this.controller.hasUnreadNotifications()) {
      this.controller.popNotification(this._notificationTypeToggled);
      this._notificationTypeToggled = true;
    }
  };
}
