import { css, html } from 'lit';
import { customElement, queryAll } from 'lit/decorators.js';
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
import { PurchaseCloneDialogWarning } from './types';

@localized()
@customElement('ca-purchase-clone-dialog-buttons')
export class PurchaseCloneDialogButtons extends BaseComponent {
  static styles = [
    warningStyle,
    css`
      p.warning {
        display: none;
        margin-top: var(--sl-spacing-3x-small);
        margin-bottom: 0;
      }

      p.warning.visible {
        display: block;
      }

      div.buttons {
        display: flex;
        justify-content: flex-end;
        gap: var(--sl-spacing-medium);
      }
    `,
  ];

  hasPartialUpdate = true;

  private _controller: PurchaseCloneDialogButtonsController;

  @consume({ context: temporaryCloneContext, subscribe: true })
  private _clone?: IClone;

  @queryAll('p[data-warning]')
  private _warningElements!: NodeListOf<HTMLParagraphElement>;

  private _purchaseButtonRef = createRef<SlButton>();

  private _availableTimeRef = createRef<HTMLSpanElement>();

  private _warning?: PurchaseCloneDialogWarning;

  constructor() {
    super();

    this._controller = new PurchaseCloneDialogButtonsController(this);
  }

  performUpdate() {
    this._warning = this.selectInitialWarning();

    super.performUpdate();
  }

  render() {
    return html`
      ${this.renderWarnings()}

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
          ${COMMON_TEXTS.purchase()}
        </sl-button>
      </div>
    `;
  }

  handlePartialUpdate = () => {
    const warning = this.selectWarning();
    this._warningElements.forEach((warningElement) => {
      if (warningElement.dataset.warning === warning) {
        warningElement.classList.add('visible');
      } else {
        warningElement.classList.remove('visible');
      }
    });

    this.updateAvailabilityTimer();
    this.updatePurchaseButton();
  };

  private renderWarnings = () => {
    return html`
      <p class="warning" data-warning=${PurchaseCloneDialogWarning.selectTemplate}>
        ${msg('Select clone template name')}
      </p>
      <p class="warning" data-warning=${PurchaseCloneDialogWarning.enterCloneName}>${msg('Enter clone name')}</p>
      <p class="warning" data-warning=${PurchaseCloneDialogWarning.notEnoughSynchronization}>
        ${msg('Not enough synchronization')}
      </p>
      <p class="warning" data-warning=${PurchaseCloneDialogWarning.notEnoughMoney}>${COMMON_TEXTS.notEnoughMoney()}</p>
      <p class="warning" data-warning=${PurchaseCloneDialogWarning.willBeAvailableIn}>
        ${COMMON_TEXTS.willBeAvailableInNew(html`<span ${ref(this._availableTimeRef)}></span>`)}
      </p>
    `;
  };

  private selectInitialWarning(): PurchaseCloneDialogWarning | undefined {
    if (!this._clone) {
      return PurchaseCloneDialogWarning.selectTemplate;
    }

    if (!this._clone.name) {
      return PurchaseCloneDialogWarning.enterCloneName;
    }

    const synchronization = this._controller.getCloneSynchronization(this._clone.templateName, this._clone.quality);
    if (synchronization > this._controller.availableSynchronization) {
      return PurchaseCloneDialogWarning.notEnoughSynchronization;
    }

    return undefined;
  }

  private selectWarning(): PurchaseCloneDialogWarning | undefined {
    if (!this._clone) {
      return PurchaseCloneDialogWarning.selectTemplate;
    }

    if (this._warning) {
      return this._warning;
    }

    const cost = this._controller.getCloneCost(this._clone.templateName, this._clone.quality, this._clone.level);
    const moneyGrowth = this._controller.moneyGrowth;
    const moneyDiff = cost - this._controller.money;

    if (moneyDiff > 0) {
      if (moneyGrowth <= 0) {
        return PurchaseCloneDialogWarning.notEnoughMoney;
      }

      return PurchaseCloneDialogWarning.willBeAvailableIn;
    }

    return this._warning;
  }

  private updateAvailabilityTimer(): void {
    if (!this._clone) {
      return;
    }

    if (!this._availableTimeRef.value) {
      return;
    }

    const cost = this._controller.getCloneCost(this._clone.templateName, this._clone.quality, this._clone.level);
    const moneyGrowth = this._controller.moneyGrowth;
    const moneyDiff = cost - this._controller.money;

    if (moneyDiff < 0 || moneyGrowth < 0) {
      this._availableTimeRef.value.textContent = '';
    } else {
      const formattedTime = this._controller.formatter.formatTimeShort(moneyDiff / moneyGrowth);
      this._availableTimeRef.value.textContent = formattedTime;
    }
  }

  private updatePurchaseButton(): void {
    if (!this._purchaseButtonRef.value) {
      return;
    }

    if (!this._clone) {
      this._purchaseButtonRef.value.disabled = true;
      return;
    }

    const { money } = this._controller;

    const cost = this._controller.getCloneCost(this._clone.templateName, this._clone.quality, this._clone.level);
    const synchronization = this._controller.getCloneSynchronization(this._clone.templateName, this._clone.quality);
    const cloneAvailable = this._controller.isCloneAvailable(
      this._clone.templateName,
      this._clone.quality,
      this._clone.level,
    );

    const purchaseButtonDisabled = !(
      this._clone &&
      this._clone.name &&
      cloneAvailable &&
      synchronization <= this._controller.availableSynchronization &&
      cost <= money
    );

    this._purchaseButtonRef.value.disabled = purchaseButtonDisabled;
  }

  private handleCancel = () => {
    this.dispatchEvent(new CancelEvent());
  };

  private handlePurchaseClone = () => {
    this.dispatchEvent(new PurchaseCloneEvent());
  };
}
