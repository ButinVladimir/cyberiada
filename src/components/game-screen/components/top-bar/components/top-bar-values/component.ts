import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TopBarValuesController } from './controller';

@customElement('ca-top-bar-values')
export class TopBarValues extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      align-items: stretch;
      gap: var(--sl-spacing-medium);
    }

    div.block {
      display: flex;
      align-items: center;
    }

    sl-icon[name='clock'] {
      margin-right: var(--sl-spacing-small);
    }

    sl-icon[name='currency-bitcoin'] {
      margin-right: var(--sl-spacing-2x-small);
    }

    sl-icon[name='star'] {
      margin-right: var(--sl-spacing-2x-small);
    }

    span.text {
      font-size: var(--sl-font-size-medium);
    }
  `;

  private _topBarValuesController: TopBarValuesController;

  constructor() {
    super();

    this._topBarValuesController = new TopBarValuesController(this);
  }

  render() {
    const formatter = this._topBarValuesController.formatter;
    const offlineTimeFormatted = formatter.formatTimeShort(this._topBarValuesController.offlineTime);
    const moneyFormatted = formatter.formatNumberLong(this._topBarValuesController.money);
    const cityLevelFormatted = formatter.formatNumberDecimal(this._topBarValuesController.cityLevel);

    return html`
      <div class="block">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:offlineTime"> Offline time </intl-message>

          <sl-icon name="clock"> </sl-icon>

          <span class="text"> ${offlineTimeFormatted} </span>
        </sl-tooltip>
      </div>

      <div class="block">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:money"> Money </intl-message>

          <sl-icon name="currency-bitcoin"> </sl-icon>

          <span class="text"> ${moneyFormatted} </span>
        </sl-tooltip>
      </div>

      <div class="block">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:cityLevel"> City level </intl-message>

          <sl-icon name="star"> </sl-icon>

          <span class="text"> ${cityLevelFormatted} </span>
        </sl-tooltip>
      </div>
    `;
  }
}
