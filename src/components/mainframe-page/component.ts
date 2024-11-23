import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { MainframePageController } from './controller';

@customElement('ca-mainframe-page')
export class MainframePage extends BaseComponent<MainframePageController> {
  static styles = css`
    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-2x-small);
      line-height: var(--sl-line-height-denser);
    }
  `;

  protected controller: MainframePageController;

  constructor() {
    super();

    this.controller = new MainframePageController(this);
  }

  renderContent() {
    const isMainframeHardwareUnlocked = this.controller.isMainframeHardwareUnlocked();
    const isMainframeProgramsUnlocked = this.controller.isMainframeProgramsUnlocked();

    return html`
      <h3 class="title">
        <intl-message label="ui:mainframe:mainframe">Mainframe</intl-message>
      </h3>

      <sl-tab-group>
        <sl-tab slot="nav" panel="processes">
          <intl-message label="ui:mainframe:tabs:processes">Processes</intl-message>
        </sl-tab>
        ${isMainframeHardwareUnlocked
          ? html`
              <sl-tab slot="nav" panel="hardware">
                <intl-message label="ui:mainframe:tabs:hardware">Hardware</intl-message>
              </sl-tab>
            `
          : null}
        ${isMainframeProgramsUnlocked
          ? html`
              <sl-tab slot="nav" panel="programs">
                <intl-message label="ui:mainframe:tabs:programs">Programs</intl-message>
              </sl-tab>
            `
          : null}

        <sl-tab-panel name="processes">
          <ca-mainframe-processes-panel></ca-mainframe-processes-panel>
        </sl-tab-panel>
        ${isMainframeHardwareUnlocked
          ? html`
              <sl-tab-panel name="hardware">
                <ca-mainframe-hardware-panel></ca-mainframe-hardware-panel>
              </sl-tab-panel>
            `
          : null}
        ${isMainframeProgramsUnlocked
          ? html`
              <sl-tab-panel name="programs">
                <ca-mainframe-programs-panel></ca-mainframe-programs-panel>
              </sl-tab-panel>
            `
          : null}
      </sl-tab-group>
    `;
  }
}
