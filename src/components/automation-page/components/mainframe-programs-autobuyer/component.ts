import { t } from 'i18next';
import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { BaseComponent } from '@shared/base-component';
import { AutomationMainframeProgramsAutobuyerController } from './controller';
import { autobuyerStyles } from '../../styles';

@customElement('ca-automation-mainframe-programs-autobuyer')
export class AutomationMainframeProgramsAutobuyer extends BaseComponent<AutomationMainframeProgramsAutobuyerController> {
  static styles = autobuyerStyles;

  protected controller: AutomationMainframeProgramsAutobuyerController;

  private _moneyShareRef = createRef<SlInput>();

  constructor() {
    super();

    this.controller = new AutomationMainframeProgramsAutobuyerController(this);
  }

  render() {
    const { moneyShare } = this.controller;

    return html`
      <h4 class="title">${t('automation.mainframeProgramsAutobuyer.mainframeProgramsAutobuyer', { ns: 'ui' })}</h4>

      <p class="hint">${t('automation.mainframeProgramsAutobuyer.percentageHint', { ns: 'ui' })}</p>

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

    const value = this.normalizeValue(this._moneyShareRef.value.valueAsNumber);

    this.controller.moneyShare = value;
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
