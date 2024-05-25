import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-side-bar')
export class SideBar extends LitElement {
  static styles = css`
    :host > div {
      position: absolute;
      width: 0;
      left: 0;
      top: 0;
      min-height: 100%;
      display: flex;
      background-color: var(--sl-panel-background-color);
      box-sizing: border-box;
      overflow-x: hidden;
      padding: var(--sl-spacing-large);
    }

    :host > div.opened {
      width: auto;
      box-shadow: var(--sl-shadow-small);
      border-right: var(--sl-panel-border-width) solid var(--sl-panel-border-color);
    }
  `;

  @property({ attribute: true, type: Boolean })
  public opened = true;

  render() {
    const classes = {
      opened: this.opened,
    };

    return html`
      <div class=${classMap(classes)}>
        Menu
      </div>  
    `;
  }
}
