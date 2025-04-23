import { html, nothing } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ATTRIBUTE_TEXTS } from '@texts/common';
import { Attribute } from '@shared/types';
import { subSectionTitleStyle } from '@shared/styles';
import { ATTRIBUTES } from '@shared/constants';
import { ClonesListItemAttributesController } from './controller';
import { cloneStatsBlockStyle } from '../../styles';

@localized()
@customElement('ca-clones-list-item-attributes')
export class ClonesListItemAttributes extends BaseComponent<ClonesListItemAttributesController> {
  static styles = [subSectionTitleStyle, cloneStatsBlockStyle];

  @property({
    attribute: 'clone-id',
    type: String,
  })
  public cloneId!: string;

  protected controller: ClonesListItemAttributesController;

  constructor() {
    super();

    this.controller = new ClonesListItemAttributesController(this);
  }

  render() {
    const clone = this.controller.getCloneById(this.cloneId);

    if (!clone) {
      return nothing;
    }

    return html`
      <h5 class="title">${msg('Attributes')}</h5>

      <div class="table">
        ${ATTRIBUTES.map((attribute) => this.renderAttribute(attribute, clone.getTotalAttributeValue(attribute)))}
      </div>
    `;
  }

  private renderAttribute = (attribute: Attribute, value: number) => {
    const formattedValue = this.controller.formatter.formatNumberDecimal(value);

    return html`
      <div>${ATTRIBUTE_TEXTS[attribute]()}</div>
      <div>${formattedValue}</div>
    `;
  };
}
