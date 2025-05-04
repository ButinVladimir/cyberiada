import { css, html, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { msg, localized } from '@lit/localize';
import { consume } from '@lit/context';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import { BaseComponent } from '@shared/base-component';
import { warningStyle } from '@shared/styles';
import { COMMON_TEXTS } from '@texts/index';
import { type IClone } from '@state/company-state';
import { PurchaseCloneDialogButtonsController } from './controller';
import { PurchaseCloneEvent, CancelEvent } from './events';
import { temporaryCloneContext } from '../../contexts';

@localized()
@customElement('ca-purchase-clone-dialog-buttons')
export class PurchaseCloneDialogButtons extends BaseComponent<PurchaseCloneDialogButtonsController> {
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

  protected controller: PurchaseCloneDialogButtonsController;

  @consume({ context: temporaryCloneContext, subscribe: true })
  private _clone?: IClone;

  private _warningRef = createRef<HTMLParagraphElement>();
  private _purchaseButtonRef = createRef<SlButton>();

  constructor() {
    super();

    this.controller = new PurchaseCloneDialogButtonsController(this, this.handlePartialUpdate);
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
    if (!this._clone) {
      return msg('Select clone template name');
    }

    if (!this._clone.name) {
      return msg('Enter clone name');
    }

    const synchronization = this.controller.getCloneSynchronization(this._clone.templateName, this._clone.quality);
    if (synchronization > this.controller.availableSynchronization) {
      return msg('Not enough synchronization');
    }

    const formatter = this.controller.formatter;

    const cost = this.controller.getCloneCost(this._clone.templateName, this._clone.quality, this._clone.level);
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

    const cost = this._clone
      ? this.controller.getCloneCost(this._clone.templateName, this._clone.quality, this._clone.level)
      : 0;
    const synchronization = this._clone
      ? this.controller.getCloneSynchronization(this._clone.templateName, this._clone.quality)
      : 0;
    const cloneAvailable = this._clone
      ? this.controller.isCloneAvailable(this._clone.templateName, this._clone.quality, this._clone.level)
      : false;

    const purchaseButtonDisabled = !(
      this._clone &&
      this._clone.name &&
      cloneAvailable &&
      synchronization <= this.controller.availableSynchronization &&
      cost <= money
    );

    const formattedCost = formatter.formatNumberFloat(cost);

    this._purchaseButtonRef.value!.disabled = purchaseButtonDisabled;
    this._purchaseButtonRef.value!.textContent = COMMON_TEXTS.purchase(formattedCost);
  }

  private handleCancel = () => {
    this.dispatchEvent(new CancelEvent());
  };

  private handlePurchaseClone = () => {
    this.dispatchEvent(new PurchaseCloneEvent());
  };
}
