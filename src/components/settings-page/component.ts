import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';

@customElement('ca-settings-page')
export class SettingsPage extends BaseComponent {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
      line-height: var(--sl-line-height-denser);
    }

    sl-divider {
      --spacing: var(--sl-spacing-large);
    }
  `;

  renderContent() {
    return html`
      <h3 class="title">
        <intl-message label="ui:settings:settings">Settings</intl-message>
      </h3>

      <ca-savefile-panel></ca-savefile-panel>
      <sl-divider></sl-divider>
      <ca-events-filter-panel></ca-events-filter-panel>
      <sl-divider></sl-divider>
      <ca-settings-form></ca-settings-form>
    `;
  }
}
