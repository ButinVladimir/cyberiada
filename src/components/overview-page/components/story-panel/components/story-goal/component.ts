import { t } from 'i18next';
import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StoryGoalState } from '@state/global-state/types';
import { sectionTitleStyle, detailsStyle } from '@shared/styles';
import { KEYS_SEPARATOR } from '../../../../constants';

@customElement('ca-overview-story-goal')
export class OverviewStoryPanel extends BaseComponent {
  static styles = [
    sectionTitleStyle,
    detailsStyle,
    css`
      h4.title {
        margin-bottom: 0;
      }

      article {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: var(--sl-spacing-medium);
      }

      article p {
        margin: 0;
      }
    `,
  ];

  @property({
    attribute: 'level',
    type: Number,
  })
  level?: number;

  @property({
    attribute: 'messages',
    type: String,
  })
  messages?: string;

  @property({
    attribute: 'unlock-features',
    type: String,
  })
  unlockFeatures?: string;

  @property({
    attribute: 'state',
    type: String,
  })
  state!: StoryGoalState;

  renderContent() {
    return html`
      <sl-details ?disabled=${this.state !== StoryGoalState.passed}>
        <h4 class="title" slot="summary">${this.renderSummary()}</h4>

        <article>${this.renderDetails()}</article>
      </sl-details>
    `;
  }

  private renderSummary = () => {
    const requirements = [];

    if (this.level !== undefined) {
      requirements.push(t('overview.story.requirements.level', { ns: 'ui', level: this.level }));
    }

    const requirementsString = requirements.join(', ');
    const result = requirementsString.charAt(0).toUpperCase() + requirementsString.slice(1);

    return result;
  };

  private renderDetails = () => {
    if (this.state !== StoryGoalState.passed) {
      return nothing;
    }

    const result = [];

    if (this.messages) {
      result.push(...this.messages.split(KEYS_SEPARATOR).map((message) => html`<p>${t(message, { ns: 'story' })}</p>`));
    }

    if (this.unlockFeatures) {
      result.push(
        ...this.unlockFeatures
          .split(KEYS_SEPARATOR)
          .map((feature) => html`<p>${t(`${feature}.unlockedMessage`, { ns: 'features' })}</p>`),
      );
    }

    return result;
  };
}
