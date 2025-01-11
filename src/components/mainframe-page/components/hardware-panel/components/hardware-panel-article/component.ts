import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import type { MainframeHardwareParameterType } from '@state/mainframe/mainframe-hardware-state/types';
import { hintStyle } from '@shared/styles';
import { MainframeHardwarePanelArticleController } from './controller';

@customElement('ca-mainframe-hardware-panel-article')
export class MainframeHardwarePanelArticle extends BaseComponent<MainframeHardwarePanelArticleController> {
  static styles = [
    hintStyle,
    css`
      :host {
        width: 100%;
        padding: var(--sl-spacing-large);
        box-sizing: border-box;
        border: var(--ca-border);
        border-radius: var(--sl-border-radius-small);
        display: flex;
        align-items: center;
        gap: var(--sl-spacing-large);
      }

      div.text-container {
        flex: 1 1 auto;
        overflow: hidden;
      }

      div.text-container-inner {
        max-width: 100%;
      }

      div.button-container {
        flex: 0 0 auto;
        display: flex;
        gap: var(--sl-spacing-medium);
      }

      h4.title {
        width: 100%;
        font-size: var(--sl-font-size-large);
        font-weight: var(--sl-font-weight-bold);
        margin-top: 0;
        margin-bottom: var(--sl-spacing-medium);
        line-height: var(--sl-line-height-denser);
        cursor: grab;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      p.hint {
        width: 100%;
        margin: 0;
      }

      h4.title #toggle-autoupgrade-btn {
        position: relative;
        top: 0.1em;
      }

      #drag-icon {
        position: relative;
        top: 0.15em;
        left: -0.2em;
        color: var(--ca-hint-color);
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

  protected controller: MainframeHardwarePanelArticleController;

  constructor() {
    super();

    this.controller = new MainframeHardwarePanelArticleController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    const level = this.controller.getLevel(this.type);

    const autoupgradeIcon = this.controller.isAutoUpgradeEnabled(this.type)
      ? 'arrow-up-circle-fill'
      : 'arrow-up-circle';

    return html`
      <div class="text-container">
        <div class="text-container-inner">
          <h4 class="title" draggable="true" @dragstart=${this.handleDragStart}>
            <sl-icon id="drag-icon" name="grip-vertical"> </sl-icon>

            ${t(`mainframe.hardware.${this.type}`, { ns: 'ui', level: formatter.formatNumberDecimal(level) })}

            <sl-tooltip>
              <span slot="content"> ${t('mainframe.hardware.toggleAutoupgrade', { ns: 'ui' })} </span>

              <sl-icon-button
                id="toggle-autoupgrade-btn"
                name=${autoupgradeIcon}
                label=${t('mainframe.hardware.toggleAutoupgrade', { ns: 'ui' })}
                @click=${this.handleToggleAutoUpgrade}
              >
              </sl-icon-button>
            </sl-tooltip>
          </h4>
          <p class="hint">${t(`mainframe.hardware.${this.type}Hint`, { ns: 'ui' })}</p>
        </div>
      </div>

      <div class="button-container">
        <sl-button variant="default" type="button" size="medium" @click=${this.handleBuyMax}>
          ${t('mainframe.hardware.buyMax', { ns: 'ui' })}
        </sl-button>

        <ca-mainframe-hardware-panel-article-buy-button
          max-increase=${this.maxIncrease}
          type=${this.type}
          @buy-hardware=${this.handleBuy}
        >
        </ca-mainframe-hardware-panel-article-buy-button>
      </div>
    `;
  }

  private handleBuy = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    const increase = this.calculateIncrease();
    this.controller.purchase(increase, this.type);
  };

  private handleBuyMax = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    this.controller.purchaseMax(this.type);
  };

  private calculateIncrease(): number {
    return Math.max(
      Math.min(this.maxIncrease, this.controller.developmentLevel - this.controller.getLevel(this.type)),
      1,
    );
  }

  private handleToggleAutoUpgrade = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    const active = this.controller.isAutoUpgradeEnabled(this.type);
    this.controller.toggleAutoUpdateEnabled(this.type, !active);
  };

  private handleDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.type);
    }
  };
}
