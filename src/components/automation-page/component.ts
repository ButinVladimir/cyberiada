import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';

@customElement('ca-automation-page')
export class AutomationPage extends BaseComponent {
  static styles = [
    pageTitleStyle,
    css`
      h3.title {
        margin-bottom: var(--sl-spacing-2x-small);
      }
    `,
  ];

  renderContent() {
    return html`
      <h3 class="title">${t('automation.automation', { ns: 'ui' })}</h3>

      <sl-tab-group>
        <sl-tab slot="nav" panel="autobuyers"> ${t('automation.tabs.autobuyers', { ns: 'ui' })} </sl-tab>

        <sl-tab-panel name="autobuyers">
          <ca-automation-autobuyers-panel></ca-automation-autobuyers-panel>
        </sl-tab-panel>
      </sl-tab-group>
    `;
  }
}
