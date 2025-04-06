import { html, css } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { sectionTitleStyle, detailsStyle, hintIconStyle, SCREEN_WIDTH_POINTS } from '@shared/styles';
import { PROGRAM_TEXTS } from '@texts/index';
import { OverviewUnlockedProgramsController } from './controller';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';

@localized()
@customElement('ca-overview-unlocked-programs')
export class OverviewUnlockedPrograms extends BaseComponent<OverviewUnlockedProgramsController> {
  static styles = [
    sectionTitleStyle,
    detailsStyle,
    hintIconStyle,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: var(--sl-spacing-large);
      }

      h4.title {
        margin-bottom: 0;
      }

      .content-table {
        display: grid;
        column-gap: var(--sl-spacing-3x-small);
        row-gap: var(--sl-spacing-3x-small);
        grid-template-columns: auto;
        grid-auto-rows: auto;
      }

      .content-table > span:nth-child(even) {
        text-align: start;
        white-space: nowrap;
        margin-bottom: var(--sl-spacing-medium);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        .content-table {
          grid-template-columns: auto auto;
          row-gap: var(--sl-spacing-small);
        }

        .content-table > span:nth-child(even) {
          text-align: end;
          margin-bottom: 0;
        }
      }
    `,
  ];

  protected controller: OverviewUnlockedProgramsController;

  constructor() {
    super();

    this.controller = new OverviewUnlockedProgramsController(this);
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('Programs')}</h4>

        <div class="content-table">${this.renderList()}</div>
      </sl-details>
    `;
  }

  private renderList = () => {
    const itemNames = this.controller.listItems();

    return itemNames.map(this.renderListItem);
  };

  private renderListItem = (itemName: ProgramName) => {
    const quality = this.controller.getItemHighestAvailableQuality(itemName);

    return html`
      <span>
        ${PROGRAM_TEXTS[itemName].title()}

        <sl-tooltip>
          <span slot="content"> ${PROGRAM_TEXTS[itemName].overview()} </span>

          <sl-icon name="question-circle"></sl-icon>
        </sl-tooltip>
      </span>
      <span> ${this.controller.formatter.formatQuality(quality)} </span>
    `;
  };
}
