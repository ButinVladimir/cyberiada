import { css, html } from 'lit';
import { msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';

@customElement('ca-settings-page')
export class SettingsPage extends BaseComponent {
  static styles = [
    pageTitleStyle,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      h3.title {
        margin-bottom: var(--sl-spacing-large);
      }

      sl-divider {
        --spacing: var(--sl-spacing-large);
      }
    `,
  ];

  render() {
    return html`
      <h3 class="title">${msg('Settings')}</h3>

      <ca-savefile-panel></ca-savefile-panel>
      <sl-divider></sl-divider>
      <ca-events-filter-panel></ca-events-filter-panel>
      <sl-divider></sl-divider>
      <ca-settings-form></ca-settings-form>
    `;
  }
}
