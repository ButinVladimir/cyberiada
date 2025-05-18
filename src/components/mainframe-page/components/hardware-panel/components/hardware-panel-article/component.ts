import { css, html, nothing } from 'lit';
import { localized } from '@lit/localize';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { COMMON_TEXTS } from '@texts/index';
import {
  BaseComponent,
  hintStyle,
  sectionTitleStyle,
  SCREEN_WIDTH_POINTS,
  AUTOUPGRADE_VALUES,
  dragIconStyle,
  highlightedValuesStyle,
  getHighlightValueClass,
} from '@shared/index';
import { type IMainframeHardwareParameter, type MainframeHardwareParameterType } from '@state/mainframe-state';
import { MainframeHardwarePanelArticleController } from './controller';
import { MAINFRAME_HARDWARE_TEXTS } from './constants';
import { mainframeHardwareParameterContext } from './contexts';

@localized()
@customElement('ca-mainframe-hardware-panel-article')
export class MainframeHardwarePanelArticle extends BaseComponent {
  static styles = [
    hintStyle,
    sectionTitleStyle,
    dragIconStyle,
    highlightedValuesStyle,
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
          'cost'
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

      p.cost {
        grid-area: cost;
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
            'cost buttons'
            'hint buttons';
          grid-template-rows: repeat(auto);
          grid-template-columns: 1fr auto;
        }
      }
    `,
  ];

  hasPartialUpdate = true;

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

  private _costElRef = createRef<HTMLSpanElement>();

  @provide({ context: mainframeHardwareParameterContext })
  private _parameter?: IMainframeHardwareParameter;

  constructor() {
    super();

    this._controller = new MainframeHardwarePanelArticleController(this);
  }

  performUpdate() {
    this.updateContext();

    super.performUpdate();
  }

  render() {
    if (!this._parameter) {
      return nothing;
    }

    const formatter = this._controller.formatter;

    const level = this._parameter.level;

    const isAutoupgradeEnabled = this._parameter.autoUpgradeEnabled;

    const autoupgradeIcon = isAutoupgradeEnabled ? AUTOUPGRADE_VALUES.icon.enabled : AUTOUPGRADE_VALUES.icon.disabled;
    const autoupgradeLabel = isAutoupgradeEnabled
      ? COMMON_TEXTS.disableAutoupgrade()
      : COMMON_TEXTS.enableAutoupgrade();

    const increase = this.calculateIncrease();

    return html`
      <div class="title-row">
        <h4 class="title" draggable="true" @dragstart=${this.handleDragStart}>
          <sl-icon id="drag-icon" name="grip-vertical"> </sl-icon>

          ${COMMON_TEXTS.parameterValue(MAINFRAME_HARDWARE_TEXTS[this.type].title(), formatter.formatLevel(level))}

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

      <p class="text">
        ${COMMON_TEXTS.parameterValue(COMMON_TEXTS.cost(), html`<span ${ref(this._costElRef)}></span>`)}
      </p>

      <p class="hint">${MAINFRAME_HARDWARE_TEXTS[this.type].hint()}</p>

      <div class="button-container">
        <ca-mainframe-hardware-panel-article-buttons
          increase=${increase}
          @buy-hardware=${this.handleBuy}
          @buy-max-hardware=${this.handleBuyMax}
        >
        </ca-mainframe-hardware-panel-article-buttons>
      </div>
    `;
  }

  private updateContext() {
    this._parameter = this._controller.getParameter(this.type);
  }

  private handleBuy = () => {
    const increase = this.calculateIncrease();
    this._parameter?.purchase(increase);
  };

  private handleBuyMax = () => {
    this._parameter?.purchaseMax();
  };

  private calculateIncrease(): number {
    if (!this._parameter) {
      return 1;
    }

    return Math.max(Math.min(this.maxIncrease, this._controller.developmentLevel - this._parameter.level), 1);
  }

  private handleToggleAutoUpgrade = () => {
    if (!this._parameter) {
      return;
    }

    this._parameter.autoUpgradeEnabled = !this._parameter.autoUpgradeEnabled;
  };

  private handleDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.type);
    }
  };

  handlePartialUpdate = () => {
    if (!this._costElRef.value || !this._parameter) {
      return;
    }

    const cost = this._parameter.getIncreaseCost(this.calculateIncrease());
    const money = this._controller.money;

    const formattedCost = this._controller.formatter.formatNumberFloat(cost);
    const className = getHighlightValueClass(money >= cost);

    this._costElRef.value.textContent = formattedCost;
    this._costElRef.value.className = className;
  };
}
