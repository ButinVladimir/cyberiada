import { html, nothing } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/index';
import { OverviewUnlockedItemsPanelController } from './controller';
import styles from './styles';

@localized()
@customElement('ca-overview-unlocked-items-panel')
export class OverviewUnlockedItemsPanel extends BaseComponent {
  static styles = styles;

  private _controller: OverviewUnlockedItemsPanelController;

  constructor() {
    super();

    this._controller = new OverviewUnlockedItemsPanelController(this);
  }

  render() {
    const programsUnlocked = this._controller.areProgramsUnlocked();
    const noItemsUnlocked = !programsUnlocked;

    if (noItemsUnlocked) {
      return html`${msg('No items has been unlocked yet')}`;
    }

    return this.renderCategories();
  }

  private renderCategories() {
    const programsUnlocked = this._controller.areProgramsUnlocked();
    const cloneTemplatesUnlocked = this._controller.areCloneTemplatesUnlocked();

    return html`
      <p class="hint">
        ${msg(`Loaned items are received on the start and rewarded by capturing districts.
Number next to item name is it's maximum tier available.`)}
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
