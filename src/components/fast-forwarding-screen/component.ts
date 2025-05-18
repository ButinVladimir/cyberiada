import { html, css } from 'lit';
import { localized, msg } from '@lit/localize';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseComponent } from '@shared/base-component';
import { FastForwardingScreenController } from './controller';

@localized()
@customElement('ca-fast-forwarding-screen')
export class FastForwardingScreen extends BaseComponent {
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

  hasPartialUpdate = true;

  private _controller: FastForwardingScreenController;

  private _maxTime = 1;
  private _progressBarRef = createRef<SlProgressBar>();

  constructor() {
    super();

    this._controller = new FastForwardingScreenController(this);
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
    this._controller.stopFastForwarding();
  };

  handlePartialUpdate = () => {
    if (this._progressBarRef.value) {
      const accumulatedTime = this._controller.accumulatedTime;
      this._maxTime = Math.max(this._maxTime, accumulatedTime);

      const progressBarValue = ((this._maxTime - accumulatedTime) / this._maxTime) * 100;

      this._progressBarRef.value.value = progressBarValue;
    }
  };
}
