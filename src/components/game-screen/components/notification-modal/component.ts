import { t } from 'i18next';
import { css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import type { INotification } from '@state/notifications-state/interfaces/notitification';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { BaseComponent } from '@shared/base-component';
import { FORCE_NOTIFICATION_TYPES } from '@shared/constants';
import { modalBodyScrollStyle, smallModalStyle } from '@shared/styles';
import { NotificationModalController } from './controller';
import { INotificationModal } from './interfaces';

@customElement('ca-notification-modal')
export class NotificationModal extends BaseComponent<NotificationModalController> implements INotificationModal {
  static styles = [
    smallModalStyle,
    modalBodyScrollStyle,
    css`
      sl-dialog::part(footer) {
        text-align: right;
      }

      p {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-large);
      }
    `,
  ];

  protected controller: NotificationModalController;

  @property({
    attribute: false,
  })
  notification?: INotification;

  private _notificationTypeToggleRef = createRef<SlCheckbox>();

  @state()
  private _notificationTypeToggled = true;

  constructor() {
    super();

    this.controller = new NotificationModalController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('popstate', this.handlePopState);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('popstate', this.handlePopState);
  }

  renderContent() {
    return html`
      <sl-dialog no-header ?open=${!!this.notification} @sl-request-close=${this.handleClose}>
        ${this.renderModalContent()}

        <sl-button slot="footer" size="medium" variant="primary" @click=${this.handleClose}>
          ${t('common.continue', { ns: 'ui' })}
        </sl-button>
      </sl-dialog>
    `;
  }

  private renderModalContent = () => {
    if (!this.notification) {
      return nothing;
    }

    const parameters = this.notification.parameters ?? {};
    const showToggle = !FORCE_NOTIFICATION_TYPES.has(this.notification.notificationType);

    return html`
      <p>${t(`${this.notification.notificationType}.message`, { ns: 'notifications', ...parameters })}</p>

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

  private handleClose = (event: Event) => {
    event.stopPropagation();

    window.history.back();
  };

  private handleToggleNotificationType = (event: Event) => {
    event.stopPropagation();

    if (this._notificationTypeToggleRef.value) {
      this._notificationTypeToggled = this._notificationTypeToggleRef.value.checked;
    }
  };

  private handlePopState = () => {
    if (this.notification) {
      this.controller.handleCloseModal(this.notification, this._notificationTypeToggled);
      this._notificationTypeToggled = true;
    }
  };
}
