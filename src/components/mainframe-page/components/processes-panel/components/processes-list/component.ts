import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramAlert } from '@shared/types';
import { ConfirmationAlertOpenEvent, ConfirmationAlertSubmitEvent } from '@components/shared/confirmation-alert/events';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';
import { ProgramName } from '@state/progam-factory/types';
import { SCREEN_WIDTH_POINTS } from '@shared/styles';
import { SortableElementMovedEvent } from '@components/shared/sortable-list/events/sortable-element-moved';
import { ProcessesListController } from './controller';

@customElement('ca-processes-list')
export class ProcessesList extends BaseComponent<ProcessesListController> {
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
      grid-template-rows: auto;
      gap: var(--sl-spacing-small);
      align-items: center;
      border-bottom: var(--ca-border);
      padding: var(--sl-spacing-small) 0;
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
        grid-template-columns: 3fr 1fr 2fr 6rem;
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

  protected controller: ProcessesListController;

  constructor() {
    super();

    this.controller = new ProcessesListController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmAllDeleteProcessesDialog);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmAllDeleteProcessesDialog);
  }

  renderContent() {
    const processesActive = this.checkSomeProcessesActive();

    const toggleProcessesIcon = processesActive ? 'play-fill' : 'pause-fill';
    const toggleProcessesLabel = processesActive ? 'disableAllProcesses' : 'enableAllProcesses';
    const toggleProcessesVariant = processesActive ? 'neutral' : 'default';

    const processes = this.controller.listProcesses();

    return html`
      <div class="header">
        <div class="header-column">${t('mainframe.program', { ns: 'ui' })}</div>
        <div class="header-column">${t('mainframe.cores', { ns: 'ui' })}</div>
        <div class="header-column"></div>
        <div class="buttons desktop">
          <sl-tooltip>
            <span slot="content"> ${t(`mainframe.processes.${toggleProcessesLabel}`, { ns: 'ui' })} </span>

            <sl-icon-button
              name=${toggleProcessesIcon}
              label=${t(`mainframe.processes.${toggleProcessesLabel}`, { ns: 'ui' })}
              @click=${this.handleToggleAllProcesses}
            >
            </sl-icon-button>
          </sl-tooltip>

          <sl-tooltip>
            <span slot="content"> ${t('mainframe.processes.allProcessesDelete', { ns: 'ui' })} </span>

            <sl-icon-button
              id="delete-btn"
              name="x-lg"
              label=${t('mainframe.processes.allProcessesDelete', { ns: 'ui' })}
              @click=${this.handleOpenDeleteAllProcessesDialog}
            >
            </sl-icon-button>
          </sl-tooltip>
        </div>

        <div class="buttons mobile">
          <sl-button variant=${toggleProcessesVariant} size="medium" @click=${this.handleToggleAllProcesses}>
            ${t(`mainframe.processes.${toggleProcessesLabel}`, { ns: 'ui' })}
          </sl-button>

          <sl-button variant="danger" size="medium" @click=${this.handleOpenDeleteAllProcessesDialog}>
            ${t('mainframe.processes.allProcessesDelete', { ns: 'ui' })}
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
        <td colspan="4">${t('mainframe.processes.emptyListNotification', { ns: 'ui' })}</td>
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
    return this.controller.listProcesses().some((process) => process.isActive);
  }

  private handleToggleAllProcesses = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const processesActive = this.checkSomeProcessesActive();

    this.controller.toggleAllProcesses(!processesActive);
  };

  private handleOpenDeleteAllProcessesDialog = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new ConfirmationAlertOpenEvent(ProgramAlert.deleteAllProcesses, {}));
  };

  private handleConfirmAllDeleteProcessesDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== ProgramAlert.deleteAllProcesses) {
      return;
    }

    this.controller.deleteAllProcesses();
  };

  private handleMoveProcess = (event: SortableElementMovedEvent) => {
    event.stopPropagation();
    event.preventDefault();

    this.controller.moveProcess(event.keyName as ProgramName, event.position);
  };
}
