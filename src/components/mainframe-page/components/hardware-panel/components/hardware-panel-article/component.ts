import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import type { MainframeHardwareParameterType } from '@state/mainframe/mainframe-hardware-state/types';
import { hintStyle, sectionTitleStyle, SCREEN_WIDTH_POINTS } from '@shared/styles';
import { MainframeHardwarePanelArticleController } from './controller';

@customElement('ca-mainframe-hardware-panel-article')
export class MainframeHardwarePanelArticle extends BaseComponent<MainframeHardwarePanelArticleController> {
  static styles = [
    hintStyle,
    sectionTitleStyle,
    css`
      :host {
        width: 100%;
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
        display: flex;
        gap: var(--sl-spacing-medium);
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
        top: 0.1em;
      }

      #drag-icon {
        position: relative;
        top: 0.15em;
        left: -0.2em;
        color: var(--ca-hint-color);
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

      div.button-container {
        align-items: center;
        height: 100%;
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
      <div class="title-row">
        <h4 class="title" draggable="true" @dragstart=${this.handleDragStart}>
          <sl-icon id="drag-icon" name="grip-vertical"> </sl-icon>

          ${t(`mainframe.hardware.${this.type}`, { ns: 'ui', level: formatter.formatNumberDecimal(level) })}
        </h4>
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
      </div>

      <p class="hint">${t(`mainframe.hardware.${this.type}Hint`, { ns: 'ui' })}</p>

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
