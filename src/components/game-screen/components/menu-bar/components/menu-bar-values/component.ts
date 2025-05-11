import { html, css } from 'lit';
import { localized, msg } from '@lit/localize';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { MenuBarValuesController } from './controller';

@localized()
@customElement('ca-menu-bar-values')
export class MenuBarValues extends BaseComponent {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    div.block {
      display: flex;
      align-items: center;
      padding: var(--sl-spacing-small);
      font-size: var(--sl-font-size-medium);
      line-height: var(--sl-line-height-normal);
    }

    sl-icon {
      color: var(--ca-hint-color);
      width: 1rem;
      font-size: var(--sl-font-size-medium);
      margin-right: var(--sl-spacing-small);
    }
  `;

  hasPartialUpdate = true;

  private _controller: MenuBarValuesController;

  private _accumulatedTimeRef = createRef<HTMLSpanElement>();
  private _moneyRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this._controller = new MenuBarValuesController(this);
  }

  render() {
    const formatter = this._controller.formatter;
    const developmentLevelFormatted = formatter.formatLevel(this._controller.developmentLevel);

    return html`
      <div class="block">
        <sl-tooltip>
          <span slot="content"> ${msg('Accumulated time')} </span>
          <sl-icon name="clock"> </sl-icon>
        </sl-tooltip>
        <span class="text" ${ref(this._accumulatedTimeRef)}></span>
      </div>

      <div class="block">
        <sl-tooltip>
          <span slot="content"> ${msg('Money')} </span>
          <sl-icon name="currency-bitcoin"> </sl-icon>
        </sl-tooltip>
        <span class="text" ${ref(this._moneyRef)}></span>
      </div>

      <div class="block">
        <sl-tooltip>
          <span slot="content"> ${msg('Development level')} </span>
          <sl-icon name="star"> </sl-icon>
        </sl-tooltip>
        <span class="text"> ${developmentLevelFormatted} </span>
      </div>
    `;
  }

  handlePartialUpdate = () => {
    const formatter = this._controller.formatter;

    if (this._accumulatedTimeRef.value) {
      const formattedAccumulatedTime = formatter.formatTimeShort(this._controller.accumulatedTime);

      this._accumulatedTimeRef.value.textContent = formattedAccumulatedTime;
    }

    if (this._moneyRef.value) {
      const formattedMoney = formatter.formatNumberFloat(this._controller.money);

      this._moneyRef.value.textContent = formattedMoney;
    }
  };
}
