import { html } from 'lit';
import { localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { CATEGORY_TEXTS, CLONE_TEMPLATE_TEXTS } from '@texts/index';
import { OverviewUnlockedCloneTemplatesController } from './controller';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';
import { unlockedItemsCategoryStyles } from '../../constants';

@localized()
@customElement('ca-overview-unlocked-clone-templates')
export class OverviewUnlockedCloneTemplates extends BaseComponent<OverviewUnlockedCloneTemplatesController> {
  static styles = unlockedItemsCategoryStyles;

  protected controller: OverviewUnlockedCloneTemplatesController;

  constructor() {
    super();

    this.controller = new OverviewUnlockedCloneTemplatesController(this);
  }

  render() {
    const cloneTemplatesCategory = CATEGORY_TEXTS.cloneTemplates();

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${cloneTemplatesCategory}</h4>

        <div class="content-table">${this.renderList()}</div>
      </sl-details>
    `;
  }

  private renderList = () => {
    const itemNames = this.controller.listItems();

    return itemNames.map(this.renderListItem);
  };

  private renderListItem = (itemName: CloneTemplateName) => {
    const cloneTemplateTitle = CLONE_TEMPLATE_TEXTS[itemName].title();
    const cloneTemplateOverview = CLONE_TEMPLATE_TEXTS[itemName].overview();
    const quality = this.controller.getItemHighestAvailableQuality(itemName);

    return html`
      <span>
        ${cloneTemplateTitle}

        <sl-tooltip>
          <span slot="content"> ${cloneTemplateOverview} </span>

          <sl-icon name="question-circle"></sl-icon>
        </sl-tooltip>
      </span>
      <span> ${this.controller.formatter.formatQuality(quality)} </span>
    `;
  };
}
