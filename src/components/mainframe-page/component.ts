import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ca-mainframe-page')
export class MainframePage extends LitElement {
  static styles = css`
    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-2x-small);
      line-height: var(--sl-line-height-denser);
    }
  `;

  render() {
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
        <sl-tab slot="nav" panel="ownedPrograms">
          <intl-message label="ui:mainframe:tabs:ownedPrograms">Owned programs</intl-message>
        </sl-tab>
        <sl-tab slot="nav" panel="developingPrograms">
          <intl-message label="ui:mainframe:tabs:developingPrograms">Developing programs</intl-message>
        </sl-tab>

        <sl-tab-panel name="processes">
          <ca-mainframe-processes-panel></ca-mainframe-processes-panel>
        </sl-tab-panel>
        <sl-tab-panel name="hardware">
          <ca-mainframe-hardware-panel></ca-mainframe-hardware-panel>
        </sl-tab-panel>
        <sl-tab-panel name="ownedPrograms">
          <ca-mainframe-owned-programs-panel></ca-mainframe-owned-programs-panel>
        </sl-tab-panel>
        <sl-tab-panel name="developingPrograms">Developing programs</sl-tab-panel>
      </sl-tab-group>
    `;
  }
}
