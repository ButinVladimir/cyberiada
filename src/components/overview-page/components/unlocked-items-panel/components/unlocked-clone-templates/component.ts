import { html } from 'lit';
import { localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { CATEGORY_TEXTS, CLONE_TEMPLATE_TEXTS } from '@texts/index';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';
import { HINT_ICON } from '@shared/styles';
import { OverviewUnlockedCloneTemplatesController } from './controller';
import { unlockedItemsCategoryStyles } from '../../styles';

@localized()
@customElement('ca-overview-unlocked-clone-templates')
export class OverviewUnlockedCloneTemplates extends BaseComponent {
  static styles = unlockedItemsCategoryStyles;

  private _controller: OverviewUnlockedCloneTemplatesController;

  constructor() {
    super();

    this._controller = new OverviewUnlockedCloneTemplatesController(this);
  }

  renderDesktop() {
    const cloneTemplatesCategory = CATEGORY_TEXTS.cloneTemplates();

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${cloneTemplatesCategory}</h4>

        <div class="content-table">${this.renderList()}</div>
      </sl-details>
    `;
  }

  private renderList = () => {
    const itemNames = this._controller.listItems();

    return itemNames.map(this.renderListItem);
  };

  private renderListItem = (itemName: CloneTemplateName) => {
    const cloneTemplateTitle = CLONE_TEMPLATE_TEXTS[itemName].title();
    const cloneTemplateOverview = CLONE_TEMPLATE_TEXTS[itemName].overview();
    const tier = this._controller.getItemHighestAvailableTier(itemName);

    return html`
      <span>
        ${cloneTemplateTitle}

        <sl-tooltip>
          <span slot="content"> ${cloneTemplateOverview} </span>

          <sl-icon name=${HINT_ICON}></sl-icon>
        </sl-tooltip>
      </span>
      <span> ${this._controller.formatter.formatTier(tier)} </span>
    `;
  };
}
