import { css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { SortableElementMovedEvent } from '@components/shared/sortable-list/events/sortable-element-moved';
import { SCREEN_WIDTH_POINTS } from '@shared/styles';
import { COMMON_TEXTS } from '@texts/common';
import { OwnedProgramsListController } from './controller';

@localized()
@customElement('ca-owned-programs-list')
export class OwnedProgramsList extends BaseComponent {
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
      padding: var(--sl-spacing-medium) 0;
    }

    .header-column {
      display: none;
      font-weight: var(--sl-font-weight-bold);
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

    ca-sortable-list ca-owned-programs-list-item {
      border-bottom: var(--ca-border);
    }

    ca-sortable-list ca-owned-programs-list-item:nth-child(2n + 1) {
      background-color: var(--ca-table-row-odd-color);
    }

    ca-sortable-list ca-owned-programs-list-item.dragged {
      background-color: var(--ca-dragged-color);
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
    }
  `;

  private _controller: OwnedProgramsListController;

  constructor() {
    super();

    this._controller = new OwnedProgramsListController(this);
  }

  render() {
    const ownedPrograms = this._controller.listOwnedPrograms();

    return html`
      <div class="header">
        <div class="header-column">${msg('Program')}</div>
        <div class="header-column">${COMMON_TEXTS.tier()}</div>
        <div class="header-column">${COMMON_TEXTS.level()}</div>
        <ca-owned-programs-list-buttons></ca-owned-programs-list-buttons>
      </div>

      ${ownedPrograms.length > 0
        ? html`
            <ca-sortable-list @sortable-element-moved=${this.handleMoveProgram}>
              ${repeat(ownedPrograms, (program) => program.name, this.renderProgram)}
            </ca-sortable-list>
          `
        : this.renderEmptyListNotification()}
    `;
  }

  private renderEmptyListNotification = () => {
    return html` <div class="notification">${msg("You don't have any owned programs")}</div> `;
  };

  private renderProgram = (program: IProgram) => {
    return html`
      <ca-owned-programs-list-item program-name=${program.name} data-drag-id=${program.name}>
      </ca-owned-programs-list-item>
    `;
  };

  private checkSomeProgramsAutoupgradeActive(): boolean {
    const programs = this._controller.listOwnedPrograms();

    return programs.some((program) => program.autoUpgradeEnabled);
  }

  private handleMoveProgram = (event: SortableElementMovedEvent) => {
    this._controller.moveProgram(event.keyName as ProgramName, event.position);
  };
}
