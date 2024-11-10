import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('ca-mainframe-hardware-panel')
export class MainframeHardwarePanel extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      max-width: var(--ca-viewport-width);
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      gap: var(--sl-spacing-large);
    }

    p.hint {
      margin: 0;
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }
  `;

  @state()
  private _shiftPressed = false;

  @state()
  private _ctrlPressed = false;

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('keydown', this.handleKeypress);
    window.addEventListener('keyup', this.handleKeypress);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('keydown', this.handleKeypress);
    window.removeEventListener('keyup', this.handleKeypress);
  }

  render() {
    const maxIncrease = this.getMaxIncrease();

    return html`
      <p class="hint">
        <intl-message label="ui:mainframe:hardware:keyboardHint">
          Press either ctrl or shift to buy 10 levels. Press both ctrl and shift to buy 100 levels.
        </intl-message>
      </p>
      <ca-mainframe-hardware-panel-article type="performance" max-increase=${maxIncrease}>
      </ca-mainframe-hardware-panel-article>

      <ca-mainframe-hardware-panel-article type="cores" max-increase=${maxIncrease}>
      </ca-mainframe-hardware-panel-article>

      <ca-mainframe-hardware-panel-article type="ram" max-increase=${maxIncrease}>
      </ca-mainframe-hardware-panel-article>
    `;
  }

  private handleKeypress = (event: KeyboardEvent) => {
    this._shiftPressed = event.shiftKey;
    this._ctrlPressed = event.ctrlKey;
  };

  private getMaxIncrease(): number {
    let maxIncrease = 1;

    if (this._shiftPressed) {
      maxIncrease *= 10;
    }

    if (this._ctrlPressed) {
      maxIncrease *= 10;
    }

    return maxIncrease;
  }
}
