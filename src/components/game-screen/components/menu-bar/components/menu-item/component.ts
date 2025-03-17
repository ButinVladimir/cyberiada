import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseComponent } from '@shared/base-component';
import { MenuItemSelectedEvent } from '../../events/menu-item-selected-event';

@customElement('ca-menu-item')
export class MenuItem extends BaseComponent {
  static styles = css`
    :host {
      width: 100%;
    }

    button {
      display: flex;
      padding: var(--sl-spacing-small);
      width: 100%;
      box-sizing: border-box;
      background: none;
      border: 0 solid var(--sl-color-primary-600);
      font-family: var(--sl-font-sans);
      font-size: var(--sl-font-size-medium);
      line-height: var(--sl-line-height-normal);
      letter-spacing: var(--sl-letter-spacing-normal);
      color: var(--sl-color-neutral-950);
      white-space: nowrap;
      text-decoration: none;

      transition:
        border-left-width var(--sl-transition-x-fast) ease,
        background-color var(--sl-transition-x-fast) ease;
    }

    button:hover {
      background-color: var(--sl-panel-background-color);
      cursor: pointer;
    }

    button.selected {
      background-color: var(--sl-panel-background-color);
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
      <button type="button" class=${classes} @click=${this.handleClick}>
        ${t(`pages.${this.name}`, { ns: 'ui' })}
      </button>
    `;
  }

  private handleClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new MenuItemSelectedEvent(this.name));
  };
}
