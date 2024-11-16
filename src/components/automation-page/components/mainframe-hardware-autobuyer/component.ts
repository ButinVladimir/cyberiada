import { css, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { BaseComponent } from '@shared/base-component';
import { normalizePercentage } from '@shared/helpers';
import { AutomationMainframeHardwareAutobuyerController } from './controller';

@customElement('ca-automation-mainframe-hardware-autobuyer')
export class AutomationMainframeHardwareAutobuyer extends BaseComponent<AutomationMainframeHardwareAutobuyerController> {
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

  protected controller: AutomationMainframeHardwareAutobuyerController;

  private _performanceShareRef = createRef<SlInput>();

  private _coresShareRef = createRef<SlInput>();

  private _ramShareRef = createRef<SlInput>();

  constructor() {
    super();

    this.controller = new AutomationMainframeHardwareAutobuyerController(this);
  }

  renderContent() {
    const { performanceShare, coresShare, ramShare } = this.controller;

    return html`
      <h4 class="title">
        <intl-message label="ui:automation:mainframeHardwareAutobuyer:mainframeHardwareAutobuyer">
          Mainframe hardware autobuyer
        </intl-message>
      </h4>

      <p class="hint">
        <intl-message label="ui:automation:mainframeHardwareAutobuyer:percentageHint"> Percentages hint </intl-message>
      </p>

      <div class="inputs">
        <sl-input
          ${ref(this._performanceShareRef)}
          name="performanceShare"
          value=${performanceShare}
          type="number"
          min="0"
          max="100"
          step="1"
          @sl-change=${this.handleChangePerformanceShare}
        >
          <span class="input-label" slot="label">
            <intl-message label="ui:automation:mainframeHardwareAutobuyer:performance">Performance share</intl-message>
          </span>
        </sl-input>

        <sl-input
          ${ref(this._coresShareRef)}
          name="coresShare"
          value=${coresShare}
          type="number"
          min="0"
          max="100"
          step="1"
          @sl-change=${this.handleChangeCoresShare}
        >
          <span class="input-label" slot="label">
            <intl-message label="ui:automation:mainframeHardwareAutobuyer:cores">Cores share</intl-message>
          </span>
        </sl-input>

        <sl-input
          ${ref(this._ramShareRef)}
          name="ramShare"
          value=${ramShare}
          type="number"
          min="0"
          max="100"
          step="1"
          @sl-change=${this.handleChangeRamShare}
        >
          <span class="input-label" slot="label">
            <intl-message label="ui:automation:mainframeHardwareAutobuyer:ram">RAM share</intl-message>
          </span>
        </sl-input>
      </div>
    `;
  }

  private handleChangePerformanceShare = () => {
    if (!this._performanceShareRef.value) {
      return;
    }

    const value = normalizePercentage(this._performanceShareRef.value.valueAsNumber);

    this.controller.performanceShare = value;
    this._performanceShareRef.value.valueAsNumber = value;
  };

  private handleChangeCoresShare = () => {
    if (!this._coresShareRef.value) {
      return;
    }

    const value = normalizePercentage(this._coresShareRef.value.valueAsNumber);

    this.controller.coresShare = value;
    this._coresShareRef.value.valueAsNumber = value;
  };

  private handleChangeRamShare = () => {
    if (!this._ramShareRef.value) {
      return;
    }

    const value = normalizePercentage(this._ramShareRef.value.valueAsNumber);

    this.controller.ramShare = value;
    this._ramShareRef.value.valueAsNumber = value;
  };
}
