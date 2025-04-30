import { css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { SortableElementMovedEvent } from '@components/shared/sortable-list/events/sortable-element-moved';
import { COMMON_TEXTS } from '@texts/common';
import { CloneAlert } from '@shared/types';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { AUTOUPGRADE_VALUES, DELETE_VALUES, TOGGLE_DETAILS_VALUES } from '@shared/styles';
import { IClone } from '@state/company-state/states/clone-factory/interfaces/clone';
import { ClonesListController } from './controller';
import { CLONE_LIST_ITEMS_GAP } from './constants';

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
  `;

  protected controller: ClonesListController;

  @state()
  private _detailsVisible = false;

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
    const toggleDetailsLabel = this._detailsVisible ? COMMON_TEXTS.hideDetails() : COMMON_TEXTS.showDetails();
    const toggleDetailsIcon = this._detailsVisible
      ? TOGGLE_DETAILS_VALUES.icon.enabled
      : TOGGLE_DETAILS_VALUES.icon.disabled;
    const toggleDetailsVariant = this._detailsVisible
      ? TOGGLE_DETAILS_VALUES.buttonVariant.enabled
      : TOGGLE_DETAILS_VALUES.buttonVariant.disabled;

    const isAutoupgradeActive = this.checkSomeClonesAutoupgradeActive();

    const autoupgradeLabel = isAutoupgradeActive
      ? COMMON_TEXTS.disableAutoupgradeAll()
      : COMMON_TEXTS.enableAutoupgradeAll();
    const autoupgradeIcon = isAutoupgradeActive ? AUTOUPGRADE_VALUES.icon.enabled : AUTOUPGRADE_VALUES.icon.disabled;
    const autoupgradeVariant = isAutoupgradeActive
      ? AUTOUPGRADE_VALUES.buttonVariant.enabled
      : AUTOUPGRADE_VALUES.buttonVariant.disabled;

    const clones = this.controller.listClones();

    return html`
      <div class="header">
        <sl-button variant=${toggleDetailsVariant} size="medium" @click=${this.handleToggleDetails}>
          <sl-icon slot="prefix" name=${toggleDetailsIcon}></sl-icon>

          ${toggleDetailsLabel}
        </sl-button>

        <sl-button variant=${autoupgradeVariant} size="medium" @click=${this.handleToggleAutoupgrade}>
          <sl-icon slot="prefix" name=${autoupgradeIcon}></sl-icon>

          ${autoupgradeLabel}
        </sl-button>

        <sl-button variant=${DELETE_VALUES.buttonVariant} size="medium" @click=${this.handleOpenDeleteAllClonesDialog}>
          <sl-icon slot="prefix" name=${DELETE_VALUES.icon}></sl-icon>

          ${msg('Delete all clones')}
        </sl-button>
      </div>

      ${clones.length > 0
        ? html`
            <ca-sortable-list gap=${CLONE_LIST_ITEMS_GAP} @sortable-element-moved=${this.handleMoveClone}>
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
    return html`<ca-clones-list-item
      clone-id=${clone.id}
      data-drag-id=${clone.id}
      ?details-visible=${this._detailsVisible}
    ></ca-clones-list-item>`;
  };

  private handleToggleDetails = () => {
    this._detailsVisible = !this._detailsVisible;
  };

  private checkSomeClonesAutoupgradeActive(): boolean {
    const clones = this.controller.listClones();

    return clones.some((clone) => clone.autoUpgradeEnabled);
  }

  private handleToggleAutoupgrade = () => {
    const active = this.checkSomeClonesAutoupgradeActive();

    this.controller.toggleAutoupgrade(!active);
  };

  private handleMoveClone = (event: SortableElementMovedEvent) => {
    this.controller.moveClone(event.keyName, event.position);
  };

  private handleOpenDeleteAllClonesDialog = () => {
    this.dispatchEvent(
      new ConfirmationAlertOpenEvent(
        CloneAlert.deleteAllClones,
        msg('Are you sure want to delete all clones? Their progress will be lost and their actions will be cancelled.'),
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
