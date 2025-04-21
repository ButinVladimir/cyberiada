import { css, html, nothing } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { BaseComponent } from '@shared/base-component';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';
import {
  inputLabelStyle,
  hintStyle,
  sectionTitleStyle,
  mediumModalStyle,
  modalBodyScrollStyle,
  SCREEN_WIDTH_POINTS,
} from '@shared/styles';
import { COMMON_TEXTS, CLONE_TEMPLATE_TEXTS } from '@texts/index';
import { PurchaseCloneDialogCloseEvent } from './events';
import { PurchaseCloneDialogController } from './controller';
import { ifDefined } from 'lit/directives/if-defined.js';

@localized()
@customElement('ca-purchase-clone-dialog')
export class PurchaseCloneDialog extends BaseComponent<PurchaseCloneDialogController> {
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
          grid-template-rows: 1fr 1fr;
          grid-template-columns: 1fr 1fr;
        }
      }
    `,
  ];

  protected controller: PurchaseCloneDialogController;

  private _nameInputRef = createRef<SlInput>();

  private _cloneTemplateInputRef = createRef<SlSelect>();

  private _qualityInputRef = createRef<SlSelect>();

  private _levelInputRef = createRef<SlInput>();

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  @state()
  private _name = '';

  @state()
  private _cloneTemplateName?: CloneTemplateName = undefined;

  @state()
  private _quality = 0;

  @state()
  private _level = 1;

  constructor() {
    super();

    this.controller = new PurchaseCloneDialogController(this);
  }

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    if (_changedProperties.has('isOpen')) {
      this._name = '';
      this._cloneTemplateName = undefined;
      this._quality = 0;
      this._level = this.controller.developmentLevel;
    }
  }

  render() {
    const { developmentLevel } = this.controller;

    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${msg('Purchase clone')}</h4>

        <div class="body">
          <p class="hint">
            ${msg(`Select clone name, template, level and quality to purchase it.
Level cannot be above current development level.
Quality is limited depending on gained favors.
Synchronization is earned by capturing districts and gaining certain favors.`)}
          </p>

          <div class="inputs-container">
            <sl-input ${ref(this._nameInputRef)} name="name" value=${this._name} @sl-change=${this.handleNameChange}>
              <span class="input-label" slot="label"> ${msg('Name')} </span>
            </sl-input>

            <sl-select
              ${ref(this._cloneTemplateInputRef)}
              name="cloneTemplate"
              value=${this._cloneTemplateName ?? ''}
              hoist
              @sl-change=${this.handleCloneTemplateChange}
            >
              <span class="input-label" slot="label"> ${msg('Clone template')} </span>

              ${this.controller
                .listAvailableCloneTemplates()
                .map(
                  (cloneTemplate) =>
                    html`<sl-option value=${cloneTemplate}>
                      ${CLONE_TEMPLATE_TEXTS[cloneTemplate].title()}
                    </sl-option>`,
                )}
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

          ${this._cloneTemplateName
            ? html`<ca-clone-dialog-description-text
                clone-template-name=${this._cloneTemplateName}
                quality=${this._quality}
                level=${this._level}
              ></ca-clone-dialog-description-text>`
            : nothing}
        </div>

        <ca-purchase-clone-dialog-buttons
          slot="footer"
          clone-template-name=${ifDefined(this._cloneTemplateName)}
          level=${this._level}
          quality=${this._quality}
          name=${this._name}
          @purchase-clone=${this.handlePurchaseClone}
          @cancel=${this.handleClose}
        >
        </ca-purchase-clone-dialog-buttons>
      </sl-dialog>
    `;
  }

  private renderQualityOptions = () => {
    const highestAvailableQuality = this._cloneTemplateName
      ? this.controller.getHighestAvailableQuality(this._cloneTemplateName)
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

    this.dispatchEvent(new PurchaseCloneDialogCloseEvent());
  };

  private handleNameChange = () => {
    if (!this._nameInputRef.value) {
      return;
    }

    this._name = this._nameInputRef.value.value;
  };

  private handleCloneTemplateChange = () => {
    if (!this._cloneTemplateInputRef.value) {
      return;
    }

    const cloneTemplateName = this._cloneTemplateInputRef.value.value as CloneTemplateName;
    this._cloneTemplateName = cloneTemplateName;
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

  private handlePurchaseClone = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!this._cloneTemplateName) {
      return;
    }

    if (!this._name) {
      return;
    }

    const isBought = this.controller.purchaseClone(this._name, this._cloneTemplateName, this._quality, this._level);

    if (isBought) {
      this.dispatchEvent(new PurchaseCloneDialogCloseEvent());
    }
  };
}
