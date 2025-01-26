import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { PurchaseTooltipController } from './controller';

@customElement('ca-purchase-tooltip')
export class PurchaseTooltip extends BaseComponent<PurchaseTooltipController> {
  static styles = css``;

  @property({
    attribute: 'cost',
    type: Number,
  })
  cost = 0;

  @property({
    attribute: 'level',
    type: Number,
  })
  level = 0;

  protected controller: PurchaseTooltipController;

  constructor() {
    super();

    this.controller = new PurchaseTooltipController(this);
  }

  renderContent() {
    return html`
      <sl-tooltip>
        <span slot="content"> ${this.renderMessage()} </span>

        <slot></slot>
      </sl-tooltip>
    `;
  }

  private renderMessage = () => {
    if (this.level > this.controller.developmentLevel) {
      return html`${t('common.higherDevelopmentLevelRequired', { ns: 'ui' })}`;
    }

    if (this.cost <= this.controller.money) {
      return html`${t('common.available', { ns: 'ui' })}`;
    }

    if (this.controller.growth > 0) {
      const time = this.controller.formatter.formatTimeShort(
        (this.cost - this.controller.money) / this.controller.growth,
      );

      return html`${t('common.willBeAvailableIn', { ns: 'ui', time })}`;
    }

    return html`${t('common.notEnoughMoney', { ns: 'ui' })}`;
  };
}
