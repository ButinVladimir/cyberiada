import { LitElement, css, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { PROGRAMS } from '@state/progam-factory/constants';
import { ProgramName } from '@state/progam-factory/types';
import { PurchaseProgramDialogClose } from './events';
import { QUALITIES } from '@shared/constants';
import { PurchaseProgramDialogController } from './controller';

@customElement('ca-purchase-program-dialog')
export class PurchaseProgramDialog extends LitElement {
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

    ca-program-description[program-name] {
      margin-top: var(--sl-spacing-medium);
      margin-bottom: 0;
    }

    span.input-label {
      font-size: var(--sl-font-size-medium);
      line-height: var(--sl-line-height-dense);
    }

    div.footer {
      display: flex;
    }
  `;

  private _purchaseProgramDialogController: PurchaseProgramDialogController;

  @query('sl-select[name="program"]')
  private _programInput!: SlSelect;

  @query('sl-input[name="level"]')
  private _levelInput!: SlInput;

  @query('sl-select[name="quality"]')
  private _qualityInput!: SlSelect;

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

  constructor() {
    super();

    this._purchaseProgramDialogController = new PurchaseProgramDialogController(this);
  }

  updated(_changedProperties: Map<string, any>) {
    if (_changedProperties.get('isOpen') === false) {
      this._programName = undefined;
      this._level = 1;
      this._quality = 0;
    }
  }

  render() {
    const formatter = this._purchaseProgramDialogController.formatter;
    const cityLevel = this._purchaseProgramDialogController.cityLevel;

    const program = this._programName
      ? this._purchaseProgramDialogController.getProgram(this._programName, this._level, this._quality)
      : undefined;
    const cost = program ? program.cost : 0;

    const submitButtonValues = JSON.stringify({ cost: formatter.formatNumberLong(cost) });

    const submitButtonDisabled = !(program && this._level <= cityLevel);

    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">
          <intl-message label="ui:mainframe:ownedPrograms:purchaseProgram"> Purchase a program </intl-message>
        </h4>

        <div class="body">
          <p class="hint">
            <intl-message label="ui:mainframe:ownedPrograms:purchaseProgramDialogHint">
              Select program type, level and quality to purchase it.
            </intl-message>
          </p>

          <div class="inputs-container">
            <sl-select name="program" value=${this._programName ?? ''} hoist @sl-change=${this.handleProgramChange}>
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
              name="level"
              value=${this._level}
              type="number"
              min="1"
              max=${cityLevel}
              step="1"
              @sl-change=${this.handleLevelChange}
            >
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:level">Level</intl-message>
              </span>
            </sl-input>

            <sl-select name="quality" value=${this._quality} hoist @sl-change=${this.handleQualityChange}>
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:quality">Quality</intl-message>
              </span>

              ${QUALITIES.map(
                (quality) => html` <sl-option value=${quality}> ${formatter.formatQuality(quality)} </sl-option>`,
              )}
            </sl-select>
          </div>

          <ca-program-description
            program-name=${ifDefined(this._programName)}
            level=${this._level}
            quality=${this._quality}
            threads=${1}
          >
          </ca-program-description>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:close"> Close </intl-message>
        </sl-button>

        <ca-purchase-program-dialog-submit-button
          slot="footer"
          ?disabled=${submitButtonDisabled}
          cost=${cost}
          @click=${this.handlePurchase}
        >
          <intl-message label="ui:mainframe:ownedPrograms:purchase" value=${submitButtonValues}>
            Purchase
          </intl-message>
        </ca-purchase-program-dialog-submit-button>
      </sl-dialog>
    `;
  }

  private handleClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new PurchaseProgramDialogClose());
  };

  private handleProgramChange = () => {
    this._programName = this._programInput.value as ProgramName;
  };

  private handleLevelChange = () => {
    let level = this._levelInput.valueAsNumber;

    if (level < 1) {
      level = 1;
    }

    if (level > this._purchaseProgramDialogController.cityLevel) {
      level = this._purchaseProgramDialogController.cityLevel;
    }

    this._level = level;
    this._levelInput.valueAsNumber = level;
  };

  private handleQualityChange = () => {
    this._quality = +this._qualityInput.value;
  };

  private handlePurchase = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!this._programName) {
      return;
    }

    const isBought = this._purchaseProgramDialogController.purchaseProgram(
      this._programName,
      this._level,
      this._quality,
    );

    if (isBought) {
      this.dispatchEvent(new PurchaseProgramDialogClose());
    }
  };
}
