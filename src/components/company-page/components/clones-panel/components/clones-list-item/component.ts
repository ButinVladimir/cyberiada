import { css, html, nothing } from 'lit';
import { localized, msg, str } from '@lit/localize';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { COMMON_TEXTS } from '@texts/common';
import { CloneAlert } from '@shared/types';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { AUTOUPGRADE_VALUES, dragIconStyle, hintStyle, SCREEN_WIDTH_POINTS, sectionTitleStyle } from '@shared/styles';
import { CLONE_TEMPLATE_TEXTS } from '@texts/clone-templates';
import { ClonesListItemController } from './controller';
import { OpenCloneListItemDialogEvent } from '../../events/open-clone-list-item-dialog';

@localized()
@customElement('ca-clones-list-item')
export class ClonesListItem extends BaseComponent<ClonesListItemController> {
  static styles = [
    sectionTitleStyle,
    hintStyle,
    dragIconStyle,
    css`
      sl-card {
        width: 100%;
      }

      :host(.dragged) sl-card::part(base) {
        background-color: var(--ca-dragged-color);
      }

      div.header {
        display: grid;
        grid-template-areas:
          'name menu'
          'description description';
        grid-template-columns: 1fr auto;
        grid-template-rows: repeat(auto);
      }

      h4.title {
        cursor: grab;
        margin: 0;
      }

      h4.name {
        grid-area: name;
      }

      p.hint {
        margin: 0;
      }

      p.description {
        grid-area: description;
      }

      sl-icon-button.menu-button {
        grid-area: menu;
        align-self: center;
      }

      div.body {
        display: grid;
        grid-template-areas: 'experience';
        grid-template-columns: auto;
        grid-template-rows: repeat(auto);
        grid-column-gap: var(--sl-spacing-3x-large);
        grid-row-gap: var(--sl-spacing-small);
      }

      div.body.details-visible {
        grid-template-areas:
          'experience'
          'common-params'
          'attributes'
          'skills';
      }

      ca-clones-list-item-experience {
        grid-area: experience;
      }

      div.common-params {
        grid-area: common-params;
      }

      ca-clones-list-item-attributes {
        grid-area: attributes;
      }

      ca-clones-list-item-skills {
        grid-area: skills;
      }

      sl-icon[name='grip-vertical'] {
        top: 0.15em;
        left: -0.2em;
      }

      #toggle-autoupgrade-btn {
        position: relative;
        top: 0.15em;
      }

      sl-popup {
        --arrow-color: var(--sl-color-neutral-200);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        div.body {
          grid-template-areas: 'experience';
        }

        div.body.details-visible {
          grid-template-areas:
            'experience experience'
            'common-params common-params'
            'attributes skills';
          grid-template-columns: 1fr 1fr;
        }
      }
    `,
  ];

  @property({
    attribute: 'clone-id',
    type: String,
  })
  public cloneId!: string;

  @property({
    attribute: 'details-visible',
    type: Boolean,
  })
  public detailsVisible = false;

  protected controller: ClonesListItemController;

  @state()
  private _menuVisible = false;

