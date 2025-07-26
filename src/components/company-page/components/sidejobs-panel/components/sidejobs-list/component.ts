import { html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent, DELETE_VALUES, SidejobAlert } from '@shared/index';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { ISidejob } from '@state/company-state';
import { SidejobsListController } from './controller';
import styles from './styles';

@localized()
@customElement('ca-sidejobs-list')
export class SidejobsList extends BaseComponent {
  static styles = styles;

  protected hasMobileRender = true;

  private _controller: SidejobsListController;

  constructor() {
    super();

    this._controller = new SidejobsListController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteAllProcessesDialog);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteAllProcessesDialog);
  }

  protected renderDesktop() {
    const cancelAllSidejobs = msg('Cancel all sidejobs');

    return html`
      <div class="header desktop">
        <div class="header-column">${msg('Sidejob')}</div>
        <div class="header-column">${msg('District')}</div>
        <div class="header-column">${msg('Assigned clone')}</div>
        <div class="buttons">
          <sl-tooltip>
            <span slot="content"> ${cancelAllSidejobs} </span>

            <sl-icon-button
              id="delete-btn"
              name=${DELETE_VALUES.icon}
              label=${cancelAllSidejobs}
              @click=${this.handleOpenDeleteAllProcessesDialog}
            >
            </sl-icon-button>
          </sl-tooltip>
        </div>
      </div>

      ${this.renderSidejobsList()}
    `;
  }

  protected renderMobile() {
    return html`
      <div class="header mobile">
        <div class="buttons">
          <sl-button
            variant=${DELETE_VALUES.buttonVariant}
            size="medium"
            @click=${this.handleOpenDeleteAllProcessesDialog}
          >
            <sl-icon slot="prefix" name=${DELETE_VALUES.icon}> </sl-icon>
            ${msg('Cancel all sidejobs')}
          </sl-button>
        </div>
      </div>

      ${this.renderSidejobsList()}
    `;
  }

  private renderSidejobsList = () => {
    const sidejobs = this._controller.listSidejobs();

    return sidejobs.length > 0
      ? html`${repeat(sidejobs, (sidejob) => sidejob.id, this.renderSidejob)}`
      : this.renderEmptyListNotification();
  };

  private renderEmptyListNotification = () => {
    return html` <div class="notification">${msg("You don't have any assigned sidejobs")}</div> `;
  };

  private renderSidejob = (sidejob: ISidejob) => {
    return html`<ca-sidejobs-list-item sidejob-id=${sidejob.id}></ca-sidejobs-list-item>`;
  };

  private handleOpenDeleteAllProcessesDialog = () => {
    this.dispatchEvent(
      new ConfirmationAlertOpenEvent(
        SidejobAlert.cancelAllSidejobs,
        msg('Are you sure want to cancel all sidejobs? Their assigned clones will stop performing them.'),
      ),
    );
  };

  private handleConfirmDeleteAllProcessesDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== SidejobAlert.cancelAllSidejobs) {
      return;
    }

    this._controller.cancelAllSidejobs();
  };
}
