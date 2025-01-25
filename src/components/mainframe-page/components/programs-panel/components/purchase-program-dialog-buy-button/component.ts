import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramName } from '@state/progam-factory/types';
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

  renderContent() {
    const { formatter, money, developmentLevel } = this.controller;

    const program = this.programName
      ? this.controller.getSelectedProgram(this.programName, this.level, this.quality)
      : undefined;
    const cost = program ? program.cost : 0;

    const submitButtonDisabled = !(program && this.level <= developmentLevel && cost <= money);

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
