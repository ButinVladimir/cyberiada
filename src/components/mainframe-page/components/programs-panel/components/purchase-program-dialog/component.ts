import { css, html, nothing } from 'lit';
import { localized, msg, str } from '@lit/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { BaseComponent } from '@shared/base-component';
import type { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { ProgramAlert } from '@shared/types';
import {
  inputLabelStyle,
  hintStyle,
  sectionTitleStyle,
  mediumModalStyle,
  modalBodyScrollStyle,
  SCREEN_WIDTH_POINTS,
} from '@shared/styles';
import { PROGRAM_TEXTS, COMMON_TEXTS } from '@texts/index';
import { PurchaseProgramDialogCloseEvent } from './events';
import { PurchaseProgramDialogController } from './controller';

@localized()
@customElement('ca-purchase-program-dialog')
export class PurchaseProgramDialog extends BaseComponent<PurchaseProgramDialogController> {
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
      }

      p.hint {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-medium);
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

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        div.inputs-container {
          grid-template-rows: auto;
          grid-template-columns: 2fr 1fr 1fr;
        }
      }
    `,
  ];

  protected controller: PurchaseProgramDialogController;

  private _programInputRef = createRef<SlSelect>();

  private _qualityInputRef = createRef<SlSelect>();

  private _levelInputRef = createRef<SlInput>();

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  @state()
  private _programName?: ProgramName = undefined;

  @state()
  private _quality = 0;

  @state()
  private _level = 1;

  constructor() {
    super();

    this.controller = new PurchaseProgramDialogController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmConfirmationAlert);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmConfirmationAlert);
  }

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    if (_changedProperties.has('isOpen')) {
      this._programName = undefined;
      this._quality = 0;
      this._level = this.controller.developmentLevel;
    }
  }

  render() {
    const { developmentLevel } = this.controller;

    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${msg('Purchase program')}</h4>

        <div class="body">
          <p class="hint">
            ${msg(`Select program type, level and quality to purchase it.
Level cannot be above current development level.
Quality is limited depending on gained favors.
If you already have program with same name, old one will be replaced with new one.`)}
          </p>

          <div class="inputs-container">
            <sl-select
              ${ref(this._programInputRef)}
              name="program"
              value=${this._programName ?? ''}
              hoist
              @sl-change=${this.handleProgramChange}
            >
              <span class="input-label" slot="label"> ${msg('Program')} </span>

              ${this.controller
                .listAvailablePrograms()
                .map((program) => html`<sl-option value=${program}> ${PROGRAM_TEXTS[program].title()} </sl-option>`)}
            </sl-select>

            <sl-select
              ${ref(this._qualityInputRef)}
              name="quality"
              value=${this._quality}
              hoist
              @sl-change=${this.handleQualityChange}
            >
              <span class="input-label" slot="label"> ${COMMON_TEXTS.quality()} </span>

              ${this.renderQualityOptions()}
            </sl-select>

            <sl-input
              ${ref(this._levelInputRef)}
              name="level"
              value=${this._level}
              type="number"
              inputmode="decimal"
              min="1"
              max=${developmentLevel}
              step="1"
              @sl-change=${this.handleLevelChange}
            >
              <span class="input-label" slot="label"> ${COMMON_TEXTS.level()} </span>
            </sl-input>
          </div>

          ${this._programName
            ? html`<ca-program-diff-text
                program-name=${this._programName}
                level=${this._level}
                quality=${this._quality}
              >
              </ca-program-diff-text>`
            : nothing}
        </div>

        <ca-purchase-program-dialog-buttons
          slot="footer"
          program-name=${ifDefined(this._programName)}
          level=${this._level}
          quality=${this._quality}
          @buy-program=${this.handleOpenConfirmationAlert}
          @cancel=${this.handleClose}
        >
        </ca-purchase-program-dialog-buttons>
      </sl-dialog>
    `;
  }

  private renderQualityOptions = () => {
    const highestAvailableQuality = this._programName
      ? this.controller.getHighestAvailableQuality(this._programName)
      : 0;
    const formatter = this.controller.formatter;

    const result: unknown[] = [];
    for (let quality = 0; quality <= highestAvailableQuality; quality++) {
      result.push(html`<sl-option value=${quality}> ${formatter.formatQuality(quality)} </sl-option>`);
    }

    return result;
  };

  private handleClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new PurchaseProgramDialogCloseEvent());
  };

  private handleProgramChange = () => {
    if (!this._programInputRef.value) {
      return;
    }

    const programName = this._programInputRef.value.value as ProgramName;
    this._programName = programName;
  };

  private handleQualityChange = () => {
    if (!this._qualityInputRef.value) {
      return;
    }

    const quality = +this._qualityInputRef.value.value;
    this._quality = quality;
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

  private handleOpenConfirmationAlert = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!this._programName) {
      return;
    }

    const ownedProgram = this.controller.getOwnedProgram(this._programName);

    if (ownedProgram) {
      const formatter = this.controller.formatter;

      const programTitle = PROGRAM_TEXTS[this._programName].title();
      const formattedLevel = formatter.formatNumberDecimal(ownedProgram.level);
      const formattedQuality = formatter.formatQuality(ownedProgram.quality);

      this.dispatchEvent(
        new ConfirmationAlertOpenEvent(
          ProgramAlert.purchaseProgramOverwrite,
          msg(
            str`Are you sure want to purchase program "${programTitle}"? This will replace your current program with quality ${formattedQuality} and level ${formattedLevel}.`,
          ),
        ),
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

    this.purchase();
  };

  private purchase = () => {
    if (!this._programName) {
      return;
    }

    const isBought = this.controller.purchaseProgram(this._programName, this._quality, this._level);

    if (isBought) {
      this.dispatchEvent(new PurchaseProgramDialogCloseEvent());
    }
  };
}
