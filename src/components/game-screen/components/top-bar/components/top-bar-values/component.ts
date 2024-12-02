import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { TopBarValuesController } from './controller';

@customElement('ca-top-bar-values')
export class TopBarValues extends BaseComponent<TopBarValuesController> {
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

    sl-icon {
      color: var(--ca-hint-color);
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

  protected controller: TopBarValuesController;

  constructor() {
    super();

    this.controller = new TopBarValuesController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;
    const accumulatedTimeFormatted = formatter.formatTimeShort(this.controller.accumulatedTime);
    const moneyFormatted = formatter.formatNumberLong(this.controller.money);
    const developmentLevelFormatted = formatter.formatNumberDecimal(this.controller.developmentLevel);

    const isDevelopmentGrowing = this.controller.developmentGrowth > 0;
    const timeUntilNextLevel = isDevelopmentGrowing
      ? formatter.formatTimeShort(this.controller.developmentPointsUntilNextLevel / this.controller.developmentGrowth)
      : '';
    const developmentLabel = isDevelopmentGrowing ? 'developmentLevelNext' : 'developmentLevel';

    return html`
      <div class="block">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:accumulatedTime"> Accumulated time </intl-message>

          <sl-icon name="clock"> </sl-icon>

          <span class="text"> ${accumulatedTimeFormatted} </span>
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
          <intl-message slot="content" label="ui:topBar:${developmentLabel}" value=${timeUntilNextLevel}>
            Development level
          </intl-message>

          <sl-icon name="star"> </sl-icon>

          <span class="text"> ${developmentLevelFormatted} </span>
        </sl-tooltip>
      </div>
    `;
  }
}
