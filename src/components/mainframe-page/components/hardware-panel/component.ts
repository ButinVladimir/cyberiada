import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { IMainframeHardwareParameter } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-parameter';
import type { MainframeHardwareParameterType } from '@state/mainframe/mainframe-hardware-state/types';
import { SortableElementMovedEvent } from '@components/shared/sortable-list/events/sortable-element-moved';
import { hintStyle } from '@shared/styles';
import { MainframeHardwarePanelController } from './controller';
import { GAP } from './constants';

@customElement('ca-mainframe-hardware-panel')
export class MainframeHardwarePanel extends BaseComponent<MainframeHardwarePanelController> {
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

  protected controller: MainframeHardwarePanelController;

  @state()
  private _shiftPressed = false;

  @state()
  private _ctrlPressed = false;

  constructor() {
    super();

    this.controller = new MainframeHardwarePanelController(this);
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

  renderContent() {
    return html`
      <p class="hint">${t('mainframe.hardware.hardwareHint', { ns: 'ui' })}</p>

      <div class="buttons-block">
        <sl-button variant="default" type="button" size="medium" @click=${this.handleBuyMax}>
          ${t('mainframe.hardware.buyMaxAllUpgrades', { ns: 'ui' })}
        </sl-button>
      </div>

      <ca-sortable-list gap=${GAP} @sortable-element-moved=${this.handleMoveElement}>
        ${repeat(this.controller.listParameters(), (parameter) => parameter.type, this.renderParameter)}
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

  private handleBuyMax = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    this.controller.purchaseMax();
  };

  private handleMoveElement = (event: SortableElementMovedEvent) => {
    event.stopPropagation();
    event.preventDefault();

    this.controller.moveParameter(event.keyName as MainframeHardwareParameterType, event.position);
  };
}
