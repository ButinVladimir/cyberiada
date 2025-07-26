import { html, nothing } from 'lit';
import { localized, msg, str } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent, capitalizeFirstLetter, Feature, BaseController } from '@shared/index';
import { StoryGoalState } from '@state/global-state';
import { UNLOCKED_FEATURE_TEXTS, STORY_MESSAGES } from '@texts/index';
import { KEYS_SEPARATOR } from '../../../../constants';
import styles from './styles';

@localized()
@customElement('ca-overview-story-goal')
export class OverviewStoryPanel extends BaseComponent {
  static styles = styles;

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

  private _controller: BaseController;

  constructor() {
    super();

    this._controller = new BaseController(this);
  }

  protected renderDesktop() {
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
      const formattedLevel = this._controller.formatter.formatLevel(this.level);

      requirements.push(msg(str`development level ${formattedLevel}`));
    }

    const result = capitalizeFirstLetter(requirements.join(', '));

    return result;
  };

  private renderDetails = () => {
    if (this.state !== StoryGoalState.passed) {
      return nothing;
    }

    const result = [];

    if (this.messages) {
      result.push(...this.messages.split(KEYS_SEPARATOR).map((message) => html`<p>${STORY_MESSAGES[message]()}</p>`));
    }

    if (this.unlockFeatures) {
      result.push(
        ...this.unlockFeatures
          .split(KEYS_SEPARATOR)
          .map((feature) => html`<p>${UNLOCKED_FEATURE_TEXTS[feature as Feature].message()}</p>`),
      );
    }

    return result;
  };
}
