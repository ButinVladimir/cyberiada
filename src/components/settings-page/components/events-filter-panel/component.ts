import { t } from 'i18next';
import { html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { MiscMenuItem } from '@shared/types';
import { IHistoryState } from '@shared/interfaces/history-state';
import { ISettingsEventsFilterHistoryState } from './interfaces';

@customElement('ca-events-filter-panel')
export class EventsFilterPanel extends BaseComponent {
  static styles = css`
    div.buttons-list {
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

    const state = { ...window.history.state, messageFilterOpen: true } as ISettingsEventsFilterHistoryState;
    window.history.pushState(state, MiscMenuItem.settings);
  };

  private handleMessageFilterDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    window.history.back();
  };

  private handleAlertFilterDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isAlertFilterOpen = true;

    const state = { ...window.history.state, alertFilterOpen: true } as ISettingsEventsFilterHistoryState;
    window.history.pushState(state, MiscMenuItem.settings);
  };

  private handleAlertFilterDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    window.history.back();
  };

  private handleNotificationTypeFilterDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isNotificationTypeFilterOpen = true;

    const state = { ...window.history.state, notificationTypeFilterOpen: true } as ISettingsEventsFilterHistoryState;
    window.history.pushState(state, MiscMenuItem.settings);
  };

  private handleNotificationTypeFilterDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    window.history.back();
  };

  private handlePopState = (event: PopStateEvent) => {
    if ((event.state as IHistoryState).selectedMenuItem === MiscMenuItem.settings) {
      const state = event.state as ISettingsEventsFilterHistoryState;

      this._isAlertFilterOpen = !!state.alertFilterOpen;
      this._isMessageFilterOpen = !!state.messageFilterOpen;
      this._isNotificationTypeFilterOpen = !!state.notificationTypeFilterOpen;
    }
  };
}
