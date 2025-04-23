import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';

@localized()
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

  render() {
    return html`
      <h3 class="title">${msg('Automation')}</h3>

      <sl-tab-group>
        <sl-tab slot="nav" panel="autobuyers">${msg('Autobuyers')}</sl-tab>

        <sl-tab-panel name="autobuyers">
          <ca-automation-autobuyers-panel></ca-automation-autobuyers-panel>
        </sl-tab-panel>
      </sl-tab-group>
    `;
  }
}
