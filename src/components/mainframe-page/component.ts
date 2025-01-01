import { t } from 'i18next';
import { css, html, nothing } from 'lit';
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
      <h3 class="title">${t('mainframe.mainframe', { ns: 'ui' })}</h3>

      <sl-tab-group>
        <sl-tab slot="nav" panel="processes"> ${t('mainframe.tabs.processes', { ns: 'ui' })} </sl-tab>
        ${isMainframeHardwareUnlocked
          ? html` <sl-tab slot="nav" panel="hardware"> ${t('mainframe.tabs.hardware', { ns: 'ui' })} </sl-tab> `
          : nothing}
        ${isMainframeProgramsUnlocked
          ? html` <sl-tab slot="nav" panel="programs"> ${t('mainframe.tabs.programs', { ns: 'ui' })} </sl-tab> `
          : nothing}

        <sl-tab-panel name="processes">
          <ca-mainframe-processes-panel></ca-mainframe-processes-panel>
        </sl-tab-panel>
        ${isMainframeHardwareUnlocked
          ? html`
              <sl-tab-panel name="hardware">
                <ca-mainframe-hardware-panel></ca-mainframe-hardware-panel>
              </sl-tab-panel>
            `
          : nothing}
        ${isMainframeProgramsUnlocked
          ? html`
              <sl-tab-panel name="programs">
                <ca-mainframe-programs-panel></ca-mainframe-programs-panel>
              </sl-tab-panel>
            `
          : nothing}
      </sl-tab-group>
    `;
  }
}
