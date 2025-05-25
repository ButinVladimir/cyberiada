import { css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent, DELETE_VALUES, SCREEN_WIDTH_POINTS, SidejobAlert } from '@shared/index';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { SidejobsListController } from './controller';
import { ISidejob } from '@state/company-state';

@localized()
@customElement('ca-sidejobs-list')
export class SidejobsList extends BaseComponent {
  static styles = css`
    :host {
      width: 100%;
      align-self: stretch;
      display: block;
      border-top: var(--ca-border);
    }

    .header {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: repeat(auto);
      gap: var(--sl-spacing-small);
      align-items: center;
      border-bottom: var(--ca-border);
      padding: var(--sl-spacing-medium) 0;
    }

    .header-column {
      display: none;
      font-weight: var(--sl-font-weight-bold);
    }

    .buttons {
      align-items: center;
      flex-direction: row;
      gap: var(--sl-spacing-small);
    }

    .buttons.desktop {
      display: none;
      justify-content: flex-end;
      font-size: var(--sl-font-size-large);
    }

    .buttons.mobile {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    .notification {
      padding: var(--sl-spacing-3x-large);
      text-align: center;
      border-bottom: var(--ca-border);
    }

    ca-sortable-list {
      width: 100%;
    }

    ca-sortable-list::part(list) {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
    }

    ca-sidejobs-list-item {
      border-bottom: var(--ca-border);
    }

    ca-sidejobs-list-item:nth-child(2n) {
      background-color: var(--ca-table-row-odd-color);
    }

    @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
      .header {
        grid-template-columns: 2fr 1fr 1fr auto;
        grid-template-rows: auto;
        padding: var(--sl-spacing-small);
      }

      .header-column {
        display: block;
      }

      .buttons.desktop {
        display: flex;
      }

      .buttons.mobile {
        display: none;
      }
    }
  `;

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

  render() {
    const sidejobs = this._controller.listSidejobs();

    const cancelAllSidejobs = msg('Cancel all sidejobs');

    return html`
      <div class="header">
        <div class="header-column">${msg('Sidejob')}</div>
        <div class="header-column">${msg('District')}</div>
        <div class="header-column">${msg('Assigned clone')}</div>
        <div class="buttons desktop">
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

        <div class="buttons mobile">
          <sl-button
            variant=${DELETE_VALUES.buttonVariant}
            size="medium"
            @click=${this.handleOpenDeleteAllProcessesDialog}
          >
            <sl-icon slot="prefix" name=${DELETE_VALUES.icon}> </sl-icon>
            ${cancelAllSidejobs}
          </sl-button>
        </div>
      </div>

      ${sidejobs.length > 0
        ? repeat(sidejobs, (sidejob) => sidejob.id, this.renderSidejob)
        : this.renderEmptyListNotification()}
    `;
  }

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
