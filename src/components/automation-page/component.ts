import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';

@customElement('ca-automation-page')
export class AutomationPage extends BaseComponent {
  static styles = css`
    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-2x-small);
      line-height: var(--sl-line-height-denser);
    }
  `;

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
