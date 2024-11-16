import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { MainframeHardwarePanelArticleController } from './controller';
import type { HardwarePanelArticleType } from './types';

@customElement('ca-mainframe-hardware-panel-article')
export class MainframeHardwarePanelArticle extends BaseComponent<MainframeHardwarePanelArticleController> {
  static styles = css`
    :host {
      padding: var(--sl-spacing-large);
      box-sizing: border-box;
      border: var(--ca-border);
      border-radius: var(--sl-border-radius-small);
      display: flex;
      align-items: center;
      gap: var(--sl-spacing-small);
    }

    div.text-container {
      flex: 1 1 auto;
    }

    div.button-container {
      flex: 0 0 auto;
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-medium);
      line-height: var(--sl-line-height-denser);
    }

    p.hint {
      margin: 0;
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }
  `;

  @property({
    attribute: 'type',
    type: String,
  })
  type!: HardwarePanelArticleType;

  @property({
    attribute: 'max-increase',
    type: Number,
  })
  maxIncrease!: number;

  protected controller: MainframeHardwarePanelArticleController;

  constructor() {
    super();

    this.controller = new MainframeHardwarePanelArticleController(this);
  }

  renderContent() {
    const increase = this.calculateIncrease();
    const formatter = this.controller.formatter;

    const level = this.controller.getLevel(this.type);
    const buttonDisabled = !this.controller.checkCanPurchase(increase, this.type);
    const cost = this.controller.getPurchaseCost(increase, this.type);

    const buttonValue = JSON.stringify({
      cost: formatter.formatNumberLong(cost),
      increase: formatter.formatNumberDecimal(increase),
    });

    return html`
      <div class="text-container">
        <h4 class="title">
          <intl-message label="ui:mainframe:hardware:${this.type}" value=${formatter.formatNumberDecimal(level)}
            >Level</intl-message
          >
        </h4>
        <p class="hint">
          <intl-message label="ui:mainframe:hardware:${this.type}Hint"> Higher level leads to profit. </intl-message>
        </p>
      </div>

      <div class="button-container">
        <ca-purchase-tooltip cost=${cost} level=${level + 1}>
          <sl-button variant="primary" type="button" size="medium" ?disabled=${buttonDisabled} @click=${this.handleBuy}>
            <intl-message label="ui:mainframe:hardware:buy" value=${buttonValue}> Buy </intl-message>
          </sl-button>
        </ca-purchase-tooltip>
      </div>
    `;
  }

  handleBuy = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    const increase = this.calculateIncrease();
    this.controller.purchase(increase, this.type);
  };

  private calculateIncrease(): number {
    return Math.max(
      Math.min(this.maxIncrease, this.controller.cityDevelopmentLevel - this.controller.getLevel(this.type)),
      1,
    );
  }
}
