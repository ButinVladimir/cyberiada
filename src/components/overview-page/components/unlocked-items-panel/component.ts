import { css, html, nothing } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { OverviewUnlockedItemsPanelController } from './controller';

@localized()
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

  render() {
    const programsUnlocked = this.controller.areProgramsUnlocked();
    const noItemsUnlocked = !programsUnlocked;

    if (noItemsUnlocked) {
      return html`${msg('No items has been unlocked yet')}`;
    }

    return this.renderCategories();
  }

  private renderCategories() {
    const programsUnlocked = this.controller.areProgramsUnlocked();
    const cloneTemplatesUnlocked = this.controller.areCloneTemplatesUnlocked();

    return html`
      <p class="hint">
        ${msg(`Loaned items are items received on start and rewarded by capturing districts.
Number next to item name is it's maximum quality available.`)}
      </p>
      <div class="categories">
        ${programsUnlocked ? html`<ca-overview-unlocked-programs></ca-overview-unlocked-programs>` : nothing}
        ${cloneTemplatesUnlocked
          ? html`<ca-overview-unlocked-clone-templates></ca-overview-unlocked-clone-templates>`
          : nothing}
      </div>
    `;
  }
}
