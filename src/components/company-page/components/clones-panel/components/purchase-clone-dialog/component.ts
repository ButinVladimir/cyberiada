import { css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import clamp from 'lodash/clamp';
import { provide } from '@lit/context';
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
import { type IClone } from '@state/company-state';
import { PurchaseCloneDialogCloseEvent } from './events';
import { PurchaseCloneDialogController } from './controller';
import { temporaryCloneContext } from './contexts';

@localized()
@customElement('ca-purchase-clone-dialog')
export class PurchaseCloneDialog extends BaseComponent {
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

  private _controller: PurchaseCloneDialogController;

  private _nameInputRef = createRef<SlInput>();

  private _cloneTemplateInputRef = createRef<SlSelect>();

  private _tierInputRef = createRef<SlSelect>();

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
  private _tier = 0;

  @state()
  private _level = 1;

  @provide({ context: temporaryCloneContext })
  private _clone?: IClone;

  constructor() {
    super();

    this._controller = new PurchaseCloneDialogController(this);
  }

  performUpdate() {
    if (this._cloneTemplateName !== undefined) {
      this._clone = this._controller.getClone(this._name, this._cloneTemplateName, this._tier, this._level);
    } else {
      this._clone = undefined;
    }

    super.performUpdate();
  }

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    if (_changedProperties.has('isOpen')) {
      this._name = '';
      this._cloneTemplateName = undefined;
      this._tier = 0;
      this._level = this._controller.developmentLevel;

      if (this.isOpen) {
        this.generateName();
      }
    }
  }

  render() {
    const { developmentLevel } = this._controller;

    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${msg('Purchase clone')}</h4>

        <div class="body">
          <p class="hint">
            ${msg(`Select clone name, template, tier and level to purchase it.
Level cannot be above current development level.
Tier is limited depending on gained favors.
Synchronization is earned by capturing districts and gaining certain favors.`)}
          </p>

          <div class="inputs-container">
            <sl-input
              ${ref(this._nameInputRef)}
              name="name"
              value=${this._name}
              autocomplete="off"
              @sl-change=${this.handleNameChange}
            >
              <span class="input-label" slot="label"> ${msg('Name')} </span>

              <sl-icon-button
                slot="suffix"
                label=${msg('Generate name')}
                name="dice-4"
                @click=${this.handleGenerateName}
              >
              </sl-icon-button>
            </sl-input>

            <sl-select
              ${ref(this._cloneTemplateInputRef)}
              name="cloneTemplate"
              value=${this._cloneTemplateName ?? ''}
              hoist
              @sl-change=${this.handleCloneTemplateChange}
            >
              <span class="input-label" slot="label"> ${msg('Clone template')} </span>

              ${this._controller.listAvailableCloneTemplates().map(this.renderCloneTemplateOption)}
            </sl-select>

            <sl-select
              ${ref(this._tierInputRef)}
              name="tier"
              value=${this._tier}
              hoist
              @sl-change=${this.handleTierChange}
            >
              <span class="input-label" slot="label"> ${COMMON_TEXTS.tier()} </span>

              ${this.renderTierOptions()}
            </sl-select>

            <sl-input
              ${ref(this._levelInputRef)}
              name="level"
              value=${this._level + 1}
              type="number"
              inputmode="decimal"
              min="1"
              max=${developmentLevel + 1}
              step="1"
              @sl-change=${this.handleLevelChange}
            >
              <span class="input-label" slot="label"> ${COMMON_TEXTS.level()} </span>
            </sl-input>
          </div>

          <ca-purchase-clone-dialog-description></ca-purchase-clone-dialog-description>
        </div>

        <ca-purchase-clone-dialog-buttons
          slot="footer"
          level=${this._level}
          tier=${this._tier}
          name=${this._name}
          @purchase-clone=${this.handlePurchaseClone}
          @cancel=${this.handleClose}
        >
        </ca-purchase-clone-dialog-buttons>
      </sl-dialog>
    `;
  }

  private renderCloneTemplateOption = (cloneTemplate: CloneTemplateName) => {
    return html`<sl-option value=${cloneTemplate}> ${CLONE_TEMPLATE_TEXTS[cloneTemplate].title()} </sl-option>`;
  };

  private renderTierOptions = () => {
    const highestAvailableTier = this._cloneTemplateName
      ? this._controller.getHighestAvailableTier(this._cloneTemplateName)
      : 0;
    const formatter = this._controller.formatter;

    const result: unknown[] = [];

    for (let tier = 0; tier <= highestAvailableTier; tier++) {
      result.push(html`<sl-option value=${tier}> ${formatter.formatTier(tier)} </sl-option>`);
    }

    return result;
  };

  private handleClose = () => {
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

  private handleTierChange = () => {
    if (!this._tierInputRef.value) {
      return;
    }

    const tier = +this._tierInputRef.value.value;
    this._tier = tier;
  };

  private handleLevelChange = () => {
    if (!this._levelInputRef.value) {
      return;
    }

    const level = clamp(this._levelInputRef.value.valueAsNumber - 1, 0, this._controller.developmentLevel);
    this._level = level;
    this._levelInputRef.value.valueAsNumber = level + 1;
  };

  private handlePurchaseClone = () => {
    if (!this._cloneTemplateName) {
      return;
    }

    if (!this._name) {
      return;
    }

    const isBought = this._controller.purchaseClone({
      name: this._name,
      templateName: this._cloneTemplateName,
      tier: this._tier,
      level: this._level,
    });

    if (isBought) {
      this.dispatchEvent(new PurchaseCloneDialogCloseEvent());
    }
  };

  private handleGenerateName = () => {
    this.generateName();
  };

  private generateName(): void {
    this._controller
      .generateName()
      .then((name) => {
        this._name = name;
      })
      .catch((e) => console.error(e));
  }
}
