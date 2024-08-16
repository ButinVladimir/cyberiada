import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { MainframeHardwarePanelController } from './controller';

@customElement('ca-mainframe-hardware-panel')
export class MainframeHardwarePanel extends LitElement {
  static styles = css`
    :host {
      width: 65em;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      gap: var(--sl-spacing-large);
    }

    p.hint {
      margin: 0;
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }
  `;

  private _mainframeHardwarePanelController: MainframeHardwarePanelController;

  @state()
  private _shiftPressed = false;

  @state()
  private _ctrlPressed = false;

  constructor() {
    super();

    this._mainframeHardwarePanelController = new MainframeHardwarePanelController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('keydown', this.handleKeypress);
    window.addEventListener('keyup', this.handleKeypress);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('keydown', this.handleKeypress);
    window.removeEventListener('keyup', this.handleKeypress);
  }

  render() {
    const increase = this.getIncrease();

    return html`
      <p class="hint">
        <intl-message label="ui:mainframe:hardware:keyboardHint">
          Press either ctrl or shift to buy 10 levels. Press both ctrl and shift to buy 100 levels.
        </intl-message>
      </p>
      <ca-mainframe-hardware-panel-article
        label="performance"
        increase=${increase}
        money=${this._mainframeHardwarePanelController.money}
        level=${this._mainframeHardwarePanelController.performance}
        cost=${this._mainframeHardwarePanelController.getPerformanceIncreaseCost(increase)}
        @click=${this.handlePurchasePerformanceIncrease}
      >
      </ca-mainframe-hardware-panel-article>

      <ca-mainframe-hardware-panel-article
        label="cores"
        increase=${increase}
        money=${this._mainframeHardwarePanelController.money}
        level=${this._mainframeHardwarePanelController.cores}
        cost=${this._mainframeHardwarePanelController.getCoresIncreaseCost(increase)}
        @click=${this.handlePurchaseCoresIncrease}
      >
      </ca-mainframe-hardware-panel-article>

      <ca-mainframe-hardware-panel-article
        label="ram"
        increase=${increase}
        money=${this._mainframeHardwarePanelController.money}
        level=${this._mainframeHardwarePanelController.ram}
        cost=${this._mainframeHardwarePanelController.getRamIncreaseCost(increase)}
        @click=${this.handlePurchaseRamIncrease}
      >
      </ca-mainframe-hardware-panel-article>
    `;
  }

  private handlePurchasePerformanceIncrease = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const increase = this.getIncrease();
    this._mainframeHardwarePanelController.purchasePerformanceIncrease(increase);
  };

  private handlePurchaseCoresIncrease = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const increase = this.getIncrease();
    this._mainframeHardwarePanelController.purchaseCoresIncrease(increase);
  };

  private handlePurchaseRamIncrease = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const increase = this.getIncrease();
    this._mainframeHardwarePanelController.purchaseRamIncrease(increase);
  };

  private handleKeypress = (event: KeyboardEvent) => {
    this._shiftPressed = event.shiftKey;
    this._ctrlPressed = event.ctrlKey;
  };

  private getIncrease(): number {
    let increase = 1;

    if (this._shiftPressed) {
      increase *= 10;
    }

    if (this._ctrlPressed) {
      increase *= 10;
    }

    return increase;
  }
}
