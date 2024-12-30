import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { BaseComponent } from '@shared/base-component';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';
import { moveElementInArray } from '@shared/helpers';
import { EMPTY_IMAGE } from '@shared/constants';
import { OwnedProgramsListController } from './controller';
import { TABLE_ROW_HEIGHT } from './constants';

@customElement('ca-owned-programs-list')
export class OwnedProgramsList extends BaseComponent<OwnedProgramsListController> {
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

    th.program {
      width: 40%;
      cursor: grab;
    }

    th.level {
      width: 25%;
    }

    th.quality {
      width: 25%;
    }

    th.autoupgrade {
      width: auto;
      text-align: right;
      font-size: var(--sl-font-size-large);
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

    tbody ca-owned-programs-list-item:nth-child(2n + 1) {
      background-color: var(--ca-table-row-odd-color);
    }

    tbody ca-owned-programs-list-item {
      height: ${TABLE_ROW_HEIGHT}px;
    }

    tbody ca-owned-programs-list-item.dragged {
      background-color: var(--ca-dragged-color);
    }
  `;

  protected controller: OwnedProgramsListController;

  private _tbodyRef = createRef<HTMLTableSectionElement>();

  @state()
  private _draggedItemName: ProgramName | undefined;

  @state()
  private _draggedItemPosition: number | undefined;

  constructor() {
    super();

    this.controller = new OwnedProgramsListController(this);
  }

  renderContent() {
    const autoupgradeActive = this.checkSomeProgramsAutoupgradeActive();

    const autoupgradeIcon = autoupgradeActive ? 'arrow-up-circle-fill' : 'arrow-up-circle';

    return html`
      <table>
        <thead>
          <th class="program">${t('mainframe.program', { ns: 'ui' })}</th>
          <th class="level">${t('mainframe.level', { ns: 'ui' })}</th>
          <th class="quality">${t('mainframe.quality', { ns: 'ui' })}</th>
          <th class="autoupgrade">
            <sl-tooltip>
              <span slot="content"> ${t('mainframe.programs.toggleAutoupgradeAll', { ns: 'ui' })} </span>

              <sl-icon-button
                id="toggle-autoupgrade-btn"
                name=${autoupgradeIcon}
                label=${t('mainframe.programs.toggleAutoupgradeAll', { ns: 'ui' })}
                @click=${this.handleToggleAutoupgrade}
              >
              </sl-icon-button>
            </sl-tooltip>
          </th>
        </thead>

        <tbody ${ref(this._tbodyRef)} @dragover=${this.handleDragOver}>
          ${this.renderList()}
        </tbody>
      </table>
    `;
  }

  private renderList = () => {
    let ownedPrograms = this.controller.listOwnedPrograms();

    if (ownedPrograms.length === 0) {
      return this.renderEmptyListNotification();
    }

    if (this._draggedItemName && this._draggedItemPosition !== undefined) {
      const oldPosition = ownedPrograms.findIndex((program) => program.name === this._draggedItemName);

      const reorderedPrograms = [...ownedPrograms];
      moveElementInArray(reorderedPrograms, oldPosition, this._draggedItemPosition);

      ownedPrograms = reorderedPrograms;
    }

    return repeat(ownedPrograms, (program) => program.name, this.renderListItem);
  };

  private renderEmptyListNotification = () => {
    return html`
      <tr class="notification">
        <td colspan="4">${t('mainframe.programs.emptyListNotification', { ns: 'ui' })}</td>
      </tr>
    `;
  };

  private renderListItem = (program: IProgram) => {
    return html`
      <ca-owned-programs-list-item
        class=${program.name === this._draggedItemName ? 'dragged' : ''}
        program-name=${program.name}
        @dragstart=${this.handleDragStart}
        @dragend=${this.handleDragEnd}
      >
      </ca-owned-programs-list-item>
    `;
  };

  private checkSomeProgramsAutoupgradeActive(): boolean {
    const programs = this.controller.listOwnedPrograms();

    return programs.some((program) => program.autoUpgradeEnabled);
  }

  private handleToggleAutoupgrade = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    const active = this.checkSomeProgramsAutoupgradeActive();

    this.controller.toggleAutoupgrade(!active);
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
        this.controller.listOwnedPrograms().length - 1,
      );
    }
  };

  private handleDragEnd = (event: Event) => {
    event.stopPropagation();

    if (this._draggedItemName && this._draggedItemPosition !== undefined) {
      this.controller.moveProgram(this._draggedItemName, this._draggedItemPosition);
    }

    this._draggedItemName = undefined;
    this._draggedItemPosition = undefined;
  };
}
