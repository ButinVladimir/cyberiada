import { t } from 'i18next';
import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { FastForwardingScreenController } from './controller';

@customElement('ca-fast-forwarding-screen')
export class FastForwardingScreen extends BaseComponent<FastForwardingScreenController> {
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

  protected controller: FastForwardingScreenController;

  constructor() {
    super();

    this.controller = new FastForwardingScreenController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    const accumulatedTime = this.controller.accumulatedTime;
    this._maxTime = Math.max(this._maxTime, accumulatedTime);

    const progressBarValue = ((this._maxTime - accumulatedTime) / this._maxTime) * 100;

    return html`
      <div>
        <span> ${t('fastForwardingScreen.fastForwarding', { ns: 'ui' })} </span>
      </div>

      <sl-progress-bar value=${progressBarValue}> ${formatter.formatTimeShort(accumulatedTime)} </sl-progress-bar>

      <sl-button variant="danger" size="medium" @click=${this.handleStopFastForwarding}>
        ${t('fastForwardingScreen.stop', { ns: 'ui' })}
      </sl-button>
    `;
  }

  private handleStopFastForwarding = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    this.controller.stopFastForwarding();
  };
}
