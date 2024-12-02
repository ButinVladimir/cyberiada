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
        ${this.renderMessage()}

        <slot></slot>
      </sl-tooltip>
    `;
  }

  private renderMessage = () => {
    if (this.level > this.controller.developmentLevel) {
      return html`
        <intl-message slot="content" label="ui:common:higherDevelopmentLevelRequired">
          Higher development level required
        </intl-message>
      `;
    }

    if (this.cost <= this.controller.money) {
      return html` <intl-message slot="content" label="ui:common:available"> Available </intl-message> `;
    }

    if (this.controller.growth > 0) {
      const time = this.controller.formatter.formatTimeShort(
        (this.cost - this.controller.money) / this.controller.growth,
      );

      return html`
        <intl-message slot="content" label="ui:common:willBeAvailableIn" value=${time}>
          Will be available
        </intl-message>
      `;
    }

    return html` <intl-message slot="content" label="ui:common:notEnoughMoney"> Not enough money </intl-message> `;
  };
}
