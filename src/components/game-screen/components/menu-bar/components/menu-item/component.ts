import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { t } from 'i18next';

@customElement('ca-menu-item')
export class MenuItem extends LitElement {
  static styles = css`
    :host {
      width: 100%;
    }

    button {
      display: flex;
      padding: var(--sl-spacing-small);
      width: 100%;
      background: none;
      border: none;
      font: var(--sl-font-sans);
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-semibold);
      letter-spacing: var(--sl-letter-spacing-normal);    
      color: var(--sl-color-neutral-950);
      white-space: nowrap;
    }

    button:hover {
      background-color: var(--sl-color-neutral-100);
      cursor: pointer;
    }

    button.selected {
      border-left: var(--sl-spacing-2x-small) solid var(--sl-color-primary-600);
      font-weight: var(--sl-font-weight-bold);
    }
  `;

  @property({
    attribute: true,
    type: String,
  })
  name = '';

  @property({
    attribute: true,
    type: Boolean,
  })
  selected = false;

  render() {
    const translatedName = t(`pages.${this.name}`, { ns: 'ui' });

    const classes = classMap({
      selected: this.selected,
    });

    return html`
      <button type="button" class=${classes}>
        ${translatedName}
      </button>
    `;
  }
}
