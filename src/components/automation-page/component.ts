import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { BaseComponent } from '@shared/index';
import styles from './styles';

@localized()
@customElement('ca-automation-page')
export class AutomationPage extends BaseComponent {
  static styles = styles;

  protected renderDesktop() {
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
