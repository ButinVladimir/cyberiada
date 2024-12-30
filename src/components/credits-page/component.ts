import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { CURRENT_VERSION } from '@shared/constants';

@customElement('ca-credits-page')
export class CreditsPage extends BaseComponent {
  static styles = css`
    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
      line-height: var(--sl-line-height-denser);
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
  `;

  renderContent() {
    return html`
      <h3 class="title">Cyberiada v${CURRENT_VERSION}</h3>

      <p class="server-link">
        <a target="_blank" href="https://discord.gg/CmsTxU2EMw">Discord</a>
        <a target="_blank" href="https://github.com/ButinVladimir/cyberiada">GitHub</a>
      </p>

      <p class="contributors">Vladimir Butin (OmniLRenegadE) - ${t('credits.OmniLRenegadE', { ns: 'ui' })}</p>
    `;
  }
}
