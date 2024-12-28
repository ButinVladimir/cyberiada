import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import type { MainframeHardwareParameterType } from '@state/mainframe/mainframe-hardware-state/types';
import { MainframeHardwarePanelArticleController } from './controller';

@customElement('ca-mainframe-hardware-panel-article')
export class MainframeHardwarePanelArticle extends BaseComponent<MainframeHardwarePanelArticleController> {
  static styles = css`
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
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    h4.title sl-icon-button {
      position: relative;
      top: 0.1em;
    }
  `;

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
            <intl-message label="ui:mainframe:hardware:${this.type}" value=${formatter.formatNumberDecimal(level)}>
              Level
            </intl-message>

            <sl-tooltip>
              <intl-message slot="content" label="ui:mainframe:programs:toggleAutoupgrade">
                Toggle autoupgrade
              </intl-message>

              <sl-icon-button
                id="toggle-autoupgrade-btn"
                name=${autoupgradeIcon}
                label=${t('mainframe.programs.toggleAutoupgrade', { ns: 'ui' })}
                @click=${this.handleToggleAutoUpgrade}
              >
              </sl-icon-button>
            </sl-tooltip>
          </h4>
          <p class="hint">
            <intl-message label="ui:mainframe:hardware:${this.type}Hint"> Higher level leads to profit. </intl-message>
          </p>
        </div>
      </div>

      <div class="button-container">
        <sl-button variant="default" type="button" size="medium" @click=${this.handleBuyMax}>
          <intl-message label="ui:mainframe:hardware:buyMax"> Buy max </intl-message>
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
