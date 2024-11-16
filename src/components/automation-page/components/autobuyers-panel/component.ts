import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';

@customElement('ca-automation-autobuyers-panel')
export class AutomationAutobuyersPanel extends BaseComponent {
  static styles = css`
    :host {
      max-width: var(--ca-viewport-width);
      width: 100%;
      display: flex;
      align-items: stretch;
      flex-direction: column;
      gap: var(--sl-spacing-medium);
    }
  `;

  renderContent() {
    return html`
      <ca-automation-mainframe-hardware-autobuyer></ca-automation-mainframe-hardware-autobuyer>
      <ca-automation-mainframe-programs-autobuyer></ca-automation-mainframe-programs-autobuyer>
    `;
  }
}
