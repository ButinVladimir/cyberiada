import { css, html, nothing } from 'lit';
import { localized, msg, str } from '@lit/localize';
import { provide } from '@lit/context';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { BaseComponent, SidejobAlert, DELETE_VALUES, DESCRIPTION_ICONS, SCREEN_WIDTH_POINTS } from '@shared/index';
import { COMMON_TEXTS, DISTRICT_NAMES, SIDEJOB_TEXTS } from '@texts/index';
import { SidejobsListItemController } from './controller';
import { sidejobContext } from './contexts';
import { type ISidejob } from '@state/company-state';

@localized()
@customElement('ca-sidejobs-list-item')
export class SidejobsListItem extends BaseComponent {
  static styles = [
    css`
      :host {
        display: grid;
        grid-template-areas:
          'sidejob'
          'district'
          'clone'
          'buttons';
        grid-template-columns: auto;
        grid-template-rows: repeat(1fr);
        gap: var(--sl-spacing-small);
        padding: var(--sl-spacing-small);
        box-sizing: border-box;
      }

      .desktop {
        display: none;
      }

      .sidejob {
        grid-area: sidejob;
      }

      .district {
        grid-area: district;
      }

      .clone {
        grid-area: clone;
      }

      .buttons {
        grid-area: buttons;
      }

      .buttons.desktop {
        font-size: var(--sl-font-size-large);
      }

      #cancel-btn::part(base):hover {
        color: var(--sl-color-danger-600);
      }

      .sidejob-title sl-icon-button.description-button {
        position: relative;
        top: 0.25rem;
      }

      .sidejob-description {
        box-sizing: border-box;
        height: 0;
        overflow: hidden;
        color: var(--ca-hint-color);
        font-size: var(--ca-hint-font-size);
        line-height: var(--ca-hint-line-height);
      }

      .sidejob-description.visible {
        height: auto;
        padding-top: var(--sl-spacing-medium);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        :host {
          grid-template-areas: 'sidejob district clone buttons';
          grid-template-columns: 2fr 1fr 1fr auto;
          grid-template-rows: auto;
          align-items: center;
        }

        .desktop {
          display: block;
        }

        .mobile {
          display: none;
        }

        .buttons.mobile {
          display: none;
        }

        .buttons.desktop {
          display: block;
        }
      }
    `,
  ];

  @property({
    attribute: 'sidejob-id',
    type: String,
  })
  sidejobId!: string;

  @state()
  _descriptionVisible = false;

  private _controller: SidejobsListItemController;

  @provide({ context: sidejobContext })
  private _sidejob?: ISidejob;

  constructor() {
    super();

    this._controller = new SidejobsListItemController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmCancelSidejobDialog);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmCancelSidejobDialog);
  }

  performUpdate() {
    this.updateContext();

    super.performUpdate();
  }

  render() {
    if (!this._sidejob) {
      return nothing;
    }

    const sidejobTitle = SIDEJOB_TEXTS[this._sidejob.sidejobName].title();

    const descriptionButtonName = this._descriptionVisible ? DESCRIPTION_ICONS.expanded : DESCRIPTION_ICONS.hidden;
    const descriptionButtonLabel = this._descriptionVisible
      ? COMMON_TEXTS.hideDescription()
      : COMMON_TEXTS.showDescription();
    const descriptionClasses = classMap({
      'sidejob-description': true,
      visible: this._descriptionVisible,
    });

    const districtName = DISTRICT_NAMES[this._sidejob.district.name]();
    const cloneName = this._sidejob.assignedClone!.name;

    const districtNameFull = msg(str`District: ${districtName}`);
    const cloneNameFull = msg(str`Assigned clone: ${cloneName}`);

    const cancelSidejobLabel = msg('Cancel sidejob');

    return html`
      <div class="sidejob">
        <div class="sidejob-title">
          ${sidejobTitle}

          <sl-tooltip>
            <span slot="content">${descriptionButtonLabel}</span>

            <sl-icon-button
              name=${descriptionButtonName}
              class="description-button"
              @click=${this.handleToggleDescription}
            >
            </sl-icon-button>
          </sl-tooltip>
        </div>

        <div class=${descriptionClasses}>
          <ca-sidejobs-list-item-description></ca-sidejobs-list-item-description>
        </div>
      </div>

      <div class="district mobile">${districtNameFull}</div>

      <div class="district desktop">${districtName}</div>

      <div class="clone mobile">${cloneNameFull}</div>

      <div class="clone desktop">${cloneName}</div>

      <div class="buttons mobile">
        <sl-button variant=${DELETE_VALUES.buttonVariant} size="medium" @click=${this.handleOpenCancelSidejobDialog}>
          <sl-icon slot="prefix" name=${DELETE_VALUES.icon}> </sl-icon>

          ${cancelSidejobLabel}
        </sl-button>
      </div>

      <div class="buttons desktop">
        <sl-tooltip>
          <span slot="content"> ${cancelSidejobLabel} </span>

          <sl-icon-button
            id="delete-btn"
            name=${DELETE_VALUES.icon}
            label=${cancelSidejobLabel}
            @click=${this.handleOpenCancelSidejobDialog}
          >
          </sl-icon-button>
        </sl-tooltip>
      </div>
    `;
  }

  private updateContext() {
    if (this.sidejobId) {
      this._sidejob = this._controller.getSidejobById(this.sidejobId);
    } else {
      this._sidejob = undefined;
    }
  }

  private handleToggleDescription = () => {
    this._descriptionVisible = !this._descriptionVisible;
  };

  private handleOpenCancelSidejobDialog = () => {
    const sidejobName = SIDEJOB_TEXTS[this._sidejob!.sidejobName].title();
    const districtName = DISTRICT_NAMES[this._sidejob!.district.name]();
    const cloneName = this._sidejob!.assignedClone!.name;

    this.dispatchEvent(
      new ConfirmationAlertOpenEvent(
        SidejobAlert.sidejobCancel,
        msg(
          str`Are you sure want to cancel sidejob "${sidejobName}" in district "${districtName}" assigned to clone "${cloneName}"?`,
        ),
        this.sidejobId,
      ),
    );
  };

  private handleConfirmCancelSidejobDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== SidejobAlert.sidejobCancel || convertedEvent.gameAlertKey !== this.sidejobId) {
      return;
    }

    this._controller.cancelSidejobById(this.sidejobId);
  };
}
