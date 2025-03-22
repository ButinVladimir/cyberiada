import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { SCREEN_WIDTH_POINTS, warningStyle } from '@shared/styles';
import type { MainframeHardwareParameterType } from '@state/mainframe-state/states/mainframe-hardware-state/types';
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

  constructor() {
    super();

    this.controller = new MainframeHardwarePanelArticleButtonsController(this);
  }

  render() {
    const increase = this.calculateIncrease();
    const formatter = this.controller.formatter;

    const buttonDisabled = !this.controller.checkCanPurchase(increase, this.type);
    const cost = this.controller.getPurchaseCost(increase, this.type);

    const warning = this.getWarning();

    return html`
      <div class="buttons">
        <sl-button variant="default" type="button" size="medium" @click=${this.handleBuyMax}>
          ${t('mainframe.hardware.buyMax', { ns: 'ui' })}
        </sl-button>

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
      </div>

      <p class="warning">${warning}</p>
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
      return t('errors.higherDevelopmentLevelRequired', { ns: 'ui' });
    }

    const increase = this.calculateIncrease();
    const cost = this.controller.getPurchaseCost(increase, this.type);
    const moneyGrowth = this.controller.moneyGrowth;
    const moneyDiff = cost - this.controller.money;

    if (moneyDiff > 0) {
      if (moneyGrowth <= 0) {
        return t('errors.notEnoughMoney', { ns: 'ui' });
      }

      const time = this.controller.formatter.formatTimeShort(moneyDiff / moneyGrowth);

      return t('errors.willBeAvailableIn', { ns: 'ui', time });
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
}
