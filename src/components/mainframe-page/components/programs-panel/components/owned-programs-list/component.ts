import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { SortableElementMovedEvent } from '@components/shared/sortable-list/events/sortable-element-moved';
import { SCREEN_WIDTH_POINTS } from '@shared/styles';
import { OwnedProgramsListController } from './controller';

@customElement('ca-owned-programs-list')
export class OwnedProgramsList extends BaseComponent<OwnedProgramsListController> {
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
        grid-template-columns: 2fr 1fr 1fr 0;
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

  protected controller: OwnedProgramsListController;

  constructor() {
    super();

    this.controller = new OwnedProgramsListController(this);
  }

  renderContent() {
    const isAutoupgradeActive = this.checkSomeProgramsAutoupgradeActive();

    const autoupgradeIcon = isAutoupgradeActive ? 'arrow-up-circle-fill' : 'arrow-up-circle';
    const autoupgradeLabel = isAutoupgradeActive ? 'disableAutoupgradeAll' : 'enableAutoupgradeAll';
    const autoupgradeVariant = isAutoupgradeActive ? 'neutral' : 'default';

    const ownedPrograms = this.controller.listOwnedPrograms();

    return html`
      <div class="header">
        <div class="header-column">${t('mainframe.program', { ns: 'ui' })}</div>
        <div class="header-column">${t('mainframe.level', { ns: 'ui' })}</div>
        <div class="header-column">${t('mainframe.quality', { ns: 'ui' })}</div>
        <div class="buttons desktop">
          <sl-tooltip>
            <span slot="content"> ${t('mainframe.programs.upgradeMaxAllPrograms', { ns: 'ui' })} </span>

            <sl-icon-button
              name="chevron-double-up"
              label=${t('mainframe.programs.upgradeMaxAllPrograms', { ns: 'ui' })}
              @click=${this.handleUpgradeMaxAllPrograms}
            >
            </sl-icon-button>
          </sl-tooltip>

          <sl-tooltip>
            <span slot="content"> ${t(`mainframe.programs.${autoupgradeLabel}`, { ns: 'ui' })} </span>

            <sl-icon-button
              name=${autoupgradeIcon}
              label=${t(`mainframe.programs.${autoupgradeLabel}`, { ns: 'ui' })}
              @click=${this.handleToggleAutoupgrade}
            >
            </sl-icon-button>
          </sl-tooltip>
        </div>

        <div class="buttons mobile">
          <sl-button variant="default" size="medium" @click=${this.handleUpgradeMaxAllPrograms}>
            ${t('mainframe.programs.upgradeMaxAllPrograms', { ns: 'ui' })}
          </sl-button>

          <sl-button variant=${autoupgradeVariant} size="medium" @click=${this.handleToggleAutoupgrade}>
            ${t(`mainframe.programs.${autoupgradeLabel}`, { ns: 'ui' })}
          </sl-button>
        </div>
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
    return html` <div class="notification">${t('mainframe.programs.emptyListNotification', { ns: 'ui' })}</div> `;
  };

  private renderProgram = (program: IProgram) => {
    return html`
      <ca-owned-programs-list-item program-name=${program.name} data-drag-id=${program.name}>
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

  private handleMoveProgram = (event: SortableElementMovedEvent) => {
    event.stopPropagation();
    event.preventDefault();

    this.controller.moveProgram(event.keyName as ProgramName, event.position);
  };

  private handleUpgradeMaxAllPrograms = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.controller.upgradeMaxAllPrograms();
  };
}
