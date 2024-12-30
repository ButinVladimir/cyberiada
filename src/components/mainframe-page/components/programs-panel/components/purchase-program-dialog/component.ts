import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { BaseComponent } from '@shared/base-component';
import { PROGRAMS } from '@state/progam-factory/constants';
import { ProgramName } from '@state/progam-factory/types';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertCloseEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/shared/confirmation-alert/events';
import { QUALITIES } from '@shared/constants';
import { ProgramAlert } from '@shared/types';
import { PurchaseProgramDialogCloseEvent } from './events';
import { PurchaseProgramDialogController } from './controller';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('ca-purchase-program-dialog')
export class PurchaseProgramDialog extends BaseComponent<PurchaseProgramDialogController> {
  static styles = css`
    sl-dialog {
      --width: 50rem;
    }

    sl-dialog::part(body) {
      padding-top: 0;
      padding-bottom: 0;
    }

    sl-dialog::part(footer) {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: var(--sl-spacing-small);
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
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
      grid-template-columns: repeat(3, 1fr);
    }

    p.hint {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-medium);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    span.input-label {
      font-size: var(--sl-font-size-medium);
      line-height: var(--sl-line-height-dense);
    }

    div.footer {
      display: flex;
    }

    div.program-description {
      margin-top: var(--sl-spacing-medium);
      margin-bottom: 0;
    }

    div.program-description p {
      margin: 0;
    }

    div.program-description p.line-break {
      height: var(--sl-spacing-medium);
    }
  `;

  protected controller: PurchaseProgramDialogController;

  private _programInputRef = createRef<SlSelect>();

  private _levelInputRef = createRef<SlInput>();

  private _qualityInputRef = createRef<SlSelect>();

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  @state()
  private _programName?: ProgramName = undefined;

  @state()
  private _level = 1;

  @state()
  private _quality = 0;

  @state()
  private _confirmationAlertVisible = false;

  constructor() {
    super();

    this.controller = new PurchaseProgramDialogController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertCloseEvent.type, this.handleCloseConfirmationAlert);
    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmConfirmationAlert);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertCloseEvent.type, this.handleCloseConfirmationAlert);
    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmConfirmationAlert);
  }

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    if (_changedProperties.get('isOpen') === false) {
      this._programName = undefined;
      this._level = this.controller.developmentLevel;
      this._quality = 0;
      this._confirmationAlertVisible = false;
    }
  }

  renderContent() {
    const { formatter, developmentLevel } = this.controller;

    return html`
      <sl-dialog ?open=${this.isOpen && !this._confirmationAlertVisible} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${t('mainframe.programs.purchaseProgram', { ns: 'ui' })}</h4>

        <div class="body">
          <p class="hint">${t('mainframe.programs.purchaseProgramDialogHint', { ns: 'ui' })}</p>

          <div class="inputs-container">
            <sl-select
              ${ref(this._programInputRef)}
              name="program"
              value=${this._programName ?? ''}
              hoist
              @sl-change=${this.handleProgramChange}
            >
              <span class="input-label" slot="label"> ${t('mainframe.program', { ns: 'ui' })} </span>

              ${PROGRAMS.map(
                (program) =>
                  html`<sl-option value=${program}> ${t(`${program}.name`, { ns: 'programs' })} </sl-option>`,
              )}
            </sl-select>

            <sl-input
              ${ref(this._levelInputRef)}
              name="level"
              value=${this._level}
              type="number"
              min="1"
              max=${developmentLevel}
              step="1"
              @sl-change=${this.handleLevelChange}
            >
              <span class="input-label" slot="label"> ${t('mainframe.level', { ns: 'ui' })} </span>
            </sl-input>

            <sl-select
              ${ref(this._qualityInputRef)}
              name="quality"
              value=${this._quality}
              hoist
              @sl-change=${this.handleQualityChange}
            >
              <span class="input-label" slot="label"> ${t('mainframe.quality', { ns: 'ui' })} </span>

              ${QUALITIES.map(
                (quality) => html` <sl-option value=${quality}> ${formatter.formatQuality(quality)} </sl-option>`,
              )}
            </sl-select>
          </div>

          ${this._programName
            ? html`<ca-program-diff-text
                program-name=${this._programName}
                level=${this._level}
                quality=${this._quality}
              >
              </ca-program-diff-text>`
            : null}
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          ${t('common.close', { ns: 'ui' })}
        </sl-button>

        <ca-purchase-program-dialog-buy-button
          slot="footer"
          program-name=${ifDefined(this._programName)}
          level=${this._level}
          quality=${this._quality}
          @buy-program=${this.handleOpenConfirmationAlert}
        >
        </ca-purchase-program-dialog-buy-button>
      </sl-dialog>
    `;
  }

  private handleClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new PurchaseProgramDialogCloseEvent());
  };

  private handleProgramChange = () => {
    if (!this._programInputRef.value) {
      return;
    }

    this._programName = this._programInputRef.value.value as ProgramName;
  };

  private handleLevelChange = () => {
    if (!this._levelInputRef.value) {
      return;
    }

    let level = this._levelInputRef.value.valueAsNumber;

    if (level < 1) {
      level = 1;
    }

    if (level > this.controller.developmentLevel) {
      level = this.controller.developmentLevel;
    }

    this._level = level;
    this._levelInputRef.value.valueAsNumber = level;
  };

  private handleQualityChange = () => {
    if (!this._qualityInputRef.value) {
      return;
    }

    this._quality = +this._qualityInputRef.value.value;
  };

  private handleOpenConfirmationAlert = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!this._programName) {
      return;
    }

    const ownedProgram = this.controller.getOwnedProgram(this._programName);

    if (ownedProgram) {
      const formatter = this.controller.formatter;

      const confirmationAlertParameters = {
        programName: this._programName,
        level: formatter.formatNumberDecimal(ownedProgram.level),
        quality: formatter.formatQuality(ownedProgram.quality),
      };

      this._confirmationAlertVisible = true;

      this.dispatchEvent(
        new ConfirmationAlertOpenEvent(ProgramAlert.purchaseProgramOverwrite, confirmationAlertParameters),
      );
    } else {
      this.purchase();
    }
  };

  private handleConfirmConfirmationAlert = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== ProgramAlert.purchaseProgramOverwrite) {
      return;
    }

    this._confirmationAlertVisible = false;

    this.purchase();
  };

  private purchase = () => {
    if (!this._programName) {
      return;
    }

    const isBought = this.controller.purchaseProgram(this._programName, this._level, this._quality);

    if (isBought) {
      this.dispatchEvent(new PurchaseProgramDialogCloseEvent());
    }
  };

  private handleCloseConfirmationAlert = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertCloseEvent;

    if (convertedEvent.gameAlert !== ProgramAlert.purchaseProgramOverwrite) {
      return;
    }

    this._confirmationAlertVisible = false;
  };
}
