import { css, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { BaseComponent } from '@shared/base-component';
import { AutomationMainframeProgramsAutobuyerController } from './controller';

@customElement('ca-automation-mainframe-programs-autobuyer')
export class AutomationMainframeProgramsAutobuyer extends BaseComponent<AutomationMainframeProgramsAutobuyerController> {
  static styles = css`
    :host {
      display: flex;
      align-items: stretch;
      justify-content: flex-start;
      flex-direction: column;
      padding: var(--sl-spacing-large);
      box-sizing: border-box;
      border: var(--ca-border);
      border-radius: var(--sl-border-radius-small);
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-medium);
      line-height: var(--sl-line-height-denser);
    }

    div.inputs {
      display: grid;
      align-items: center;
      column-gap: var(--sl-spacing-3x-large);
      grid-template-columns: repeat(3, 1fr);
    }

    p.hint {
      margin: 0 0 var(--sl-spacing-medium) 0;
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    span.input-label {
      font-size: var(--sl-font-size-medium);
      line-height: var(--sl-line-height-dense);
    }
  `;

  protected controller: AutomationMainframeProgramsAutobuyerController;

  private _moneyShareRef = createRef<SlInput>();

  constructor() {
    super();

    this.controller = new AutomationMainframeProgramsAutobuyerController(this);
  }

  renderContent() {
    const { moneyShare } = this.controller;

    return html`
      <h4 class="title">
        <intl-message label="ui:automation:mainframeProgramsAutobuyer:mainframeProgramsAutobuyer">
          Mainframe programs autobuyer
        </intl-message>
      </h4>

      <p class="hint">
        <intl-message label="ui:automation:mainframeProgramsAutobuyer:percentageHint"> Percentages hint </intl-message>
      </p>

      <div class="inputs">
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
          <span class="input-label" slot="label">
            <intl-message label="ui:automation:mainframeProgramsAutobuyer:moneyShare">Money share</intl-message>
          </span>
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
