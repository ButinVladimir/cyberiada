import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';

@customElement('ca-mainframe-page')
export class MainframePage extends BaseComponent {
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
      <h3 class="title">
        <intl-message label="ui:mainframe:mainframe">Mainframe</intl-message>
      </h3>

      <sl-tab-group>
        <sl-tab slot="nav" panel="processes">
          <intl-message label="ui:mainframe:tabs:processes">Processes</intl-message>
        </sl-tab>
        <sl-tab slot="nav" panel="hardware">
          <intl-message label="ui:mainframe:tabs:hardware">Hardware</intl-message>
        </sl-tab>
        <sl-tab slot="nav" panel="programs">
          <intl-message label="ui:mainframe:tabs:programs">Programs</intl-message>
        </sl-tab>

        <sl-tab-panel name="processes">
          <ca-mainframe-processes-panel></ca-mainframe-processes-panel>
        </sl-tab-panel>
        <sl-tab-panel name="hardware">
          <ca-mainframe-hardware-panel></ca-mainframe-hardware-panel>
        </sl-tab-panel>
        <sl-tab-panel name="programs">
          <ca-mainframe-programs-panel></ca-mainframe-programs-panel>
        </sl-tab-panel>
      </sl-tab-group>
    `;
  }
}
