import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';

@customElement('ca-overview-progress-panel')
export class OverviewProgressPanel extends BaseComponent {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        gap: var(--sl-spacing-2x-large);
        padding-top: var(--sl-spacing-large);
      }
    `,
  ];

  renderContent() {
    return html`
      <ca-overview-development-level-progress></ca-overview-development-level-progress>
      <ca-overview-unlocked-features-progress></ca-overview-unlocked-features-progress>
    `;
  }
}
