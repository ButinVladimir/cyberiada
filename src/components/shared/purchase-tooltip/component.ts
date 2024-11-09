import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PurchaseTooltipController } from './controller';

@customElement('ca-purchase-tooltip')
export class PurchaseTooltip extends LitElement {
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

  private _purchaseTooltipController: PurchaseTooltipController;

  constructor() {
    super();

    this._purchaseTooltipController = new PurchaseTooltipController(this);
  }

  render() {
    return html`
      <sl-tooltip>
        ${this.renderMessage()}

        <slot></slot>
      </sl-tooltip>
    `;
  }

  renderMessage = () => {
    if (this.level > this._purchaseTooltipController.cityDevelopmentLevel) {
      return html`
        <intl-message slot="content" label="ui:common:higherCityDevelopmentLevelRequired">
          Higher city development level required
        </intl-message>
      `;
    }

    if (this.cost <= this._purchaseTooltipController.money) {
      return html` <intl-message slot="content" label="ui:common:available"> Available </intl-message> `;
    }

    if (this._purchaseTooltipController.growth > 0) {
      const time = this._purchaseTooltipController.formatter.formatTimeShort(
        (this.cost - this._purchaseTooltipController.money) / this._purchaseTooltipController.growth,
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
