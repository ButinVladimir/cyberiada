import { t } from 'i18next';
import { css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent } from '@shared/base-component';
import { FORCE_NOTIFICATION_TYPES } from '@shared/constants';
import { modalBodyScrollStyle, smallModalStyle } from '@shared/styles';
import { NotificationModalController } from './controller';

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
          ${t('notifications.readNextNotification', { ns: 'ui' })}
        </sl-button>

        <sl-button slot="footer" size="medium" variant="danger" @click=${this.handleCloseAllNotifications}>
          ${t('notifications.closeAllNotifications', { ns: 'ui' })}
        </sl-button>
      </sl-dialog>
    `;
  }

  private renderModalContent = () => {
    const notification = this.controller.getUnreadNotification();

    if (!notification) {
      return nothing;
    }

    const parameters = notification.parameters ?? {};
    const showToggle = !FORCE_NOTIFICATION_TYPES.has(notification.notificationType);

    return html`
      <p>${t(`${notification.notificationType}.message`, { ns: 'notifications', ...parameters })}</p>

      ${showToggle
        ? html`
            <sl-checkbox
              ref=${ref(this._notificationTypeToggleRef)}
              size="small"
              name="notification-type"
              ?checked=${this._notificationTypeToggled}
              @sl-change=${this.handleToggleNotificationType}
            >
              ${t('settings.notificationTypeToggle', { ns: 'ui' })}
            </sl-checkbox>
          `
        : nothing}
    `;
  };

  private handleCloseCurrentNotification = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.closeCurrentNotification();
  };

  private handleCloseAllNotifications = (event: Event) => {
    event.stopPropagation();

    this.closeCurrentNotification();

    this.controller.clearNotifications();
  };

  private handleToggleNotificationType = (event: Event) => {
    event.stopPropagation();

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
