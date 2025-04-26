import { css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { SortableElementMovedEvent } from '@components/shared/sortable-list/events/sortable-element-moved';
import { AUTOUPGRADE_VALUES, SCREEN_WIDTH_POINTS, UPGRADE_MAX_VALUES } from '@shared/styles';
import { COMMON_TEXTS } from '@texts/common';
import { OwnedProgramsListController } from './controller';

@localized()
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

  render() {
    const isAutoupgradeActive = this.checkSomeProgramsAutoupgradeActive();

    const autoupgradeIcon = isAutoupgradeActive ? AUTOUPGRADE_VALUES.icon.enabled : AUTOUPGRADE_VALUES.icon.disabled;
    const autoupgradeLabel = isAutoupgradeActive
      ? COMMON_TEXTS.disableAutoupgradeAll()
      : COMMON_TEXTS.enableAutoupgradeAll();
    const autoupgradeVariant = isAutoupgradeActive
      ? AUTOUPGRADE_VALUES.buttonVariant.enabled
      : AUTOUPGRADE_VALUES.buttonVariant.disabled;

    const ownedPrograms = this.controller.listOwnedPrograms();

    const upgradeAllProgramsLabel = COMMON_TEXTS.upgradeAll();

    return html`
      <div class="header">
        <div class="header-column">${msg('Program')}</div>
        <div class="header-column">${COMMON_TEXTS.level()}</div>
        <div class="header-column">${COMMON_TEXTS.quality()}</div>
        <div class="buttons desktop">
          <sl-tooltip>
            <span slot="content"> ${upgradeAllProgramsLabel} </span>

            <sl-icon-button
              name=${UPGRADE_MAX_VALUES.icon}
              label=${upgradeAllProgramsLabel}
              @click=${this.handleUpgradeMaxAllPrograms}
            >
            </sl-icon-button>
          </sl-tooltip>

          <sl-tooltip>
            <span slot="content"> ${autoupgradeLabel} </span>

            <sl-icon-button name=${autoupgradeIcon} label=${autoupgradeLabel} @click=${this.handleToggleAutoupgrade}>
            </sl-icon-button>
          </sl-tooltip>
        </div>

        <div class="buttons mobile">
          <sl-button
            variant=${UPGRADE_MAX_VALUES.buttonVariant}
            size="medium"
            @click=${this.handleUpgradeMaxAllPrograms}
          >
            <sl-icon slot="prefix" name=${UPGRADE_MAX_VALUES.icon}> </sl-icon>

            ${upgradeAllProgramsLabel}
          </sl-button>

          <sl-button variant=${autoupgradeVariant} size="medium" @click=${this.handleToggleAutoupgrade}>
            <sl-icon slot="prefix" name=${autoupgradeIcon}> </sl-icon>

            ${autoupgradeLabel}
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
    return html` <div class="notification">${msg("You don't have any owned programs")}</div> `;
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

  private handleToggleAutoupgrade = () => {
    const active = this.checkSomeProgramsAutoupgradeActive();

    this.controller.toggleAutoupgrade(!active);
  };

  private handleMoveProgram = (event: SortableElementMovedEvent) => {
    this.controller.moveProgram(event.keyName as ProgramName, event.position);
  };

  private handleUpgradeMaxAllPrograms = () => {
    this.controller.upgradeMaxAllPrograms();
  };
}
