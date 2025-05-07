import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import { msg, localized } from '@lit/localize';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { BaseComponent } from '@shared/base-component';
import { AutomationMainframeProgramsAutobuyerController } from './controller';
import { autobuyerStyles } from '../../styles';

@localized()
@customElement('ca-automation-mainframe-programs-autobuyer')
export class AutomationMainframeProgramsAutobuyer extends BaseComponent {
  static styles = autobuyerStyles;

  private _controller: AutomationMainframeProgramsAutobuyerController;

  private _moneyShareRef = createRef<SlInput>();

  constructor() {
    super();

    this._controller = new AutomationMainframeProgramsAutobuyerController(this);
  }

  render() {
    const { moneyShare } = this._controller;

    return html`
      <h4 class="title">${msg('Mainframe programs autobuyer')}</h4>

      <p class="hint">${msg('Percentage of available money reserved for buying programs')}</p>

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

    const value = this.normalizeValue(this._moneyShareRef.value.valueAsNumber);

    this._controller.moneyShare = value;
    this._moneyShareRef.value.valueAsNumber = value;
  };

  private normalizeValue(value: number): number {
    if (value < 0) {
      return 0;
    }

    if (value > 100) {
      return 100;
    }

    return value;
  }
}
