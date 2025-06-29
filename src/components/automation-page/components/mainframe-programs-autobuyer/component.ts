import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import { msg, localized } from '@lit/localize';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { BaseComponent, normalizePercentage } from '@shared/index';
import { AutomationMainframeProgramsAutobuyerController } from './controller';
import { autobuyerStyles } from '../../styles';

@localized()
@customElement('ca-automation-mainframe-programs-autobuyer')
export class AutomationMainframeProgramsAutobuyer extends BaseComponent {
  static styles = autobuyerStyles;

  protected hasMobileRender = true;

  private _controller: AutomationMainframeProgramsAutobuyerController;

  private _moneyShareRef = createRef<SlInput>();

  constructor() {
    super();

    this._controller = new AutomationMainframeProgramsAutobuyerController(this);
  }

  protected renderMobile() {
    return html`<div class="host-content mobile">${this.renderContent()}</div>`;
  }

  protected renderDesktop() {
    return html`<div class="host-content desktop">${this.renderContent()}</div>`;
  }

  private renderContent = () => {
    const { moneyShare } = this._controller;

    return html`
      <h4 class="title">${msg('Mainframe programs autobuyer')}</h4>

      <p class="hint">${msg('Percentage of available money reserved for buying programs.')}</p>

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
