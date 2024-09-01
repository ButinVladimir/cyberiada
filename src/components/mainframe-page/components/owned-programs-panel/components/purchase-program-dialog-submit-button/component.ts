import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PurchaseProgramDialogSubmitButtonController } from './controller';

@customElement('ca-purchase-program-dialog-submit-button')
export class PurchaseProgramDialogSubmitButton extends LitElement {
  static styles = css``;

  private _purchaseProgramDialogSubmitButtonController: PurchaseProgramDialogSubmitButtonController;

  @property({
    attribute: 'disabled',
    type: Boolean,
  })
  disabled = false;

  @property({
    attribute: 'cost',
    type: Number,
  })
  cost = 0;

  constructor() {
    super();

    this._purchaseProgramDialogSubmitButtonController = new PurchaseProgramDialogSubmitButtonController(this);
  }


  render() {
    const money = this._purchaseProgramDialogSubmitButtonController.money;

    const isEnabled = !this.disabled && money >= this.cost;

    return html`
      <sl-button
        size="medium"
        variant="primary"
        ?disabled=${!isEnabled}
      >
        <slot></slot>
      </sl-button>
    `;
  }
}
