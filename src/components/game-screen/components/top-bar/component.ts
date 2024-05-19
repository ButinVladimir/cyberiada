import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('top-bar')
export class TopBar extends LitElement {
  static styles = css`
    :host {
      width: 100vw;
      display: flex;
      background-color: var(--sl-panel-background-color);
      border-bottom: var(--sl-panel-border-width) solid var(--sl-panel-border-color);
      padding: var(--sl-spacing-medium);
      box-shadow: var(--sl-shadow-small);
    }
  `;

  render() {
    return html`
      <div>
        Content goes here
      </div>  
    `;
  }
}
