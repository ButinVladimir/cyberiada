import { css, html } from 'lit';
import { msg, localized, str } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle, SCREEN_WIDTH_POINTS } from '@shared/styles';
import { ClonesPanelController } from './controller';

@localized()
@customElement('ca-company-clones-panel')
export class CompanyClonesPanel extends BaseComponent<ClonesPanelController> {
  static styles = [
    hintStyle,
    css`
      :host {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
      }

      p.hint {
        margin: 0;
        margin-bottom: var(--sl-spacing-large);
      }

      div.top-container {
        display: grid;
        grid-template-areas:
          'synchronization'
          'purchase-clone';
        gap: var(--sl-spacing-medium);
      }

      .purchase-clone {
        grid-area: purchase-clone;
      }

      .synchronization {
        grid-area: synchronization;
      }

      ca-clones-list {
        margin-top: var(--sl-spacing-large);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        div.top-container {
          grid-template-areas: 'purchase-clone synchronization';
          align-items: center;
          gap: var(--sl-spacing-3x-large);
        }
      }
    `,
  ];

  @state()
  private _isPurchaseCloneDialogOpen = false;

  protected controller: ClonesPanelController;

  constructor() {
    super();

    this.controller = new ClonesPanelController(this);
  }

  render() {
    const formatter = this.controller.formatter;

    const formattedAvailableSynchronization = formatter.formatNumberDecimal(this.controller.availableSynchronization);
    const formattedTotalSynchronization = formatter.formatNumberDecimal(this.controller.totalSynchronization);

    return html`
      <p class="hint">
        ${msg(`Clone autoupgrade priority can be changed by dragging it by the name.
Clones on top have higher priority.`)}
      </p>

      <div class="top-container">
        <sl-button class="purchase-clone" variant="primary" size="medium" @click=${this.handlePurchaseCloneDialogOpen}>
          ${msg('Purchase clone')}
        </sl-button>

        <div class="synchronization">
          ${msg(
            str`Available synchronization: ${formattedAvailableSynchronization} / ${formattedTotalSynchronization}`,
          )}
        </div>
      </div>

      <ca-clones-list></ca-clones-list>

      <ca-purchase-clone-dialog
        ?is-open=${this._isPurchaseCloneDialogOpen}
        @purchase-clone-dialog-close=${this.handlePurchaseCloneDialogClose}
      ></ca-purchase-clone-dialog>
    `;
  }

  private handlePurchaseCloneDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isPurchaseCloneDialogOpen = true;
  };

  private handlePurchaseCloneDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isPurchaseCloneDialogOpen = false;
  };
}
