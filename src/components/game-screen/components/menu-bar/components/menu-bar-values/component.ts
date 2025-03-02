import { t } from 'i18next';
import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { MenuBarValuesController } from './controller';

@customElement('ca-menu-bar-values')
export class MenuBarValues extends BaseComponent<MenuBarValuesController> {
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

  protected controller: MenuBarValuesController;

  constructor() {
    super();

    this.controller = new MenuBarValuesController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;
    const accumulatedTimeFormatted = formatter.formatTimeShort(this.controller.accumulatedTime);
    const moneyFormatted = formatter.formatNumberFloat(this.controller.money);
    const developmentLevelFormatted = formatter.formatNumberDecimal(this.controller.developmentLevel);

    return html`
      <div class="block">
        <sl-tooltip>
          <span slot="content"> ${t('menuBar.accumulatedTime', { ns: 'ui', time: accumulatedTimeFormatted })} </span>

          <sl-icon name="clock"> </sl-icon>

          <span class="text"> ${accumulatedTimeFormatted} </span>
        </sl-tooltip>
      </div>

      <div class="block">
        <sl-tooltip>
          <span slot="content"> ${t('menuBar.money', { ns: 'ui', money: moneyFormatted })} </span>

          <sl-icon name="currency-bitcoin"> </sl-icon>

          <span class="text"> ${moneyFormatted} </span>
        </sl-tooltip>
      </div>

      <div class="block">
        <sl-tooltip>
          <span slot="content">
            ${t(`menuBar.developmentLevel`, {
              ns: 'ui',
              level: developmentLevelFormatted,
            })}
          </span>

          <sl-icon name="star"> </sl-icon>

          <span class="text"> ${developmentLevelFormatted} </span>
        </sl-tooltip>
      </div>
    `;
  }
}
