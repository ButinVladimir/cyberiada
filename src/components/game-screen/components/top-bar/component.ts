import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ca-top-bar')
export class TopBar extends LitElement {
  static styles = css`
    :host {
      width: 100vw;
      display: flex;
      background-color: var(--sl-panel-background-color);
      border-bottom: var(--sl-panel-border-width) solid var(--sl-panel-border-color);
      padding: var(--sl-spacing-medium);
      box-shadow: var(--sl-shadow-small);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      height: var(--sl-spacing-3x-large);
      box-sizing: border-box;
    }
  `;

  render() {
    return html`
      Top bar content
    `;
  }
}
