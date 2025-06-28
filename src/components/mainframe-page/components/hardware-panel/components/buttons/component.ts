import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg, localized } from '@lit/localize';
import { createRef, ref } from 'lit/directives/ref.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import { BaseComponent } from '@shared/index';
import { MainframeHardwarePanelButtonsController } from './controller';

@localized()
@customElement('ca-mainframe-hardware-panel-buttons')
export class MainframeHardwarePanelButtons extends BaseComponent {
  hasPartialUpdate = true;

  private _controller: MainframeHardwarePanelButtonsController;

  private _buyMaxButtonRef = createRef<SlButton>();

  constructor() {
    super();

    this._controller = new MainframeHardwarePanelButtonsController(this);
  }

  render() {
    return html`
      <sl-button
        ${ref(this._buyMaxButtonRef)}
        variant="default"
        type="button"
        size="medium"
        @click=${this.handleBuyMax}
      >
        ${msg('Buy all upgrades')}
      </sl-button>
    `;
  }

  private handleBuyMax = () => {
    this._controller.purchaseMax();
  };

  handlePartialUpdate = () => {
    if (this._buyMaxButtonRef.value) {
      const buttonDisabled = !this._controller.checkCanPurchaseMax();

      this._buyMaxButtonRef.value.disabled = buttonDisabled;
    }
  };
}
