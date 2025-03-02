import { t } from 'i18next';
import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { OverviewUnlockedItemsPanelController } from './controller';

@customElement('ca-overview-unlocked-items-panel')
export class OverviewUnlockedItemsPanel extends BaseComponent<OverviewUnlockedItemsPanelController> {
  static styles = [
    hintStyle,
    css`
      p.hint {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-large);
      }

      div.categories {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        gap: var(--sl-spacing-large);
      }
    `,
  ];

  protected controller: OverviewUnlockedItemsPanelController;

  constructor() {
    super();

    this.controller = new OverviewUnlockedItemsPanelController(this);
  }

  renderContent() {
    const programsUnlocked = this.controller.areProgramsUnlocked();
    const noItemsUnlocked = !programsUnlocked;

    if (noItemsUnlocked) {
      return html`${t('overview.unlockedItems.noItems', { ns: 'ui' })}`;
    }

    return this.renderCategories();
  }

  private renderCategories() {
    const programsUnlocked = this.controller.areProgramsUnlocked();

    return html`
      <p class="hint">${t('overview.unlockedItems.hint', { ns: 'ui' })}</p>
      <div class="categories">
        ${programsUnlocked
          ? html`<ca-overview-unlocked-category-items category="programs"></ca-overview-unlocked-category-items>`
          : nothing}
      </div>
    `;
  }
}
