import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { msg, localized } from '@lit/localize';
import { IMainframeHardwareParameter, type MainframeHardwareParameterType } from '@state/mainframe-state';
import { SortableElementMovedEvent } from '@components/shared/sortable-list/events/sortable-element-moved';
import { BaseComponent, hintStyle } from '@shared/index';
import { MainframeHardwarePanelController } from './controller';
import { GAP } from './constants';

@localized()
@customElement('ca-mainframe-hardware-panel')
export class MainframeHardwarePanel extends BaseComponent {
  static styles = [
    hintStyle,
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      p.hint {
        margin: 0 0 var(--sl-spacing-large);
      }

      ca-sortable-list {
        width: 100%;
      }

      ca-sortable-list::part(list) {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        gap: var(--sl-spacing-large);
      }

      ca-sortable-list ca-mainframe-hardware-panel-article.dragged {
        background-color: var(--ca-dragged-color);
      }

      div.buttons-block {
        margin: 0 0 var(--sl-spacing-large) 0;
      }
    `,
  ];

  private _controller: MainframeHardwarePanelController;

  @state()
  private _shiftPressed = false;

  @state()
  private _ctrlPressed = false;

  constructor() {
    super();

    this._controller = new MainframeHardwarePanelController(this);
  }

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
    return html`
      <p class="hint">
        ${msg(`Press either Ctrl or Shift to buy 10 levels. Press both Ctrl and Shift to buy 100 levels.
Hardware autoupgrade priority can be changed by dragging it by the title.
Upgrades on top have higher priority.`)}
      </p>

      <div class="buttons-block">
        <sl-button variant="default" type="button" size="medium" @click=${this.handleBuyMax}>
          ${msg('Buy all upgrades')}
        </sl-button>
      </div>

      <ca-sortable-list gap=${GAP} @sortable-element-moved=${this.handleMoveElement}>
        ${repeat(this._controller.listParameters(), (parameter) => parameter.type, this.renderParameter)}
      </ca-sortable-list>
    `;
  }

  private renderParameter = (parameter: IMainframeHardwareParameter) => {
    const maxIncrease = this.getMaxIncrease();

    return html`
      <ca-mainframe-hardware-panel-article
        type=${parameter.type}
        max-increase=${maxIncrease}
        data-drag-id=${parameter.type}
      >
      </ca-mainframe-hardware-panel-article>
    `;
  };

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

  private handleBuyMax = () => {
    this._controller.purchaseMax();
  };

  private handleMoveElement = (event: SortableElementMovedEvent) => {
    this._controller.moveParameter(event.keyName as MainframeHardwareParameterType, event.position);
  };
}
