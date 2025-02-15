import { t } from 'i18next';
import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseComponent } from '@shared/base-component';
import { IStoryEvent } from '@state/global-state/interfaces/story-event';
import { TopBarAvailableGoalsController } from './controller';

@customElement('ca-top-bar-available-goals')
export class TopBarAvailableGoals extends BaseComponent<TopBarAvailableGoalsController> {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      box-sizing: border-box;
      align-items: center;
    }

    sl-icon {
      color: var(--ca-hint-color);
      padding: var(--sl-spacing-medium);
    }

    ul.goals {
      margin: 1rem 0 0 0;
      padding: 0;
    }

    ul.goals li {
      margin: 0;
      list-style: none;
    }
  `;

  protected controller: TopBarAvailableGoalsController;

  constructor() {
    super();

    this.controller = new TopBarAvailableGoalsController(this);
  }

  renderContent() {
    return html`
      <sl-tooltip>
        <span slot="content">${this.renderTooltipContent()}</span>

        <sl-icon name="crosshair"> </sl-icon>
      </sl-tooltip>
    `;
  }

  private renderTooltipContent = () => {
    const availableGoals = this.controller.listAvailableGoals();

    if (availableGoals.length === 0) {
      return html` ${t('topBar.availableGoals.titleNoGoals', { ns: 'ui' })} `;
    }

    return html`
      ${t('topBar.availableGoals.titleGoalsExist', { ns: 'ui' })}
      <ul class="goals">
        ${repeat(availableGoals, (goal) => goal.key, this.renderGoal)}
      </ul>
    `;
  };

  private renderGoal = (goal: IStoryEvent) => {
    return html` <li>${t('topBar.availableGoals.reachLevel', { ns: 'ui', level: goal.level })}</li> `;
  };
}
