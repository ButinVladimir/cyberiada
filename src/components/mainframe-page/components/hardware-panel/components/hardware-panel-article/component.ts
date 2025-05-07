import { css, html } from 'lit';
import { localized } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import type { MainframeHardwareParameterType } from '@state/mainframe-state/states/mainframe-hardware-state/types';
import { hintStyle, sectionTitleStyle, SCREEN_WIDTH_POINTS, AUTOUPGRADE_VALUES, dragIconStyle } from '@shared/styles';
import { COMMON_TEXTS } from '@texts/common';
import { MainframeHardwarePanelArticleController } from './controller';
import { MAINFRAME_HARDWARE_TEXTS } from './constants';

@localized()
@customElement('ca-mainframe-hardware-panel-article')
export class MainframeHardwarePanelArticle extends BaseComponent {
  static styles = [
    hintStyle,
    sectionTitleStyle,
    dragIconStyle,
    css`
      :host {
        width: 100%;
        background-color: var(--sl-panel-background-color);
        padding: var(--sl-spacing-large);
        box-sizing: border-box;
        border: var(--ca-border);
        border-radius: var(--sl-border-radius-small);
        display: grid;
        grid-template-areas:
          'title'
          'buttons'
          'hint';
        row-gap: var(--sl-spacing-small);
        column-gap: var(--sl-spacing-small);
      }

      div.button-container {
        grid-area: buttons;
        height: 100%;
      }

      div.title-row {
        grid-area: title;
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      h4.title {
        margin: 0;
        cursor: grab;
      }

      p.hint {
        grid-area: hint;
        margin: 0;
      }

      #toggle-autoupgrade-btn {
        position: relative;
        top: 0.15em;
      }

      sl-icon[name='grip-vertical'] {
        top: 0.15em;
        left: -0.2em;
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        :host {
          grid-template-areas:
            'title buttons'
            'hint buttons';
          grid-template-rows: auto auto;
          grid-template-columns: 1fr auto;
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

  private _controller: MainframeHardwarePanelArticleController;

  constructor() {
    super();

    this._controller = new MainframeHardwarePanelArticleController(this);
  }

  render() {
    const formatter = this._controller.formatter;

    const level = this._controller.getLevel(this.type);

    const isAutoupgradeEnabled = this._controller.isAutoUpgradeEnabled(this.type);

    const autoupgradeIcon = isAutoupgradeEnabled ? AUTOUPGRADE_VALUES.icon.enabled : AUTOUPGRADE_VALUES.icon.disabled;
    const autoupgradeLabel = isAutoupgradeEnabled
      ? COMMON_TEXTS.disableAutoupgrade()
      : COMMON_TEXTS.enableAutoupgrade();

    return html`
      <div class="title-row">
        <h4 class="title" draggable="true" @dragstart=${this.handleDragStart}>
          <sl-icon id="drag-icon" name="grip-vertical"> </sl-icon>

          ${MAINFRAME_HARDWARE_TEXTS[this.type].title(formatter.formatLevel(level))}

          <sl-tooltip>
            <span slot="content"> ${autoupgradeLabel} </span>

            <sl-icon-button
              id="toggle-autoupgrade-btn"
              name=${autoupgradeIcon}
              label=${autoupgradeLabel}
              @click=${this.handleToggleAutoUpgrade}
            >
            </sl-icon-button>
          </sl-tooltip>
        </h4>
      </div>

      <p class="hint">${MAINFRAME_HARDWARE_TEXTS[this.type].hint()}</p>

      <div class="button-container">
        <ca-mainframe-hardware-panel-article-buttons
          max-increase=${this.maxIncrease}
          type=${this.type}
          @buy-hardware=${this.handleBuy}
          @buy-max-hardware=${this.handleBuyMax}
        >
        </ca-mainframe-hardware-panel-article-buttons>
      </div>
    `;
  }

  private handleBuy = () => {
    const increase = this.calculateIncrease();
    this._controller.purchase(increase, this.type);
  };

  private handleBuyMax = () => {
    this._controller.purchaseMax(this.type);
  };

  private calculateIncrease(): number {
    return Math.max(
      Math.min(this.maxIncrease, this._controller.developmentLevel - this._controller.getLevel(this.type)),
      1,
    );
  }

  private handleToggleAutoUpgrade = () => {
    const active = this._controller.isAutoUpgradeEnabled(this.type);
    this._controller.toggleAutoUpdateEnabled(this.type, !active);
  };

  private handleDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.type);
    }
  };
}
