import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { formatter } from '@shared/formatter';
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
    const bonusTimeFormatted = formatter.formatTimeShort(this._topBarValuesController.bonusTime);
    const moneyFormatted = formatter.formatNumberLong(this._topBarValuesController.money);

    return html`
      <div class="block">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:bonusTime"> Bonus time </intl-message>

          <sl-icon name="clock"> </sl-icon>
        </sl-tooltip>

        <span class="text"> ${bonusTimeFormatted} </span>
      </div>

      <div class="block">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:money"> Money </intl-message>

          <sl-icon name="currency-bitcoin"> </sl-icon>
        </sl-tooltip>

        <span class="text"> ${moneyFormatted} </span>
      </div>
    `;
  }
}
