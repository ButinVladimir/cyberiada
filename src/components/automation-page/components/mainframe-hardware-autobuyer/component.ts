import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import { msg, localized } from '@lit/localize';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { BaseComponent } from '@shared/base-component';
import { normalizePercentage } from '@shared/helpers';
import { AutomationMainframeHardwareAutobuyerController } from './controller';
import { autobuyerStyles } from '../../styles';

@localized()
@customElement('ca-automation-mainframe-hardware-autobuyer')
export class AutomationMainframeHardwareAutobuyer extends BaseComponent {
  static styles = autobuyerStyles;

  private _controller: AutomationMainframeHardwareAutobuyerController;

  private _moneyShareRef = createRef<SlInput>();

  constructor() {
    super();

    this._controller = new AutomationMainframeHardwareAutobuyerController(this);
  }

  render() {
    const { moneyShare } = this._controller;

    return html`
      <h4 class="title">${msg('Mainframe hardware autobuyer')}</h4>

      <p class="hint">${msg('Percentage of available money reserved for upgrading mainframe hardware.')}</p>

      <div class="input-container">
        <sl-input
          ${ref(this._moneyShareRef)}
          name="moneyShare"
          value=${moneyShare}
          type="number"
          inputmode="decimal"
          min="0"
          max="100"
          step="1"
          @sl-change=${this.handleChangeMoneyShare}
        >
        </sl-input>
      </div>
    `;
  }

  private handleChangeMoneyShare = () => {
    if (!this._moneyShareRef.value) {
      return;
    }

    const value = normalizePercentage(this._moneyShareRef.value.valueAsNumber);

    this._controller.moneyShare = value;
    this._moneyShareRef.value.valueAsNumber = value;
  };
}
