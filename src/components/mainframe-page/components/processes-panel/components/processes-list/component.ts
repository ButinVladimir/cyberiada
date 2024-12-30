import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramAlert } from '@shared/types';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@/components/shared/confirmation-alert/events';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';
import { ProgramName } from '@state/progam-factory/types';
import { moveElementInArray } from '@shared/helpers';
import { EMPTY_IMAGE } from '@shared/constants';
import { ProcessesListController } from './controller';
import { TABLE_ROW_HEIGHT } from './constants';

@customElement('ca-processes-list')
export class ProcessesList extends BaseComponent<ProcessesListController> {
  static styles = css`
    :host {
      width: 100%;
      align-self: stretch;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }

    th {
      font-weight: var(--sl-font-weight-bold);
    }

    th.program,
    td.program {
      width: 32%;
    }

    th.cores,
    td.cores {
      width: 17%;
    }

    thead th {
      font-weight: var(--ca-table-header-font-weight);
      border-top: var(--ca-border);
      border-bottom: var(--ca-border);
      text-align: left;
      padding: var(--sl-spacing-small);
    }

    tr.notification td {
      padding: var(--sl-spacing-3x-large);
      text-align: center;
      border-bottom: var(--ca-border);
    }

    tbody ca-processes-list-item:nth-child(2n + 1) {
      background-color: var(--ca-table-row-odd-color);
    }

    tbody ca-processes-list-item {
      height: ${TABLE_ROW_HEIGHT}px;
    }

    tbody ca-processes-list-item.dragged {
      background-color: var(--ca-dragged-color);
    }

    div.buttons-container {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: row;
      gap: var(--sl-spacing-small);
      font-size: var(--sl-font-size-large);
    }
  `;

  protected controller: ProcessesListController;

  private _tbodyRef = createRef<HTMLTableSectionElement>();

  @state()
  private _draggedItemName: ProgramName | undefined;

  @state()
  private _draggedItemPosition: number | undefined;

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

    return html`
      <table>
        <thead>
          <th class="program">${t('mainframe.program', { ns: 'ui' })}</th>
          <th class="cores">${t('mainframe.cores', { ns: 'ui' })}</th>
          <th class="progress">
            <div class="buttons-container">
              <sl-tooltip>
                <span slot="content"> ${t('mainframe.processes.allProcessesToggle', { ns: 'ui' })} </span>

                <sl-icon-button
                  name=${processesActive ? 'play-fill' : 'pause-fill'}
                  label=${t('mainframe.processes.allProcessesToggle', { ns: 'ui' })}
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
          </th>
        </thead>

        <tbody ${ref(this._tbodyRef)} @dragover=${this.handleDragOver}>
          ${this.renderList()}
        </tbody>
      </table>
    `;
  }

  private renderList = () => {
    let processes = this.controller.listProcesses();

    if (processes.length === 0) {
      return this.renderEmptyListNotification();
    }

    if (this._draggedItemName && this._draggedItemPosition !== undefined) {
      const oldPosition = processes.findIndex((process) => process.program.name === this._draggedItemName);

      const reorderedProcesses = [...processes];
      moveElementInArray(reorderedProcesses, oldPosition, this._draggedItemPosition);

      processes = reorderedProcesses;
    }

    return repeat(processes, (programName) => programName, this.renderListItem);
  };

  private renderEmptyListNotification = () => {
    return html`
      <tr class="notification">
        <td colspan="4">${t('mainframe.processes.emptyListNotification', { ns: 'ui' })}</td>
      </tr>
    `;
  };

  private renderListItem = (process: IProcess) => {
    return html`
      <ca-processes-list-item
        class=${process.program.name === this._draggedItemName ? 'dragged' : ''}
        program-name=${process.program.name}
        @dragstart=${this.handleDragStart}
        @dragend=${this.handleDragEnd}
      >
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

  private handleDragStart = (event: DragEvent) => {
    event.stopPropagation();

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.setDragImage(EMPTY_IMAGE, 0, 0);

      this._draggedItemName = event.dataTransfer.getData('text/plain') as ProgramName;
    }
  };

  private handleDragOver = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (this._tbodyRef.value) {
      const boundingRect = this._tbodyRef.value.getBoundingClientRect();
      const relativeTop = Math.max(event.clientY - boundingRect.top, 0);

      this._draggedItemPosition = Math.min(
        Math.floor(relativeTop / TABLE_ROW_HEIGHT),
        this.controller.listProcesses().length - 1,
      );
    }
  };

  private handleDragEnd = (event: Event) => {
    event.stopPropagation();

    if (this._draggedItemName && this._draggedItemPosition !== undefined) {
      this.controller.moveProcess(this._draggedItemName, this._draggedItemPosition);
    }

    this._draggedItemName = undefined;
    this._draggedItemPosition = undefined;
  };
}
