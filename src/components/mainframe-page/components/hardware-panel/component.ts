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
    const performanceIncrease = this.getIncrease(this._mainframeHardwarePanelController.performance);
    const coresIncrease = this.getIncrease(this._mainframeHardwarePanelController.cores);
    const ramIncrease = this.getIncrease(this._mainframeHardwarePanelController.ram);

    return html`
      <p class="hint">
        <intl-message label="ui:mainframe:hardware:keyboardHint">
          Press either ctrl or shift to buy 10 levels. Press both ctrl and shift to buy 100 levels.
        </intl-message>
      </p>
      <ca-mainframe-hardware-panel-article
        label="performance"
        increase=${performanceIncrease}
        level=${this._mainframeHardwarePanelController.performance}
        cost=${this._mainframeHardwarePanelController.getPerformanceIncreaseCost(performanceIncrease)}
        @buy-hardware-upgrade=${this.handlePurchasePerformanceIncrease}
      >
      </ca-mainframe-hardware-panel-article>

      <ca-mainframe-hardware-panel-article
        label="cores"
        increase=${coresIncrease}
        level=${this._mainframeHardwarePanelController.cores}
        cost=${this._mainframeHardwarePanelController.getCoresIncreaseCost(coresIncrease)}
        @buy-hardware-upgrade=${this.handlePurchaseCoresIncrease}
      >
      </ca-mainframe-hardware-panel-article>

      <ca-mainframe-hardware-panel-article
        label="ram"
        increase=${ramIncrease}
        level=${this._mainframeHardwarePanelController.ram}
        cost=${this._mainframeHardwarePanelController.getRamIncreaseCost(ramIncrease)}
        @buy-hardware-upgrade=${this.handlePurchaseRamIncrease}
      >
      </ca-mainframe-hardware-panel-article>
    `;
  }

  private handlePurchasePerformanceIncrease = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const increase = this.getIncrease(this._mainframeHardwarePanelController.performance);
    this._mainframeHardwarePanelController.purchasePerformanceIncrease(increase);
  };

  private handlePurchaseCoresIncrease = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const increase = this.getIncrease(this._mainframeHardwarePanelController.cores);
    this._mainframeHardwarePanelController.purchaseCoresIncrease(increase);
  };

  private handlePurchaseRamIncrease = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const increase = this.getIncrease(this._mainframeHardwarePanelController.ram);
    this._mainframeHardwarePanelController.purchaseRamIncrease(increase);
  };

  private handleKeypress = (event: KeyboardEvent) => {
    this._shiftPressed = event.shiftKey;
    this._ctrlPressed = event.ctrlKey;
  };

  private getMaxIncrease(): number {
    let maxIncrease = 1;

    if (this._shiftPressed) {
      maxIncrease *= 10;
    }

    if (this._ctrlPressed) {
      maxIncrease *= 10;
    }

    return maxIncrease;
  }

  private getIncrease(currentLevel: number): number {
    const maxIncrease = this.getMaxIncrease();

    return Math.max(Math.min(maxIncrease, this._mainframeHardwarePanelController.cityLevel - currentLevel), 1);
  }
}
