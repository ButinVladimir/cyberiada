import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import type { MainframeHardwareParameterType } from '@state/mainframe-state/states/mainframe-hardware-state/types';
import { MainframeHardwarePanelArticleBuyButtonController } from './controller';
import { BuyHardwareEvent } from './events';

@customElement('ca-mainframe-hardware-panel-article-buy-button')
export class MainframeHardwarePanelArticle extends BaseComponent<MainframeHardwarePanelArticleBuyButtonController> {
  static styles = css``;

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

  protected controller: MainframeHardwarePanelArticleBuyButtonController;

  constructor() {
    super();

    this.controller = new MainframeHardwarePanelArticleBuyButtonController(this);
  }

  render() {
    const increase = this.calculateIncrease();
    const formatter = this.controller.formatter;

    const level = this.controller.getLevel(this.type);
    const buttonDisabled = !this.controller.checkCanPurchase(increase, this.type);
    const cost = this.controller.getPurchaseCost(increase, this.type);

    return html`
      <ca-purchase-tooltip cost=${cost} level=${level + 1}>
        <sl-button
          variant="primary"
          type="button"
          size="medium"
          ?disabled=${buttonDisabled}
          @click=${this.handlePurchase}
        >
          ${t('mainframe.hardware.buy', {
            ns: 'ui',
            cost: formatter.formatNumberFloat(cost),
            increase: formatter.formatNumberDecimal(increase),
          })}
        </sl-button>
      </ca-purchase-tooltip>
    `;
  }

  private calculateIncrease(): number {
    return Math.max(
      Math.min(this.maxIncrease, this.controller.developmentLevel - this.controller.getLevel(this.type)),
      1,
    );
  }

  private handlePurchase = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new BuyHardwareEvent());
  };
}
