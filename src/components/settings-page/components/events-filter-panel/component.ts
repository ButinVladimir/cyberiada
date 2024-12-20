import { html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';

@customElement('ca-events-filter-panel')
export class EventsFilterPanel extends BaseComponent {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--sl-spacing-large);
    }
  `;

  @state()
  private _isMessageFilterOpen = false;

  @state()
  private _isAlertFilterOpen = false;

  @state()
  private _isNotificationTypeFilterOpen = false;

  renderContent() {
    return html`
      <sl-button variant="default" size="medium" @click=${this.handleMessageFilterDialogOpen}>
        <sl-icon slot="prefix" name="chat-left-dots"></sl-icon>
        <intl-message label="ui:settings:messageFilter">Message filter</intl-message>
      </sl-button>

      <sl-button variant="default" size="medium" @click=${this.handleAlertFilterDialogOpen}>
        <sl-icon slot="prefix" name="question-circle"></sl-icon>
        <intl-message label="ui:settings:alertFilter">Alert filter</intl-message>
      </sl-button>

      <sl-button variant="default" size="medium" @click=${this.handleNotificationTypeFilterDialogOpen}>
        <sl-icon slot="prefix" name="exclamation-circle"></sl-icon>
        <intl-message label="ui:settings:notificationTypeFilter">Notification type filter</intl-message>
      </sl-button>

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

  private handleMessageFilterDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isMessageFilterOpen = true;
  };

  private handleMessageFilterDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isMessageFilterOpen = false;
  };

  private handleAlertFilterDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isAlertFilterOpen = true;
  };

  private handleAlertFilterDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isAlertFilterOpen = false;
  };

  private handleNotificationTypeFilterDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isNotificationTypeFilterOpen = true;
  };

  private handleNotificationTypeFilterDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isNotificationTypeFilterOpen = false;
  };
}
