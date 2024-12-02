import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';

@customElement('ca-loading-screen')
export class LoadingScreen extends BaseComponent {
  static styles = css`
    :host {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--sl-color-neutral-50);
    }

    :host span {
      font-size: var(--sl-font-size-3x-large);
      font-weight: var(--sl-font-weight-semibold);
      letter-spacing: var(--sl-letter-spacing-loose);
    }
  `;

  renderContent() {
    return html`
      <span>
        <intl-message label="ui:common:loading"> Loading... </intl-message>
      </span>
    `;
  }
}
