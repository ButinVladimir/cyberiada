import { css, html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { CURRENT_VERSION } from '@shared/constants';
import { pageTitleStyle } from '@shared/styles';

@localized()
@customElement('ca-credits-page')
export class CreditsPage extends BaseComponent {
  static styles = [
    pageTitleStyle,
    css`
      h3.title {
        margin-bottom: var(--sl-spacing-large);
      }

      p.server-link {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-large);
      }

      p.server-link a:not(:last-child) {
        margin-right: var(--sl-spacing-medium);
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
    `,
  ];

  render() {
    return html`
      <h3 class="title">Cyberiada v${CURRENT_VERSION}</h3>

      <p class="server-link">
        <a target="_blank" href="https://discord.gg/CmsTxU2EMw">Discord</a>
        <a target="_blank" href="https://github.com/ButinVladimir/cyberiada">GitHub</a>
      </p>

      <p class="contributors">Vladimir Butin (OmniLRenegadE) - ${msg('Idea, coding, design, balance')}</p>
    `;
  }
}
