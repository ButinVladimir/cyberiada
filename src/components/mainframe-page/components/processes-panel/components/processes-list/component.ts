import { css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { IProcess, ProgramName } from '@state/mainframe-state';
import { BaseComponent, ProgramAlert, DELETE_VALUES, ENTITY_ACTIVE_VALUES, SCREEN_WIDTH_POINTS } from '@shared/index';
import { SortableElementMovedEvent } from '@components/shared/sortable-list/events/sortable-element-moved';
import { ProcessesListController } from './controller';

@localized()
@customElement('ca-processes-list')
export class ProcessesList extends BaseComponent {
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

    ca-sortable-list ca-processes-list-item {
      border-bottom: var(--ca-border);
    }

    ca-sortable-list ca-processes-list-item:nth-child(2n + 1) {
      background-color: var(--ca-table-row-odd-color);
    }

    ca-sortable-list ca-processes-list-item.dragged {
      background-color: var(--ca-dragged-color);
    }

    #delete-btn::part(base):hover {
      color: var(--sl-color-danger-600);
    }

    @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
      .header {
        grid-template-columns: 3fr 1fr 2fr auto;
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

  private _controller: ProcessesListController;

  constructor() {
    super();

    this._controller = new ProcessesListController(this);
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
    const processesActive = this.checkSomeProcessesActive();

    const toggleProcessesIcon = processesActive ? ENTITY_ACTIVE_VALUES.icon.active : ENTITY_ACTIVE_VALUES.icon.stopped;
    const toggleProcessesLabel = processesActive ? msg('Disable all processes') : msg('Enable all processes');
    const toggleProcessesVariant = processesActive
      ? ENTITY_ACTIVE_VALUES.buttonVariant.active
      : ENTITY_ACTIVE_VALUES.buttonVariant.stopped;

    const deleteAllProcessLabel = msg('Delete all processes');

    const processes = this._controller.listProcesses();

    return html`
      <div class="header">
        <div class="header-column">${msg('Program')}</div>
        <div class="header-column">${msg('Cores')}</div>
        <div class="header-column">${msg('Progress')}</div>
        <div class="buttons desktop">
          <sl-tooltip>
            <span slot="content"> ${toggleProcessesLabel} </span>

            <sl-icon-button
              name=${toggleProcessesIcon}
              label=${toggleProcessesLabel}
              @click=${this.handleToggleAllProcesses}
            >
            </sl-icon-button>
          </sl-tooltip>

          <sl-tooltip>
            <span slot="content"> ${deleteAllProcessLabel} </span>

            <sl-icon-button
              id="delete-btn"
              name=${DELETE_VALUES.icon}
              label=${deleteAllProcessLabel}
              @click=${this.handleOpenDeleteAllProcessesDialog}
            >
            </sl-icon-button>
          </sl-tooltip>
        </div>

        <div class="buttons mobile">
          <sl-button variant=${toggleProcessesVariant} size="medium" @click=${this.handleToggleAllProcesses}>
            <sl-icon slot="prefix" name=${toggleProcessesIcon}></sl-icon>

            ${toggleProcessesLabel}
          </sl-button>

          <sl-button
            variant=${DELETE_VALUES.buttonVariant}
            size="medium"
            @click=${this.handleOpenDeleteAllProcessesDialog}
          >
            <sl-icon slot="prefix" name=${DELETE_VALUES.icon}> </sl-icon>
            ${deleteAllProcessLabel}
          </sl-button>
        </div>
      </div>

      ${processes.length > 0
        ? html`
            <ca-sortable-list @sortable-element-moved=${this.handleMoveProcess}>
              ${repeat(processes, (process) => process.program.name, this.renderProcess)}
            </ca-sortable-list>
          `
        : this.renderEmptyListNotification()}
    `;
  }

  private renderEmptyListNotification = () => {
    return html`
      <div class="notification">
        <td colspan="4">${msg("You don't have any processes")}</td>
      </div>
    `;
  };

  private renderProcess = (process: IProcess) => {
    return html`
      <ca-processes-list-item program-name=${process.program.name} data-drag-id=${process.program.name}>
      </ca-processes-list-item>
    `;
  };

  private checkSomeProcessesActive(): boolean {
    return this._controller.listProcesses().some((process) => process.isActive);
  }

  private handleToggleAllProcesses = () => {
    const processesActive = this.checkSomeProcessesActive();

    this._controller.toggleAllProcesses(!processesActive);
  };

  private handleOpenDeleteAllProcessesDialog = () => {
    this.dispatchEvent(
      new ConfirmationAlertOpenEvent(
        ProgramAlert.deleteAllProcesses,
        msg('Are you sure want to delete all processes? Their progress will be lost.'),
      ),
    );
  };

  private handleConfirmDeleteAllProcessesDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== ProgramAlert.deleteAllProcesses) {
      return;
    }

    this._controller.deleteAllProcesses();
  };

  private handleMoveProcess = (event: SortableElementMovedEvent) => {
    this._controller.moveProcess(event.keyName as ProgramName, event.position);
  };
}
