import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';

@customElement('ca-credits-page')
export class CreditsPage extends BaseComponent {
  static styles = css`
    p.server-link {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
    }

    p.server-link a,
    p.server-link a:visited,
    p.server-link a:hover {
      text-decoration: none;
      color: var(--sl-color-primary-600);
    }

    p.contributors {
      margin: 0;
    }
  `;

  renderContent() {
    return html`
      <p class="server-link">
        <a target="_blank" href="https://discord.gg/ZsCft65r">Discord</a>
      </p>
      <p class="contributors">
        Vladimir Butin (OmniLRenegade) - <intl-message label="ui:credits:OmniLRenegadE"></intl-message>
      </p>
    `;
  }
}
