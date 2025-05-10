import { css, html, PropertyValues } from 'lit';
import { localized, msg, str } from '@lit/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { provide } from '@lit/context';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import {
  inputLabelStyle,
  hintStyle,
  sectionTitleStyle,
  mediumModalStyle,
  modalBodyScrollStyle,
  SCREEN_WIDTH_POINTS,
  BaseComponent,
  SidejobAlert,
} from '@shared/index';
import { IDistrictState } from '@state/city-state';
import { SIDEJOB_TEXTS, DISTRICT_NAMES } from '@texts/index';
import { IClone, type ISidejob, SidejobName } from '@state/company-state';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { AssignCloneSidejobDialogCloseEvent } from './events';
import { AssignCloneSidejobDialogController } from './controller';
import { existingSidejobContext, temporarySidejobContext } from './contexts';

@localized()
@customElement('ca-assign-clone-sidejob-dialog')
export class AssignCloneSidejobDialog extends BaseComponent {
  static styles = [
    inputLabelStyle,
    hintStyle,
    sectionTitleStyle,
    mediumModalStyle,
    modalBodyScrollStyle,
    css`
      sl-dialog::part(body) {
        padding-top: 0;
        padding-bottom: 0;
      }

      sl-dialog::part(footer) {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: var(--sl-spacing-small);
      }

      h4.title {
        margin: 0;
      }

      div.body {
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      div.inputs-container {
        display: grid;
        column-gap: var(--sl-spacing-medium);
        row-gap: var(--sl-spacing-medium);
        grid-template-columns: auto;
        grid-template-rows: auto;
        margin-bottom: var(--sl-spacing-medium);
      }

      p.hint {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-medium);
      }

      div.footer {
        display: flex;
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        div.inputs-container {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
    `,
  ];

  private _controller: AssignCloneSidejobDialogController;

  private _cloneIdInputRef = createRef<SlSelect>();

  private _districtIndexInputRef = createRef<SlSelect>();

  private _sidejobNameInputRef = createRef<SlSelect>();

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  @state()
  private _cloneId?: string;

  @state()
  private _districtIndex?: number;

  @state()
  private _sidejobName?: SidejobName;

  @provide({ context: temporarySidejobContext })
  private _sidejob?: ISidejob;

  @provide({ context: existingSidejobContext })
  private _existingSidejob?: ISidejob;

  constructor() {
    super();

    this._controller = new AssignCloneSidejobDialogController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmConfirmationAlert);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmConfirmationAlert);
  }

  performUpdate() {
    if (this._sidejobName !== undefined && this._districtIndex !== undefined) {
      const sidejob = this._controller.getSidejob({
        assignedCloneId: this._cloneId,
        districtIndex: this._districtIndex,
        sidejobName: this._sidejobName,
      });

      this._sidejob = sidejob;
    } else {
      this._sidejob = undefined;
    }

    this._existingSidejob = this._controller.getExistingSidejobByClone(this._cloneId);

    super.performUpdate();
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    if (_changedProperties.has('isOpen')) {
      this._cloneId = undefined;
      this._districtIndex = undefined;
      this._sidejobName = undefined;
    }
  }

  render() {
    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${msg('Assign clone to sidejob')}</h4>

        <div class="body">
          <p class="hint">
            ${msg(`Select clone, district and sidejob name to assign clone.
Clone can be assigned only to one sidejob.
Sidejobs availability depends on unlocked features and district connectivity.`)}
          </p>

          <div class="inputs-container">
            <sl-select
              ${ref(this._cloneIdInputRef)}
              name="cloneId"
              value=${this._cloneId ?? ''}
              hoist
              @sl-change=${this.handleCloneIdChange}
            >
              <span class="input-label" slot="label"> ${msg('Clone')} </span>

              ${this._controller.listClones().map(this.renderCloneOption)}
            </sl-select>

            <sl-select
              ${ref(this._districtIndexInputRef)}
              name="districtIndex"
              value=${this._districtIndex ?? ''}
              hoist
              @sl-change=${this.handleDistrictIndexChange}
            >
              <span class="input-label" slot="label"> ${msg('District')} </span>

              ${this._controller.listAvailableDistricts().map(this.renderDistrictOption)}
            </sl-select>

            <sl-select
              ${ref(this._sidejobNameInputRef)}
              name="sidejobName"
              value=${this._sidejobName ?? ''}
              hoist
              @sl-change=${this.handleSidejobNameChange}
            >
              <span class="input-label" slot="label"> ${msg('Sidejob')} </span>

              ${this._controller.listAvailableSidejobs().map(this.renderSidejobName)}
            </sl-select>
          </div>
        </div>

        <ca-assign-clone-sidejob-dialog-description></ca-assign-clone-sidejob-dialog-description>

        <ca-assign-clone-sidejob-dialog-buttons
          slot="footer"
          @assign-clone=${this.handleOpenConfirmationAlert}
          @cancel=${this.handleClose}
        ></ca-assign-clone-sidejob-dialog-buttons>
      </sl-dialog>
    `;
  }

  private renderCloneOption = (clone: IClone) => {
    return html`<sl-option value=${clone.id}> ${clone.name} </sl-option>`;
  };

  private renderDistrictOption = (districtState: IDistrictState) => {
    return html`<sl-option value=${districtState.index}> ${DISTRICT_NAMES[districtState.name]()} </sl-option>`;
  };

  private renderSidejobName = (sidejobName: SidejobName) => {
    return html` <sl-option value=${sidejobName}> ${SIDEJOB_TEXTS[sidejobName].title()} </sl-option>`;
  };

  private handleClose = () => {
    this.dispatchEvent(new AssignCloneSidejobDialogCloseEvent());
  };

  private handleCloneIdChange = () => {
    if (!this._cloneIdInputRef.value) {
      return;
    }

    const cloneId = this._cloneIdInputRef.value.value as string;
    this._cloneId = cloneId;
  };

  private handleSidejobNameChange = () => {
    if (!this._sidejobNameInputRef.value) {
      return;
    }

    const sidejobName = this._sidejobNameInputRef.value.value as SidejobName;
    this._sidejobName = sidejobName;
  };

  private handleDistrictIndexChange = () => {
    if (!this._districtIndexInputRef.value) {
      return;
    }

    const districtIndex = parseInt(this._districtIndexInputRef.value.value as string);
    this._districtIndex = districtIndex;
  };

  private handleOpenConfirmationAlert = () => {
    if (!this._sidejob) {
      return;
    }

    if (this._existingSidejob) {
      const cloneName = this._existingSidejob.assignedClone!.name;
      const existingSidejobName = SIDEJOB_TEXTS[this._existingSidejob.sidejobName].title();
      const districtName = DISTRICT_NAMES[this._existingSidejob.district.name]();

      this.dispatchEvent(
        new ConfirmationAlertOpenEvent(
          SidejobAlert.replaceSidejob,
          msg(
            str`Are you sure want to replace sidejob for clone "${cloneName}"? This will stop their current sidejob "${existingSidejobName}" in district "${districtName}".`,
          ),
        ),
      );
    } else {
      this.assignClone();
    }
  };

  private handleConfirmConfirmationAlert = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== SidejobAlert.replaceSidejob) {
      return;
    }

    this.assignClone();
  };

  private assignClone() {
    this._controller.assignClone({
      districtIndex: this._districtIndex!,
      sidejobName: this._sidejobName!,
      assignedCloneId: this._cloneId!,
    });

    this.dispatchEvent(new AssignCloneSidejobDialogCloseEvent());
  }
}
