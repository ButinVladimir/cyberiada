import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';

@localized()
@customElement('ca-loading-screen')
export class LoadingScreen extends BaseComponent {
  static styles = css`
    :host {
      width: 100vw;
      height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--sl-color-neutral-0);
    }

    :host span {
      font-size: var(--sl-font-size-3x-large);
      font-weight: var(--sl-font-weight-semibold);
      letter-spacing: var(--sl-letter-spacing-loose);
    }
  `;

  render() {
    return html` <span> ${msg('Loading...')} </span> `;
  }
}
