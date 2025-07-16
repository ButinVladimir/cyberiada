import { html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import styles from './styles';

@localized()
@customElement('ca-events-filter-panel')
export class EventsFilterPanel extends BaseComponent {
  static styles = styles;

  @state()
  private _isMessageFilterOpen = false;

  @state()
  private _isAlertFilterOpen = false;

  @state()
  private _isNotificationTypeFilterOpen = false;

  protected renderDesktop() {
    return html`
      <div class="buttons-list">
        <sl-button variant="default" size="medium" @click=${this.handleMessageFilterDialogOpen}>
          <sl-icon slot="prefix" name="chat-left-dots"></sl-icon>
          ${msg('Message filter')}
        </sl-button>

        <sl-button variant="default" size="medium" @click=${this.handleAlertFilterDialogOpen}>
          <sl-icon slot="prefix" name="question-circle"></sl-icon>
          ${msg('Alert filter')}
        </sl-button>

        <sl-button variant="default" size="medium" @click=${this.handleNotificationTypeFilterDialogOpen}>
          <sl-icon slot="prefix" name="exclamation-circle"></sl-icon>
          ${msg('Notification type filter')}
        </sl-button>
      </div>

      <ca-message-filter-dialog
        ?is-open=${this._isMessageFilterOpen}
        @message-filter-dialog-close=${this.handleMessageFilterDialogClose}
      >
      </ca-message-filter-dialog>

      <ca-alert-filter-dialog
        ?is-open=${this._isAlertFilterOpen}
        @alert-filter-dialog-close=${this.handleAlertFilterDialogClose}
      >
      </ca-alert-filter-dialog>

      <ca-notification-type-filter-dialog
        ?is-open=${this._isNotificationTypeFilterOpen}
        @notification-type-filter-dialog-close=${this.handleNotificationTypeFilterDialogClose}
      >
      </ca-notification-type-filter-dialog>
    `;
  }

  private handleMessageFilterDialogOpen = () => {
    this._isMessageFilterOpen = true;
  };

  private handleMessageFilterDialogClose = () => {
    this._isMessageFilterOpen = false;
  };

  private handleAlertFilterDialogOpen = () => {
    this._isAlertFilterOpen = true;
  };

  private handleAlertFilterDialogClose = () => {
    this._isAlertFilterOpen = false;
  };

  private handleNotificationTypeFilterDialogOpen = () => {
    this._isNotificationTypeFilterOpen = true;
  };

  private handleNotificationTypeFilterDialogClose = () => {
    this._isNotificationTypeFilterOpen = false;
  };
}
