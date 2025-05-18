import { css, html, nothing } from 'lit';
import { localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { BaseComponent } from '@shared/base-component';
import { ATTRIBUTE_TEXTS, COMMON_TEXTS, SKILL_TEXTS } from '@texts/common';
import { Attribute, Skill } from '@shared/types';
import { attributesSkillsTablesStyle, subSectionTitleStyle } from '@shared/styles';
import { ATTRIBUTES, SKILLS } from '@shared/constants';
import { type IClone } from '@state/company-state';
import { ClonesListItemDescriptionController } from './controller';
import { cloneContext } from '../item/contexts';

@localized()
@customElement('ca-clones-list-item-description')
export class ClonesListItemAttributes extends BaseComponent {
  static styles = [
    subSectionTitleStyle,
    attributesSkillsTablesStyle,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: var(--sl-spacing-small);
      }

      h5.title {
        margin: 0;
      }
    `,
  ];

  private _controller: ClonesListItemDescriptionController;

  @consume({ context: cloneContext, subscribe: true })
  private _clone?: IClone;

  constructor() {
    super();

    this._controller = new ClonesListItemDescriptionController(this);
  }

  render() {
    if (!this._clone) {
      return nothing;
    }

    const formatter = this._controller.formatter;

    const synchronization = this._controller.getCloneSynchronization(this._clone);
    const formattedSynchronization = formatter.formatNumberDecimal(synchronization);

    return html`
      <div>${COMMON_TEXTS.parameterValue(COMMON_TEXTS.synchronization(), formattedSynchronization)}</div>

      <div class="attributes-skills-tables">
        <div>
          <h5 class="title">${COMMON_TEXTS.attributes()}</h5>
          <div class="attributes-skills-table">${ATTRIBUTES.map(this.renderAttribute)}</div>
        </div>

        <div>
          <h5 class="title">${COMMON_TEXTS.skills()}</h5>
          <div class="attributes-skills-table">${SKILLS.map(this.renderSkill)}</div>
        </div>
      </div>
    `;
  }

  private renderAttribute = (attribute: Attribute) => {
    const value = this._clone!.getTotalAttributeValue(attribute);
    const formattedValue = this._controller.formatter.formatNumberDecimal(value);

    return html`
      <div>${ATTRIBUTE_TEXTS[attribute]()}</div>
      <div>${formattedValue}</div>
    `;
  };

  private renderSkill = (skill: Skill) => {
    const value = this._clone!.getTotalSkillValue(skill);
    const formattedValue = this._controller.formatter.formatNumberDecimal(value);

    return html`
      <div>${SKILL_TEXTS[skill]()}</div>
      <div>${formattedValue}</div>
    `;
  };
}
