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
import { DescriptionRenderer } from './description-renderer';
import { IDescriptionRenderer } from './interfaces';

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
    const { formatter, money, developmentLevel } = this.controller;

    const program = this._programName
      ? this.controller.getSelectedProgram(this._programName, this._level, this._quality)
      : undefined;
    const cost = program ? program.cost : 0;

    const submitButtonValues = JSON.stringify({ cost: formatter.formatNumberLong(cost) });

    const submitButtonDisabled = !(program && this._level <= developmentLevel && cost <= money);

    const descriptionRenderer: IDescriptionRenderer | undefined = program
      ? new DescriptionRenderer({
          formatter: this.controller.formatter,
          ram: this.controller.ram,
          cores: this.controller.cores,
          program: program,
          ownedProgram: this._programName ? this.controller.getOwnedProgram(this._programName) : undefined,
        })
      : undefined;

    return html`
      <sl-dialog ?open=${this.isOpen && !this._confirmationAlertVisible} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">
          <intl-message label="ui:mainframe:programs:purchaseProgram"> Purchase a program </intl-message>
        </h4>

        <div class="body">
          <p class="hint">
            <intl-message label="ui:mainframe:programs:purchaseProgramDialogHint">
              Select program type, level and quality to purchase it.
            </intl-message>
          </p>

          <div class="inputs-container">
            <sl-select
              ${ref(this._programInputRef)}
              name="program"
              value=${this._programName ?? ''}
              hoist
              @sl-change=${this.handleProgramChange}
            >
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:program">Program</intl-message>
              </span>

              ${PROGRAMS.map(
                (program) =>
                  html`<sl-option value=${program}>
                    <intl-message label="programs:${program}:name"> Program </intl-message>
                  </sl-option>`,
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
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:level">Level</intl-message>
              </span>
            </sl-input>

            <sl-select
              ${ref(this._qualityInputRef)}
              name="quality"
              value=${this._quality}
              hoist
              @sl-change=${this.handleQualityChange}
            >
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:quality">Quality</intl-message>
              </span>

              ${QUALITIES.map(
                (quality) => html` <sl-option value=${quality}> ${formatter.formatQuality(quality)} </sl-option>`,
              )}
            </sl-select>
          </div>

          ${descriptionRenderer ? descriptionRenderer.renderDescription() : null}
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:close"> Close </intl-message>
        </sl-button>

        <ca-purchase-tooltip cost=${cost} level=${this._level} slot="footer">
          <sl-button
            size="medium"
            variant="primary"
            ?disabled=${submitButtonDisabled}
            @click=${this.handleOpenConfirmationAlert}
          >
            <intl-message label="ui:mainframe:programs:purchase" value=${submitButtonValues}> Purchase </intl-message>
          </sl-button>
        </ca-purchase-tooltip>
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

      const confirmationAlertParameters = JSON.stringify({
        programName: this._programName,
        level: formatter.formatNumberDecimal(ownedProgram.level),
        quality: formatter.formatQuality(ownedProgram.quality),
      });

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
