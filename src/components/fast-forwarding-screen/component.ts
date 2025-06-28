import { html, css } from 'lit';
import { localized, msg } from '@lit/localize';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
import { BaseComponent, progressBarHintStyle } from '@shared/index';
import { FastForwardingScreenController } from './controller';

@localized()
@customElement('ca-fast-forwarding-screen')
export class FastForwardingScreen extends BaseComponent {
  static styles = [
    progressBarHintStyle,
    css`
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

      span.warning {
        font-size: var(--sl-font-size-3x-large);
        font-weight: var(--sl-font-weight-semibold);
        letter-spacing: var(--sl-letter-spacing-loose);
      }

      sl-progress-bar {
        width: 80vw;
        --height: 2rem;
      }
    `,
  ];

  hasPartialUpdate = true;

  private _controller: FastForwardingScreenController;

  private _maxTime = 1;
  private _progressBarRef = createRef<SlProgressBar>();
  private _timerElRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this._controller = new FastForwardingScreenController(this);
  }

  render() {
    const timerEl = html`<span ${ref(this._timerElRef)}></span>`;

    return html`
      <div>
        <span class="warning"> ${msg('Spending accumulated time...')} </span>
      </div>

      <div>
        <sl-progress-bar ${ref(this._progressBarRef)} value="0"></sl-progress-bar>
        <p class="progress-bar-hint visible">${msg(html`${timerEl} of accumulated time remains`)}</p>
      </div>

      <sl-button variant="danger" size="medium" @click=${this.handleStopFastForwarding}>
        ${msg('Stop fast forwarding')}
      </sl-button>
    `;
  }

  private handleStopFastForwarding = () => {
    this._controller.stopFastForwarding();
  };

  handlePartialUpdate = () => {
    const accumulatedTime = this._controller.accumulatedTime;

    if (this._progressBarRef.value) {
      this._maxTime = Math.max(this._maxTime, accumulatedTime);

      const progressBarValue = ((this._maxTime - accumulatedTime) / this._maxTime) * 100;

      this._progressBarRef.value.value = progressBarValue;
    }

    if (this._timerElRef.value) {
      this._timerElRef.value.textContent = this._controller.formatter.formatTimeLong(accumulatedTime);
    }
  };
}
