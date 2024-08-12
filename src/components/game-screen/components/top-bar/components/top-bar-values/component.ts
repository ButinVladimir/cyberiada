import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { formatTimeShort } from '@shared/formatters';
import { TopBarValuesController } from './controller';

@customElement('ca-top-bar-values')
export class TopBarValues extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      align-items: stretch
    }

    div.block {
      display: flex;
      align-items: center;
    }

    sl-icon {
      margin-right: var(--sl-spacing-small);
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
    const bonusTimeFormatted = formatTimeShort(this._topBarValuesController.bonusTime);

    return html`
      <div class="block">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:bonusTime"> Bonus time </intl-message>
  
          <sl-icon name="clock">
          </sl-icon>
        </sl-tooltip>

        <span class="text">
          ${bonusTimeFormatted}
        </span>
      </div>
    `;
  }
}
