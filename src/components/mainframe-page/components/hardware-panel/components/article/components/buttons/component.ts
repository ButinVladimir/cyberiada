import { css, html, nothing } from 'lit';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { consume } from '@lit/context';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import { type IMainframeHardwareParameter } from '@state/mainframe-state';
import { BaseComponent, SCREEN_WIDTH_POINTS, warningStyle } from '@shared/index';
import { COMMON_TEXTS } from '@texts/common';
import { MainframeHardwarePanelArticleButtonsController } from './controller';
import { BuyHardwareEvent, BuyMaxHardwareEvent } from './events';
import { MainframeHardwarePanelArticleWarning } from './types';
import { mainframeHardwareParameterContext } from '../../contexts';

@customElement('ca-mainframe-hardware-panel-article-buttons')
export class MainframeHardwarePanelArticleButtons extends BaseComponent {
  static styles = [
    warningStyle,
    css`
      p.warning {
        margin-top: var(--sl-spacing-3x-small);
        margin-bottom: 0;
        display: none;
      }

      p.warning.visible {
        display: block;
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

  hasPartialUpdate = true;

  @property({
    attribute: 'increase',
    type: Number,
  })
  increase!: number;

  private _controller: MainframeHardwarePanelArticleButtonsController;

  @queryAll('p[data-warning]')
  private _warningElements!: NodeListOf<HTMLParagraphElement>;

  private _buyButtonRef = createRef<SlButton>();
  private _buyMaxButtonRef = createRef<SlButton>();
  private _availableTimeRef = createRef<HTMLSpanElement>();

  @consume({ context: mainframeHardwareParameterContext, subscribe: true })
  private _parameter?: IMainframeHardwareParameter;

  constructor() {
    super();

    this._controller = new MainframeHardwarePanelArticleButtonsController(this);
  }

  render() {
    if (!this._parameter) {
      return nothing;
    }

    const formattedIncrease = this._controller.formatter.formatNumberDecimal(this.increase);

    return html`
      <div class="buttons">
        <sl-button
          ${ref(this._buyMaxButtonRef)}
          disabled
          variant="default"
          type="button"
          size="medium"
          @click=${this.handleBuyMax}
        >
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
          ${COMMON_TEXTS.buyIncrease(formattedIncrease)}
        </sl-button>
      </div>

      ${this.renderWarnings()}
    `;
  }

  private renderWarnings = () => {
    return html`
      <p class="warning" data-warning=${MainframeHardwarePanelArticleWarning.higherDevelopmentLevelRequired}>
        ${COMMON_TEXTS.higherDevelopmentLevelRequired()}
      </p>
      <p class="warning" data-warning=${MainframeHardwarePanelArticleWarning.notEnoughMoney}>
        ${COMMON_TEXTS.notEnoughMoney()}
      </p>
      <p class="warning" data-warning=${MainframeHardwarePanelArticleWarning.willBeAvailableIn}>
        ${COMMON_TEXTS.willBeAvailableIn(html`<span ${ref(this._availableTimeRef)}></span>`)}
      </p>
    `;
  };

  private selectWarning(): MainframeHardwarePanelArticleWarning | undefined {
    if (this._controller.developmentLevel === this._parameter!.level) {
      return MainframeHardwarePanelArticleWarning.higherDevelopmentLevelRequired;
    }

    const cost = this._parameter!.getIncreaseCost(this.increase);
    const moneyGrowth = this._controller.moneyGrowth;
    const moneyDiff = cost - this._controller.money;

    if (moneyDiff > 0) {
      if (moneyGrowth <= 0) {
        return MainframeHardwarePanelArticleWarning.notEnoughMoney;
      }

      return MainframeHardwarePanelArticleWarning.willBeAvailableIn;
    }

    return undefined;
  }

  private updateAvailabilityTimer(): void {
    if (!this._availableTimeRef.value) {
      return;
    }

    const cost = this._parameter!.getIncreaseCost(this.increase);
    const moneyGrowth = this._controller.moneyGrowth;
    const moneyDiff = cost - this._controller.money;

    if (moneyDiff < 0 || moneyGrowth < 0) {
      this._availableTimeRef.value.textContent = '';
    } else {
      const formattedTime = this._controller.formatter.formatTimeLong(moneyDiff / moneyGrowth);
      this._availableTimeRef.value.textContent = formattedTime;
    }
  }

  private handlePurchase = () => {
    this.dispatchEvent(new BuyHardwareEvent());
  };

  private handleBuyMax = () => {
    this.dispatchEvent(new BuyMaxHardwareEvent());
  };

  handlePartialUpdate = () => {
    if (!this._parameter) {
      return;
    }

    const warning = this.selectWarning();
    this._warningElements.forEach((warningElement) => {
      if (warningElement.dataset.warning === warning) {
        warningElement.classList.add('visible');
      } else {
        warningElement.classList.remove('visible');
      }
    });

    this.updateAvailabilityTimer();

    if (this._buyButtonRef.value) {
      const buttonDisabled = !this._parameter?.checkCanPurchase(this.increase);

      this._buyButtonRef.value.disabled = buttonDisabled;
    }

    if (this._buyMaxButtonRef.value) {
      const buttonDisabled = !this._parameter?.checkCanPurchase(1);

      this._buyMaxButtonRef.value.disabled = buttonDisabled;
    }
  };
}
