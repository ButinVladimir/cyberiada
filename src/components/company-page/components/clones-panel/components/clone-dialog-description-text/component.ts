import { css, html } from 'lit';
import { msg, localized, str } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { CloneTemplateName } from '@state/company-state/states/clone-factory/types';
import { IClone } from '@state/company-state/states/clone-factory/interfaces/clone';
import { ATTRIBUTE_TEXTS, CLONE_TEMPLATE_TEXTS, SKILL_TEXTS } from '@texts/index';
import { ATTRIBUTES, SKILLS } from '@shared/constants';
import { Attribute, Skill } from '@shared/types';
import { SCREEN_WIDTH_POINTS, subSectionTitleStyle } from '@shared/styles';
import { CloneDialogDescriptionTextController } from './controller';

@localized()
@customElement('ca-clone-dialog-description-text')
export class CloneDescriptionText extends BaseComponent<CloneDialogDescriptionTextController> {
  static styles = [
    subSectionTitleStyle,
    css`
      :host {
        display: grid;
        grid-template-areas:
          'description'
          'synchronization'
          'attributes'
          'skills';
        grid-template-columns: auto;
        grid-template-rows: auto;
        grid-row-gap: var(--sl-spacing-medium);
        grid-column-gap: var(--sl-spacing-medium);
      }

      p.description {
        grid-area: description;
        margin: 0;
      }

      p.synchronization {
        grid-area: synchronization;
        margin: 0;
      }

      h5.title {
        margin-bottom: var(--sl-spacing-2x-small);
      }

      div.table {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto;
        grid-column-gap: var(--sl-spacing-medium);
      }

      div.attributes {
        grid-area: attributes;
      }

      div.skills {
        grid-area: skills;
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        :host {
          grid-template-areas:
            'description description'
            'synchronization synchronization'
            'attributes skills';
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto;
        }
      }
    `,
  ];

  @property({
    attribute: 'clone-template-name',
    type: String,
  })
  cloneTemplateName!: CloneTemplateName;

  @property({
    attribute: 'quality',
    type: Number,
  })
  quality!: number;

  @property({
    attribute: 'level',
    type: Number,
  })
  level!: number;

  protected controller: CloneDialogDescriptionTextController;

  constructor() {
    super();

    this.controller = new CloneDialogDescriptionTextController(this);
  }

  render() {
    const clone = this.controller.getClone(this.cloneTemplateName, this.quality, this.level);

    return html`
      <p class="description">${CLONE_TEMPLATE_TEXTS[this.cloneTemplateName].overview()}</p>

      ${this.renderSynchronization()} ${this.renderAttributes(clone)} ${this.renderSkills(clone)}
    `;
  }

  private renderSynchronization = () => {
    const formatter = this.controller.formatter;

    const formattedCloneSynchronization = formatter.formatNumberDecimal(
      this.controller.getCloneSynchronization(this.cloneTemplateName, this.quality),
    );
    const formattedAvailableSynchronization = formatter.formatNumberDecimal(this.controller.availableSynchronization);

    return html`<p class="synchronization">
      ${msg(str`Synchronization: ${formattedCloneSynchronization} / ${formattedAvailableSynchronization}`)}
    </p>`;
  };

  private renderAttributes = (clone: IClone) => {
    return html`
      <div class="attributes">
        <h5 class="title">${msg('Attributes')}</h5>
        <div class="table">
          ${ATTRIBUTES.map((attribute) => this.renderAttribute(attribute, clone.getTotalAttributeValue(attribute)))}
        </div>
      </div>
    `;
  };

  private renderAttribute = (attribute: Attribute, value: number) => {
    const formattedValue = this.controller.formatter.formatNumberDecimal(value);

    return html`
      <div>${ATTRIBUTE_TEXTS[attribute]()}</div>
      <div>${formattedValue}</div>
    `;
  };

  private renderSkills = (clone: IClone) => {
    return html`
      <div class="skills">
        <h5 class="title">${msg('Skills')}</h5>
        <div class="table">${SKILLS.map((skill) => this.renderSkill(skill, clone.getTotalSkillValue(skill)))}</div>
      </div>
    `;
  };

  private renderSkill = (skill: Skill, value: number) => {
    const formattedValue = this.controller.formatter.formatNumberDecimal(value);

    return html`
      <div>${SKILL_TEXTS[skill]()}</div>
      <div>${formattedValue}</div>
    `;
  };
}
