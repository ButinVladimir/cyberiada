import { html, nothing } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { SKILL_TEXTS } from '@texts/common';
import { Skill } from '@shared/types';
import { subSectionTitleStyle } from '@shared/styles';
import { SKILLS } from '@shared/constants';
import { ClonesListItemSkillsController } from './controller';
import { cloneStatsBlockStyle } from '../../styles';

@localized()
@customElement('ca-clones-list-item-skills')
export class ClonesListItemSkills extends BaseComponent<ClonesListItemSkillsController> {
  static styles = [subSectionTitleStyle, cloneStatsBlockStyle];

  @property({
    attribute: 'clone-id',
    type: String,
  })
  public cloneId!: string;

  @property({
    attribute: 'details-visible',
    type: Boolean,
  })
  public detailsVisible = false;

  protected controller: ClonesListItemSkillsController;

  constructor() {
    super();

    this.controller = new ClonesListItemSkillsController(this);
  }

  render() {
    const clone = this.controller.getCloneById(this.cloneId);

    if (!clone) {
      return nothing;
    }

    return html`
      <h5 class="title">${msg('Skills')}</h5>

      <div class="table">${SKILLS.map((skill) => this.renderSkill(skill, clone.getTotalSkillValue(skill)))}</div>
    `;
  }

  private renderSkill = (skill: Skill, value: number) => {
    const formattedValue = this.controller.formatter.formatNumberDecimal(value);

    return html`
      <div>${SKILL_TEXTS[skill]()}</div>
      <div>${formattedValue}</div>
    `;
  };
}
