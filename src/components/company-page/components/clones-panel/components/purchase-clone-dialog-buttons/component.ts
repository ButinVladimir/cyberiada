import { css, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { msg, localized } from '@lit/localize';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import { BaseComponent } from '@shared/base-component';
import { warningStyle } from '@shared/styles';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';
import { PurchaseCloneDialogController } from './controller';
import { PurchaseCloneEvent, CancelEvent } from './events';
import { COMMON_TEXTS } from '@texts/index';

@localized()
@customElement('ca-purchase-clone-dialog-buttons')
export class PurchaseCloneDialogButtons extends BaseComponent<PurchaseCloneDialogController> {
  static styles = [
    warningStyle,
    css`
      p.warning {
        margin-top: var(--sl-spacing-3x-small);
        margin-bottom: 0;
      }
      div.buttons {
        display: flex;
        justify-content: flex-end;
        gap: var(--sl-spacing-medium);
      }
    `,
  ];

  @property({
    attribute: 'clone-template-name',
    type: String,
  })
  cloneTemplateName?: CloneTemplateName;

  @property({
    attribute: 'quality',
    type: Number,
  })
  quality!: number;

  @property({
    attribute: 'level',
    type: Number,
  })
  level!: number;

  @property({
    attribute: 'name',
    type: String,
  })
  name!: string;

  protected controller: PurchaseCloneDialogController;

  private _warningRef = createRef<HTMLParagraphElement>();
  private _purchaseButtonRef = createRef<SlButton>();

  constructor() {
    super();

    this.controller = new PurchaseCloneDialogController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    return html`
      <p ${ref(this._warningRef)} class="warning"></p>

      <div class="buttons">
        <sl-button size="medium" variant="default" outline @click=${this.handleCancel}>
          ${COMMON_TEXTS.close()}
        </sl-button>

        <sl-button
          ${ref(this._purchaseButtonRef)}
          size="medium"
          variant="primary"
          disabled
          @click=${this.handlePurchaseClone}
        >
        </sl-button>
      </div>
    `;
  }

  private handlePartialUpdate = () => {
    if (this._warningRef.value) {
      this._warningRef.value.textContent = this.getWarning();
    }

    if (this._purchaseButtonRef.value) {
      this.updatePurchaseButton();
    }
  };

  private getWarning(): string {
    if (!this.name) {
      return msg('Enter clone name');
    }

    if (!this.cloneTemplateName) {
      return msg('Select clone template name');
    }

    const synchronization = this.controller.getCloneSynchronization(this.cloneTemplateName, this.quality);
    if (synchronization > this.controller.availableSynchronization) {
      return msg('Not enough synchronization');
    }

    const formatter = this.controller.formatter;

    const cost = this.controller.getCloneCost(this.cloneTemplateName, this.quality, this.level);
    const moneyGrowth = this.controller.moneyGrowth;
    const moneyDiff = cost - this.controller.money;

    if (moneyDiff > 0) {
      if (moneyGrowth <= 0) {
        return COMMON_TEXTS.notEnoughMoney();
      }

      const time = formatter.formatTimeShort(moneyDiff / moneyGrowth);

      return COMMON_TEXTS.willBeAvailableIn(time);
    }

    return '';
  }

  private updatePurchaseButton(): void {
    const { formatter, money } = this.controller;

    const cost = this.cloneTemplateName
      ? this.controller.getCloneCost(this.cloneTemplateName, this.quality, this.level)
      : 0;
    const synchronization = this.cloneTemplateName
      ? this.controller.getCloneSynchronization(this.cloneTemplateName, this.quality)
      : 0;
    const cloneAvailable = this.cloneTemplateName
      ? this.controller.isCloneAvailable(this.cloneTemplateName, this.quality, this.level)
      : false;

    const purchaseButtonDisabled = !(
      this.cloneTemplateName &&
      this.name &&
      cloneAvailable &&
      synchronization <= this.controller.availableSynchronization &&
      cost <= money
    );

    const formattedCost = formatter.formatNumberFloat(cost);

    this._purchaseButtonRef.value!.disabled = purchaseButtonDisabled;
    this._purchaseButtonRef.value!.textContent = COMMON_TEXTS.purchase(formattedCost);
  }

  private handleCancel = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new CancelEvent());
  };

  private handlePurchaseClone = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new PurchaseCloneEvent());
  };
}
