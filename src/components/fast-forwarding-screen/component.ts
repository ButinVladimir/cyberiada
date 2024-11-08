import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { FastForwardingScreenController } from './controller';

@customElement('ca-fast-forwarding-screen')
export class FastForwardingScreen extends LitElement {
  static styles = css`
    :host {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--sl-color-neutral-50);
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

  private _maxTime = 1;

  private _fastForwardingScreenController: FastForwardingScreenController;

  constructor() {
    super();

    this._fastForwardingScreenController = new FastForwardingScreenController(this);
  }

  render() {
    const formatter = this._fastForwardingScreenController.formatter;

    const accumulatedTime = this._fastForwardingScreenController.accumulatedTime;
    this._maxTime = Math.max(this._maxTime, accumulatedTime);

    const progressBarValue = ((this._maxTime - accumulatedTime) / this._maxTime) * 100;

    return html`
      <div>
        <span>
          <intl-message label="ui:fastForwardingScreen:fastForwarding"> Fast forwarding... </intl-message>
        </span>
      </div>

      <sl-progress-bar value=${progressBarValue}> ${formatter.formatTimeShort(accumulatedTime)} </sl-progress-bar>

      <sl-button variant="danger" size="medium" @click=${this.handleStopFastForwarding}>
        <intl-message label="ui:fastForwardingScreen:stop"> Purchase a program </intl-message>
      </sl-button>
    `;
  }

  private handleStopFastForwarding = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    this._fastForwardingScreenController.stopFastForwarding();
  };
}
