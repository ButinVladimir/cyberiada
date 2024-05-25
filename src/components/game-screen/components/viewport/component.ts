import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ca-viewport')
export class Viewport extends LitElement {
  static styles = css`
    :host {
      margin-top: var(--sl-spacing-3x-large);
      min-height: calc(100vh - var(--sl-spacing-3x-large));
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      justify-content: stretch;
    }

    @media (min-width: 1024px) { 
      :host > div.content {
        width: 1024px;
      }
    }

    @media (max-width: 1023px) {
      :host > div.content {
        width: 100vw;
      }
    }
  `;

  render() {
    return html`
      <slot name="side-bar"></slot>

      <div class="content">
        <slot></slot>
      </div>
    `;
  }
}
