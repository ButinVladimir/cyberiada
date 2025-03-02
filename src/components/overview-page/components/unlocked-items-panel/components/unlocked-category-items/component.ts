import { t } from 'i18next';
import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import type { ItemCategory } from '@shared/types';
import { sectionTitleStyle, detailsStyle, hintIconStyle, SCREEN_WIDTH_POINTS } from '@shared/styles';
import { OverviewUnlockedCategoryItemsController } from './controller';

@customElement('ca-overview-unlocked-category-items')
export class OverviewUnlockedCategoryItems extends BaseComponent<OverviewUnlockedCategoryItemsController> {
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

  @property({
    attribute: true,
  })
  category!: ItemCategory;

  protected controller: OverviewUnlockedCategoryItemsController;

  constructor() {
    super();

    this.controller = new OverviewUnlockedCategoryItemsController(this);
  }

  renderContent() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">${t(`overview.unlockedItems.${this.category}`, { ns: 'ui' })}</h4>

        <div class="content-table">${this.renderList()}</div>
      </sl-details>
    `;
  }

  private renderList = () => {
    const itemNames = this.controller.listItems(this.category);

    return itemNames.map(this.renderListItem);
  };

  private renderListItem = (itemName: string) => {
    const quality = this.controller.getItemHighestAvailableQuality(this.category, itemName);

    return html`
      <span>
        ${t(`${itemName}.name`, { ns: this.category })}

        <sl-tooltip>
          <span slot="content"> ${t(`${itemName}.overview`, { ns: this.category })} </span>

          <sl-icon name="question-circle"></sl-icon>
        </sl-tooltip>
      </span>
      <span> ${this.controller.formatter.formatQuality(quality)} </span>
    `;
  };
}
