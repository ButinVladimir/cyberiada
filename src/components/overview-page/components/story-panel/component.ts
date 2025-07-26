import { html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import { BaseComponent } from '@shared/index';
import { IStoryGoal, STORY_GOAL_STATES, StoryGoalState } from '@state/global-state';
import { OverviewStoryPanelController } from './controller';
import { KEYS_SEPARATOR } from '../../constants';
import { STORY_GOAL_STATE_FILTER_TITLES } from './constants';
import { type StoryGoalStateFilter } from './types';
import styles from './styles';
import { classMap } from 'lit/directives/class-map.js';

@localized()
@customElement('ca-overview-story-panel')
export class OverviewStoryPanel extends BaseComponent {
  static styles = styles;

  protected hasMobileRender = true;

  private _controller: OverviewStoryPanelController;

  private _stateFilterInputRef = createRef<SlSelect>();

  @state()
  private _stateFilter: StoryGoalStateFilter = 'all';

  constructor() {
    super();

    this._controller = new OverviewStoryPanelController(this);
  }

  protected renderDesktop() {
    return this.renderContent(true);
  }

  protected renderMobile() {
    return this.renderContent(false);
  }

  private renderContent(desktop: boolean) {
    const goals = this._controller.listGoals();
    const stateFilterContainerClasses = classMap({
      'state-filter-container': true,
      desktop: desktop,
      mobile: !desktop,
    });

    return html`
      <div class=${stateFilterContainerClasses}>
        <sl-select
          ${ref(this._stateFilterInputRef)}
          name="state-filter"
          value=${this._stateFilter}
          hoist
          @sl-change=${this.handleStateFilterChange}
        >
          <span class="input-label" slot="label"> ${msg('Event state filter')} </span>

          <sl-option value="all"> ${STORY_GOAL_STATE_FILTER_TITLES['all']()}</sl-option>
          ${STORY_GOAL_STATES.map(
            (state) => html`<sl-option value=${state}> ${STORY_GOAL_STATE_FILTER_TITLES[state]()}</sl-option>`,
          )}
        </sl-select>
      </div>
      <div class="goals-list">${this.renderGoalsList(goals)}</div>
    `;
  }

  private renderGoalsList = (goals: IStoryGoal[]) => {
    let filteredGoals = goals;
    if (this._stateFilter !== 'all') {
      filteredGoals = goals.filter((goal) => goal.state === this._stateFilter);
    }

    return filteredGoals.map(this.renderGoal);
  };

  private renderGoal = (goal: IStoryGoal) => {
    const messages = goal.messages ? goal.messages.join(KEYS_SEPARATOR) : undefined;
    const unlockFeatures = goal.unlockFeatures ? goal.unlockFeatures.join(KEYS_SEPARATOR) : undefined;

    return html`
      <ca-overview-story-goal
        level=${ifDefined(goal.level)}
        messages=${ifDefined(messages)}
        unlock-features=${ifDefined(unlockFeatures)}
        state=${goal.state}
      ></ca-overview-story-goal>
    `;
  };

  private handleStateFilterChange = () => {
    if (!this._stateFilterInputRef.value) {
      return;
    }

    const stateFilterValue = this._stateFilterInputRef.value.value as StoryGoalState | 'all';
    this._stateFilter = stateFilterValue;
  };
}
