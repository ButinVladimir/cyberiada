import { css, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import { BaseComponent } from '@shared/base-component';
import { SCREEN_WIDTH_POINTS, warningStyle } from '@shared/styles';
import type { MainframeHardwareParameterType } from '@state/mainframe-state/states/mainframe-hardware-state/types';
import { COMMON_TEXTS } from '@texts/common';
import { MainframeHardwarePanelArticleButtonsController } from './controller';
import { BuyHardwareEvent, BuyMaxHardwareEvent } from './events';

@customElement('ca-mainframe-hardware-panel-article-buttons')
export class MainframeHardwarePanelArticleButtons extends BaseComponent<MainframeHardwarePanelArticleButtonsController> {
  static styles = [
    warningStyle,
    css`
      p.warning {
        margin-top: var(--sl-spacing-3x-small);
        margin-bottom: 0;
      }

      div.buttons {
        display: flex;
        gap: var(--sl-spacing-medium);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        p.warning {
          text-align: right;
        }

        div.buttons {
          justify-content: flex-end;
        }
      }
    `,
  ];

  @property({
    attribute: 'type',
    type: String,
  })
  type!: MainframeHardwareParameterType;

  @property({
    attribute: 'max-increase',
    type: Number,
  })
  maxIncrease!: number;

  protected controller: MainframeHardwarePanelArticleButtonsController;

  private _buyButtonRef = createRef<SlButton>();
  private _warningRef = createRef<HTMLParagraphElement>();

  constructor() {
    super();

    this.controller = new MainframeHardwarePanelArticleButtonsController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    return html`
      <div class="buttons">
        <sl-button variant="default" type="button" size="medium" @click=${this.handleBuyMax}>
          ${COMMON_TEXTS.buyMax()}
        </sl-button>

        <sl-button
          ${ref(this._buyButtonRef)}
          disabled
          variant="primary"
          type="button"
          size="medium"
          @click=${this.handlePurchase}
        >
        </sl-button>
      </div>

      <p ${ref(this._warningRef)} class="warning"></p>
    `;
  }

  private calculateIncrease(): number {
    return Math.max(
      Math.min(this.maxIncrease, this.controller.developmentLevel - this.controller.getLevel(this.type)),
      1,
    );
  }

  private getWarning(): string {
    if (this.controller.developmentLevel === this.controller.getLevel(this.type)) {
      return COMMON_TEXTS.higherDevelopmentLevelRequired();
    }

    const increase = this.calculateIncrease();
    const cost = this.controller.getPurchaseCost(increase, this.type);
    const moneyGrowth = this.controller.moneyGrowth;
    const moneyDiff = cost - this.controller.money;

    if (moneyDiff > 0) {
      if (moneyGrowth <= 0) {
        return COMMON_TEXTS.notEnoughMoney();
      }

      const time = this.controller.formatter.formatTimeShort(moneyDiff / moneyGrowth);

      return COMMON_TEXTS.willBeAvailableIn(time);
    }

    return '';
  }

  private handlePurchase = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new BuyHardwareEvent());
  };

  private handleBuyMax = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new BuyMaxHardwareEvent());
  };

  private handlePartialUpdate = () => {
    if (this._warningRef.value) {
      const warning = this.getWarning();

      this._warningRef.value.textContent = warning;
    }

    if (this._buyButtonRef.value) {
      const formatter = this.controller.formatter;
      const increase = this.calculateIncrease();

      const buttonDisabled = !this.controller.checkCanPurchase(increase, this.type);
      const cost = this.controller.getPurchaseCost(increase, this.type);

      const formattedIncrease = formatter.formatNumberDecimal(increase);
      const formattedCost = formatter.formatNumberFloat(cost);

      this._buyButtonRef.value.textContent = COMMON_TEXTS.buyIncrease(formattedIncrease, formattedCost);
      this._buyButtonRef.value.disabled = buttonDisabled;
    }
  };
}
