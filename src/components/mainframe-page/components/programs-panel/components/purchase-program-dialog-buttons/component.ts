import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { warningStyle } from '@shared/styles';
import type { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { PurchaseProgramDialogButtonsController } from './controller';
import { BuyProgramEvent, CancelEvent } from './events';

@customElement('ca-purchase-program-dialog-buttons')
export class PurchaseProgramDialogButtons extends BaseComponent<PurchaseProgramDialogButtonsController> {
  static styles = [
    warningStyle,
    css`
      p.warning {
        margin-top: var(--sl-spacing-3x-small);
        margin-bottom: 0;
      }
      div.buttons {
        display: flex;
        justify-content: flex-end;
        gap: var(--sl-spacing-medium);
      }
    `,
  ];

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

  protected controller: PurchaseProgramDialogButtonsController;

  constructor() {
    super();

    this.controller = new PurchaseProgramDialogButtonsController(this);
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

    const warning = this.getWarning(program);

    return html`
      <p class="warning">${warning}</p>

      <div class="buttons">
        <sl-button size="medium" variant="default" outline @click=${this.handleCancel}>
          ${t('common.close', { ns: 'ui' })}
        </sl-button>

        <sl-button size="medium" variant="primary" ?disabled=${submitButtonDisabled} @click=${this.handlePurchase}>
          ${t('mainframe.programs.purchase', { ns: 'ui', cost: formatter.formatNumberFloat(cost) })}
        </sl-button>
      </div>
    `;
  }

  private getWarning(program?: IProgram): string {
    if (!program) {
      return t('errors.selectProgram', { ns: 'ui' });
    }

    const formatter = this.controller.formatter;

    const cost = program.cost;
    const moneyGrowth = this.controller.moneyGrowth;
    const moneyDiff = cost - this.controller.money;

    if (moneyDiff > 0) {
      if (moneyGrowth <= 0) {
        return t('errors.notEnoughMoney', { ns: 'ui' });
      }

      const time = formatter.formatTimeShort(moneyDiff / moneyGrowth);

      return t('errors.willBeAvailableIn', { ns: 'ui', time });
    }

    const ownedProgram = this.controller.getOwnedProgram(this.programName!);
    if (ownedProgram) {
      return t('errors.programAlreadyBought', {
        ns: 'ui',
        level: formatter.formatNumberDecimal(ownedProgram.level),
        quality: formatter.formatQuality(ownedProgram.quality),
      });
    }

    return '';
  }

  private handleCancel = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new CancelEvent());
  };

  private handlePurchase = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new BuyProgramEvent());
  };
}
