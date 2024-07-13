import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

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
      border: 0 solid var(--sl-color-primary-600);
      font-family: var(--sl-font-sans);
      font-size: var(--sl-font-size-medium);
      letter-spacing: var(--sl-letter-spacing-normal);
      color: var(--sl-color-neutral-950);
      white-space: nowrap;

      transition:
        border-left-width var(--sl-transition-x-fast) ease,
        background-color var(--sl-transition-x-fast) ease;
    }

    button:hover {
      background-color: var(--sl-color-neutral-100);
      cursor: pointer;
    }

    button.selected {
      border-left-width: var(--sl-spacing-2x-small);
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
    const classes = classMap({
      selected: this.selected,
    });

    return html`
      <button type="button" class=${classes}>
        <intl-message label="ui:pages:${this.name}">
          ${this.name}
        </intl-message>
      </button>
    `;
  }
}
