import { html, css, PropertyValues } from 'lit';
import { localized, msg } from '@lit/localize';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseComponent } from '@shared/base-component';
import { FastForwardingScreenController } from './controller';

@localized()
@customElement('ca-fast-forwarding-screen')
export class FastForwardingScreen extends BaseComponent<FastForwardingScreenController> {
  static styles = css`
    :host {
      width: 100vw;
      height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--sl-color-neutral-0);
      gap: var(--sl-spacing-large);
    }

    span {
      font-size: var(--sl-font-size-3x-large);
      font-weight: var(--sl-font-weight-semibold);
      letter-spacing: var(--sl-letter-spacing-loose);
    }

    sl-progress-bar {
      width: 80vw;
      --height: 2rem;
    }
  `;

  protected controller: FastForwardingScreenController;

  private _maxTime = 1;
  private _progressBarRef = createRef<SlProgressBar>();

  constructor() {
    super();

    this.controller = new FastForwardingScreenController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    return html`
      <div>
        <span> ${msg('Spending accumulated time...')} </span>
      </div>

      <sl-progress-bar ${ref(this._progressBarRef)} value="0"></sl-progress-bar>

      <sl-button variant="danger" size="medium" @click=${this.handleStopFastForwarding}>
        ${msg('Stop fast forwarding')}
      </sl-button>
    `;
  }

  private handleStopFastForwarding = () => {
    this.controller.stopFastForwarding();
  };

  private handlePartialUpdate = () => {
    if (this._progressBarRef.value) {
      const formatter = this.controller.formatter;

      const accumulatedTime = this.controller.accumulatedTime;
      this._maxTime = Math.max(this._maxTime, accumulatedTime);

      const progressBarValue = ((this._maxTime - accumulatedTime) / this._maxTime) * 100;
      const formattedAccumulatedTime = formatter.formatTimeShort(accumulatedTime);

      this._progressBarRef.value.value = progressBarValue;
      this._progressBarRef.value.textContent = formattedAccumulatedTime;
    }
  };
}
