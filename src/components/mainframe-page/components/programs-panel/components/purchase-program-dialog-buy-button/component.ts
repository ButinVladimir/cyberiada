import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import type { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { PurchaseProgramDialogBuyButtonController } from './controller';
import { BuyProgramEvent } from './events';

@customElement('ca-purchase-program-dialog-buy-button')
export class PurchaseProgramDialogBuyButton extends BaseComponent<PurchaseProgramDialogBuyButtonController> {
  static styles = css``;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName?: ProgramName;

  @property({
    attribute: 'level',
    type: Number,
  })
  level!: number;

  @property({
    attribute: 'quality',
    type: Number,
  })
  quality!: number;

  protected controller: PurchaseProgramDialogBuyButtonController;

  constructor() {
    super();

    this.controller = new PurchaseProgramDialogBuyButtonController(this);
  }

  render() {
    const { formatter, money } = this.controller;

    const program = this.programName
      ? this.controller.getSelectedProgram(this.programName, this.quality, this.level)
      : undefined;
    const cost = program ? program.cost : 0;

    const submitButtonDisabled = !(
      program &&
      cost <= money &&
      this.controller.isProgramAvailable(program.name, this.quality, this.level)
    );

    return html`
      <ca-purchase-tooltip cost=${cost} level=${this.level} slot="footer">
        <sl-button size="medium" variant="primary" ?disabled=${submitButtonDisabled} @click=${this.handlePurchase}>
          ${t('mainframe.programs.purchase', { ns: 'ui', cost: formatter.formatNumberFloat(cost) })}
        </sl-button>
      </ca-purchase-tooltip>
    `;
  }

  private handlePurchase = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new BuyProgramEvent());
  };
}
