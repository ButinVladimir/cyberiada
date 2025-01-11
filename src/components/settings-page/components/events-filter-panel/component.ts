import { t } from 'i18next';
import { html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { SCREEN_WIDTH_POINTS } from '@shared/styles';

@customElement('ca-events-filter-panel')
export class EventsFilterPanel extends BaseComponent {
  static styles = css`
    div.buttons-list {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      flex-wrap: wrap;
      gap: var(--sl-spacing-large);
    }

    @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
      div.buttons-list {
        flex-direction: row;
        align-items: center;
      }
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
      <div class="buttons-list">
        <sl-button variant="default" size="medium" @click=${this.handleMessageFilterDialogOpen}>
          <sl-icon slot="prefix" name="chat-left-dots"></sl-icon>
          ${t('settings.messageFilter', { ns: 'ui' })}
        </sl-button>

        <sl-button variant="default" size="medium" @click=${this.handleAlertFilterDialogOpen}>
          <sl-icon slot="prefix" name="question-circle"></sl-icon>
          ${t('settings.alertFilter', { ns: 'ui' })}
        </sl-button>

        <sl-button variant="default" size="medium" @click=${this.handleNotificationTypeFilterDialogOpen}>
          <sl-icon slot="prefix" name="exclamation-circle"></sl-icon>
          ${t('settings.notificationTypeFilter', { ns: 'ui' })}
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
