import { css, html } from 'lit';
import { localized, msg, str } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import { BaseComponent } from '@shared/base-component';
import { warningStyle } from '@shared/styles';
import type { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { COMMON_TEXTS } from '@texts/common';
import { PurchaseProgramDialogButtonsController } from './controller';
import { BuyProgramEvent, CancelEvent } from './events';

@localized()
@customElement('ca-purchase-program-dialog-buttons')
export class PurchaseProgramDialogButtons extends BaseComponent {
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

  hasPartialUpdate = true;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName?: ProgramName;

  @property({
    attribute: 'level',
    type: Number,
  })
  level!: number;

  @property({
    attribute: 'quality',
    type: Number,
  })
  quality!: number;

  private _controller: PurchaseProgramDialogButtonsController;

  private _warningRef = createRef<HTMLParagraphElement>();
  private _purchaseButtonRef = createRef<SlButton>();

  constructor() {
    super();

    this._controller = new PurchaseProgramDialogButtonsController(this);
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
          @click=${this.handlePurchase}
        >
          ${COMMON_TEXTS.purchase()}
        </sl-button>
      </div>
    `;
  }

  handlePartialUpdate = () => {
    if (this._warningRef.value) {
      this._warningRef.value.textContent = this.getWarning();
    }

    if (this._purchaseButtonRef.value) {
      this.updatePurchaseButton();
    }
  };

  private getWarning(): string {
    if (!this.programName) {
      return msg('Select program');
    }

    const formatter = this._controller.formatter;

    const cost = this._controller.getProgramCost(this.programName, this.quality, this.level);
    const moneyGrowth = this._controller.moneyGrowth;
    const moneyDiff = cost - this._controller.money;

    if (moneyDiff > 0) {
      if (moneyGrowth <= 0) {
        return COMMON_TEXTS.notEnoughMoney();
      }

      const time = formatter.formatTimeShort(moneyDiff / moneyGrowth);

      return COMMON_TEXTS.willBeAvailableIn(time);
    }

    const ownedProgram = this._controller.getOwnedProgram(this.programName!);
    if (ownedProgram) {
      const formattedLevel = formatter.formatLevel(ownedProgram.level);
      const formattedQuality = formatter.formatQuality(ownedProgram.quality);

      return msg(str`Program is already bought with quality ${formattedQuality} and level ${formattedLevel}`);
    }

    return '';
  }

  private updatePurchaseButton(): void {
    const { money } = this._controller;

    const cost = this.programName ? this._controller.getProgramCost(this.programName, this.quality, this.level) : 0;

    const purchaseButtonDisabled = !(
      this.programName &&
      cost <= money &&
      this._controller.isProgramAvailable(this.programName, this.quality, this.level)
    );

    this._purchaseButtonRef.value!.disabled = purchaseButtonDisabled;
  }

  private handleCancel = () => {
    this.dispatchEvent(new CancelEvent());
  };

  private handlePurchase = () => {
    this.dispatchEvent(new BuyProgramEvent());
  };
}
