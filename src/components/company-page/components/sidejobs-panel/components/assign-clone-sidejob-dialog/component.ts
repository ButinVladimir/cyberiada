import { css, html, PropertyValues } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, property, queryAll, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlOption from '@shoelace-style/shoelace/dist/components/option/option.component.js';
import { BaseComponent } from '@shared/base-component';
import {
  inputLabelStyle,
  hintStyle,
  sectionTitleStyle,
  mediumModalStyle,
  modalBodyScrollStyle,
  SCREEN_WIDTH_POINTS,
} from '@shared/styles';
import { SIDEJOB_TEXTS, DISTRICT_NAMES } from '@texts/index';
import { type ISidejob, SidejobName } from '@state/company-state';
import { AssignCloneSidejobDialogCloseEvent } from './events';
import { AssignCloneSidejobDialogController } from './controller';
import { provide } from '@lit/context';
import { temporarySidejobContext } from './contexts';

@localized()
@customElement('ca-assign-clone-sidejob-dialog')
export class AssignCloneSidejobDialog extends BaseComponent<AssignCloneSidejobDialogController> {
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

  protected controller: AssignCloneSidejobDialogController;

  private _cloneIdInputRef = createRef<SlSelect>();

  private _districtIndexInputRef = createRef<SlSelect>();

  private _sidejobNameInputRef = createRef<SlSelect>();

  @queryAll('sl-select[name="sidejobName"] sl-option')
  private _sidejobNameOptions!: NodeListOf<SlOption>;

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

  constructor() {
    super();

    this.controller = new AssignCloneSidejobDialogController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    console.log(_changedProperties);

    if (_changedProperties.has('isOpen')) {
      this._cloneId = undefined;
      this._districtIndex = undefined;
      this._sidejobName = undefined;
    }

    this.handlePartialUpdate();

    if (this._cloneId !== undefined && this._sidejobName !== undefined && this._districtIndex !== undefined) {
      const sidejob = this.controller.getSidejob({
        assignedCloneId: this._cloneId,
        districtIndex: this._districtIndex,
        sidejobName: this._sidejobName,
      });

      if (this._sidejob !== sidejob) {
        this._sidejob = sidejob;
      }
    }
  }

  render() {
    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${msg('Assign clone to sidejob')}</h4>

        <div class="body">
          <p class="hint">
            ${msg(`Select clone, sidejob name and district to assign clone.
Only one clone can be assigned to the same sidejob in same district.
Clone can be assigned only to one sidejob.`)}
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

              ${this.controller
                .listClones()
                .map((clone) => html`<sl-option value=${clone.id}> ${clone.name} </sl-option>`)}
            </sl-select>

            <sl-select
              ${ref(this._districtIndexInputRef)}
              name="districtIndex"
              value=${this._districtIndex ?? ''}
              hoist
              @sl-change=${this.handleDistrictIndexChange}
            >
              <span class="input-label" slot="label"> ${msg('District')} </span>

              ${this.controller
                .listAvailableDistricts()
                .map(
                  (districtState) =>
                    html`<sl-option value=${districtState.index}> ${DISTRICT_NAMES[districtState.name]()} </sl-option>`,
                )}
            </sl-select>

            <sl-select
              ${ref(this._sidejobNameInputRef)}
              name="sidejobName"
              value=${this._sidejobName ?? ''}
              hoist
              @sl-change=${this.handleSidejobNameChange}
            >
              <span class="input-label" slot="label"> ${msg('Sidejob')} </span>

              ${this.controller
                .listAvailableSidejobs()
                .map(
                  (sidejobName) =>
                    html` <sl-option value=${sidejobName} disabled> ${SIDEJOB_TEXTS[sidejobName].title()} </sl-option>`,
                )}
            </sl-select>
          </div>
        </div>

        <ca-assign-clone-sidejob-dialog-description></ca-assign-clone-sidejob-dialog-description>
      </sl-dialog>
    `;
  }

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

  private handlePartialUpdate = () => {
    const totalConnectivity =
      this._districtIndex !== undefined ? this.controller.getTotalConnectivity(this._districtIndex) : 0;

    this._sidejobNameOptions.forEach((element) => {
      const requiredConnectivity = this.controller.getRequiredConnectivity(element.value as SidejobName);

      element.disabled = totalConnectivity < requiredConnectivity;
    });
  };
}
