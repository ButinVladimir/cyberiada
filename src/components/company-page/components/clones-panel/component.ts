import { css, html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';

@localized()
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
    return html` <p class="hint">${msg('Stuff about clones')}</p> `;
  }
}
