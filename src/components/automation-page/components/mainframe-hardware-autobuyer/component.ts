import { t } from 'i18next';
import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { BaseComponent } from '@shared/base-component';
import { normalizePercentage } from '@shared/helpers';
import { AutomationMainframeHardwareAutobuyerController } from './controller';
import { autobuyerStyles } from '../../styles';

@customElement('ca-automation-mainframe-hardware-autobuyer')
export class AutomationMainframeHardwareAutobuyer extends BaseComponent<AutomationMainframeHardwareAutobuyerController> {
  static styles = autobuyerStyles;

  protected controller: AutomationMainframeHardwareAutobuyerController;

  private _moneyShareRef = createRef<SlInput>();

  constructor() {
    super();

    this.controller = new AutomationMainframeHardwareAutobuyerController(this);
  }

  renderContent() {
    const { moneyShare } = this.controller;

    return html`
      <h4 class="title">${t('automation.mainframeHardwareAutobuyer.mainframeHardwareAutobuyer', { ns: 'ui' })}</h4>

      <p class="hint">${t('automation.mainframeHardwareAutobuyer.percentageHint', { ns: 'ui' })}</p>

      <div class="input-container">
        <sl-input
          ${ref(this._moneyShareRef)}
          name="moneyShare"
          value=${moneyShare}
          type="number"
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

    this.controller.moneyShare = value;
    this._moneyShareRef.value.valueAsNumber = value;
  };
}
