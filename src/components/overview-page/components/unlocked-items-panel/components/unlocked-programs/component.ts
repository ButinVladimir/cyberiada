import { html } from 'lit';
import { localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { CATEGORY_TEXTS, PROGRAM_TEXTS } from '@texts/index';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { HINT_ICON } from '@shared/styles';
import { OverviewUnlockedProgramsController } from './controller';
import { unlockedItemsCategoryStyles } from '../../styles';

@localized()
@customElement('ca-overview-unlocked-programs')
export class OverviewUnlockedPrograms extends BaseComponent {
  static styles = unlockedItemsCategoryStyles;

  private _controller: OverviewUnlockedProgramsController;

  constructor() {
    super();

    this._controller = new OverviewUnlockedProgramsController(this);
  }

  protected renderDesktop() {
    const programsCategory = CATEGORY_TEXTS.programs();

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${programsCategory}</h4>

        <div class="content-table">${this.renderList()}</div>
      </sl-details>
    `;
  }

  private renderList = () => {
    const itemNames = this._controller.listItems();

    return itemNames.map(this.renderListItem);
  };

  private renderListItem = (itemName: ProgramName) => {
    const programTitle = PROGRAM_TEXTS[itemName].title();
    const programOverview = PROGRAM_TEXTS[itemName].overview();
    const tier = this._controller.getItemHighestAvailableTier(itemName);

    return html`
      <span>
        ${programTitle}

        <sl-tooltip>
          <span slot="content"> ${programOverview} </span>

          <sl-icon name=${HINT_ICON}></sl-icon>
        </sl-tooltip>
      </span>
      <span> ${this._controller.formatter.formatTier(tier)} </span>
    `;
  };
}
