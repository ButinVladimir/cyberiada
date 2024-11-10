import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ca-automation-autobuyers-panel')
export class AutomationAutobuyersPanel extends LitElement {
  static styles = css`
    :host {
      max-width: var(--ca-viewport-width);
      width: 100%;
      display: flex;
      align-items: stretch;
      flex-direction: column;
    }
  `;

  render() {
    return html` <ca-automation-mainframe-hardware-autobuyer></ca-automation-mainframe-hardware-autobuyer> `;
  }
}
