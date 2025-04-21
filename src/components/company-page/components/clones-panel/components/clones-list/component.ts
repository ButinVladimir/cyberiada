import { css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { SortableElementMovedEvent } from '@components/shared/sortable-list/events/sortable-element-moved';
import { COMMON_TEXTS } from '@texts/common';
import { CloneAlert } from '@shared/types';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { ClonesListController } from './controller';
import { IClone } from '@/state/company-state';

@localized()
@customElement('ca-clones-list')
export class ClonesList extends BaseComponent<ClonesListController> {
  static styles = css`
    :host {
      width: 100%;
      align-self: stretch;
      display: block;
      border-top: var(--ca-border);
    }

    .header {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding: var(--sl-spacing-medium) 0;
      gap: var(--sl-spacing-small);
    }

    .notification {
      padding: var(--sl-spacing-3x-large);
      text-align: center;
      border-top: var(--ca-border);
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
      gap: var(--sl-spacing-medium);
    }

    ca-sortable-list ca-owned-programs-list-item.dragged {
      background-color: var(--ca-dragged-color);
    }
  `;

  protected controller: ClonesListController;

  constructor() {
    super();

    this.controller = new ClonesListController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteAllClonesDialog);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteAllClonesDialog);
  }

  render() {
    const isAutoupgradeActive = this.checkSomeClonesAutoupgradeActive();

    const autoupgradeLabel = isAutoupgradeActive
      ? COMMON_TEXTS.disableAutoupgradeAll()
      : COMMON_TEXTS.enableAutoupgradeAll();
    const autoupgradeVariant = isAutoupgradeActive ? 'neutral' : 'default';

    const clones = this.controller.listClones();

    return html`
      <div class="header">
        <sl-button variant=${autoupgradeVariant} size="medium" @click=${this.handleToggleAutoupgrade}>
          ${autoupgradeLabel}
        </sl-button>

        <sl-button variant="danger" size="medium" @click=${this.handleOpenDeleteAllClonesDialog}>
          ${msg('Delete all clones')}
        </sl-button>
      </div>

      ${clones.length > 0
        ? html`
            <ca-sortable-list @sortable-element-moved=${this.handleMoveClone}>
              ${repeat(clones, (program) => program.name, this.renderClone)}
            </ca-sortable-list>
          `
        : this.renderEmptyListNotification()}
    `;
  }

  private renderEmptyListNotification = () => {
    return html` <div class="notification">${msg("You don't have any clones")}</div> `;
  };

  private renderClone = (clone: IClone) => {
    return html`
      <sl-card>
        <span slot="header">${clone.name}</span>
        ${clone.id}
      </sl-card>
    `;
  };

  private checkSomeClonesAutoupgradeActive(): boolean {
    const clones = this.controller.listClones();

    return clones.some((clone) => clone.autoUpgradeEnabled);
  }

  private handleToggleAutoupgrade = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    const active = this.checkSomeClonesAutoupgradeActive();

    this.controller.toggleAutoupgrade(!active);
  };

  private handleMoveClone = (event: SortableElementMovedEvent) => {
    event.stopPropagation();
    event.preventDefault();

    this.controller.moveClone(event.keyName, event.position);
  };

  private handleOpenDeleteAllClonesDialog = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(
      new ConfirmationAlertOpenEvent(
        CloneAlert.deleteAllClones,
        msg('Are you sure want to delete all clones? Their progress will be lost.'),
      ),
    );
  };

  private handleConfirmDeleteAllClonesDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== CloneAlert.deleteAllClones) {
      return;
    }

    this.controller.deleteAllClones();
  };
}
