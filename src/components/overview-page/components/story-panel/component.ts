import { css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import { BaseComponent } from '@shared/base-component';
import { inputLabelStyle, SCREEN_WIDTH_POINTS } from '@shared/styles';
import { IStoryGoal } from '@state/global-state/interfaces/story-goal';
import { STORY_GOAL_STATES } from '@state/global-state/constants';
import { StoryGoalState } from '@state/global-state/types';
import { OverviewStoryPanelController } from './controller';
import { KEYS_SEPARATOR } from '../../constants';
import { STORY_GOAL_STATE_FILTER_TITLES } from './constants';
import { type StoryGoalStateFilter } from './types';

@localized()
@customElement('ca-overview-story-panel')
export class OverviewStoryPanel extends BaseComponent {
  static styles = [
    inputLabelStyle,
    css`
      div.state-filter-container {
        width: 100%;
        margin-bottom: var(--sl-spacing-2x-large);
      }

      div.goals-list {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: var(--sl-spacing-large);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        div.state-filter-container {
          width: 30rem;
          max-width: 100%;
        }
      }
    `,
  ];

  private _controller: OverviewStoryPanelController;

  private _stateFilterInputRef = createRef<SlSelect>();

  @state()
  private _stateFilter: StoryGoalStateFilter = 'all';

  constructor() {
    super();

    this._controller = new OverviewStoryPanelController(this);
  }

  render() {
    const goals = this._controller.listGoals();

    return html`
      <div class="state-filter-container">
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