  constructor() {
    super();

    this.controller = new ClonesListItemController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteCloneDialog);
    document.addEventListener('click', this.handleHideMenu);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteCloneDialog);
    document.removeEventListener('click', this.handleHideMenu);
  }

  render() {
    const clone = this.controller.getCloneById(this.cloneId);

    if (!clone) {
      return nothing;
    }

    const autoupgradeIcon = clone.autoUpgradeEnabled
      ? AUTOUPGRADE_VALUES.icon.enabled
      : AUTOUPGRADE_VALUES.icon.disabled;
    const autoupgradeLabel = clone.autoUpgradeEnabled
      ? COMMON_TEXTS.disableAutoupgrade()
      : COMMON_TEXTS.enableAutoupgrade();

    const formatter = this.controller.formatter;

    const formattedQuality = formatter.formatQuality(clone.quality);
    const formattedLevel = formatter.formatNumberDecimal(clone.level);

    const synchronization = this.controller.getCloneSynchronization(clone);
    const formattedSynchronization = formatter.formatNumberDecimal(synchronization);

    const bodyClasses = classMap({
      body: true,
      'details-visible': this.detailsVisible,
    });

    return html`
      <sl-card>
        <div slot="header" class="header">
          <h4 class="title name" draggable="true" @dragstart=${this.handleDragStart}>
            <sl-icon id="drag-icon" name="grip-vertical"> </sl-icon>

            ${clone.name}

            <sl-tooltip>
              <span slot="content"> ${autoupgradeLabel} </span>

              <sl-icon-button
                id="toggle-autoupgrade-btn"
                name=${autoupgradeIcon}
                label=${autoupgradeLabel}
                @click=${this.handleToggleAutoUpgrade}
              >
              </sl-icon-button>
            </sl-tooltip>
          </h4>

          <p class="description hint">
            ${msg(
              str`${CLONE_TEMPLATE_TEXTS[clone.templateName].title()}, quality ${formattedQuality}, level ${formattedLevel}`,
            )}
          </p>

          <sl-popup
            ?active=${this._menuVisible}
            flip
            placement="right-start"
            arrow
            arrow-placement="start"
            arrow-padding=${10}
            distance=${6}
          >
            <sl-icon-button
              class="menu-button"
              slot="anchor"
              label=${COMMON_TEXTS.menu()}
              name="three-dots-vertical"
              @click=${this.handleToggleMenu}
            ></sl-icon-button>

            <sl-menu>
              <sl-menu-item @click=${this.handleOpenRenameCloneDialog}>${msg('Rename clone')}</sl-menu-item>
              <sl-divider></sl-divider>
              <sl-menu-item @click=${this.handleOpenDeleteCloneDialog}>${msg('Delete clone')}</sl-menu-item>
            </sl-menu>
          </sl-popup>
        </div>

        <div class=${bodyClasses}>
          <ca-clones-list-item-experience clone-id=${this.cloneId}></ca-clones-list-item-experience>

          ${this.detailsVisible
            ? html`
                <div class="common-params">${msg(str`Synchronization: ${formattedSynchronization}`)}</div>
                <ca-clones-list-item-attributes clone-id=${this.cloneId}></ca-clones-list-item-attributes>
                <ca-clones-list-item-skills clone-id=${this.cloneId}></ca-clones-list-item-skills>
              `
            : nothing}
        </div>
      </sl-card>
    `;
  }

  private handleToggleAutoUpgrade = () => {
    const clone = this.controller.getCloneById(this.cloneId);

    if (clone) {
      clone.autoUpgradeEnabled = !clone.autoUpgradeEnabled;
    }
  };

  private handleDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.cloneId);
    }
  };

  private handleToggleMenu = (event: Event) => {
    event.stopPropagation();

    this._menuVisible = !this._menuVisible;
  };

  private handleHideMenu = () => {
    this._menuVisible = false;
  };

  private handleOpenDeleteCloneDialog = () => {
    this._menuVisible = false;

    const clone = this.controller.getCloneById(this.cloneId);

    if (!clone) {
      return;
    }

    this.dispatchEvent(
      new ConfirmationAlertOpenEvent(
        CloneAlert.cloneDelete,
        msg(
          str`Are you sure want to delete clone "${clone.name}"? Their progress will be lost and their actions will be cancelled.`,
        ),
        clone.id,
      ),
    );
  };

  private handleConfirmDeleteCloneDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== CloneAlert.cloneDelete || convertedEvent.gameAlertKey !== this.cloneId) {
      return;
    }

    this.controller.deleteCloneById(this.cloneId);
  };

  private handleOpenRenameCloneDialog = () => {
    this._menuVisible = false;

    this.dispatchEvent(new OpenCloneListItemDialogEvent('rename-clone', this.cloneId));
  };
}
