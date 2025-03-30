import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';

@customElement('ca-company-clones-panel')
export class CompanyClonesPanel extends BaseComponent {
  static styles = [
    hintStyle,
    css`
      :host {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: var(--sl-spacing-large);
      }

      p.hint {
        margin: 0;
      }
    `,
  ];

  render() {
    return html` <p class="hint">${t('company.clones.clonesHint', { ns: 'ui' })}</p> `;
  }
}
