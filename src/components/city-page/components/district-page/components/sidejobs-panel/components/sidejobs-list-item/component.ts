import { css, html } from 'lit';
import { localized, msg, str } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import {
  HINT_ICON,
  SCREEN_WIDTH_POINTS,
  dragIconStyle,
  hintIconStyle,
  hintStyle,
} from '@shared/styles';
import { SIDEJOB_TEXTS } from '@texts/index';
import { SidejobName } from '@state/company-state';
import { CityDistrictSidejobsListItemController } from './controller';

@localized()
@customElement('ca-city-district-sidejobs-list-item')
export class CityDistrictSidejobsListItem extends BaseComponent<CityDistrictSidejobsListItemController> {
  static styles = [
    hintIconStyle,
    dragIconStyle,
    hintStyle,
    css`
      :host {
        display: grid;
        grid-template-areas:
          'description'
          'progress-bar';
        grid-template-columns: auto;
        grid-template-rows: repeat(1fr);
        gap: var(--sl-spacing-small);
        padding: var(--sl-spacing-small);
        box-sizing: border-box;
      }

      div.description {
        grid-area: description;
      }

      p.title {
        margin: 0;
      }

      p.hint {
        margin: 0;
      }

      .progress-bar {
        grid-area: progress-bar;
      }

       @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        :host {
          grid-template-areas: 'title progress-bar';
          grid-template-columns: 1fr 2fr;
          grid-template-rows: auto;
          align-items: center;
        }
      }
    `,
  ];

  @property({
    attribute: 'district-index',
    type: Number,
  })
  districtIndex!: number;

  @property({
    attribute: 'sidejob-name',
    type: String,
  })
  sidejobName!: SidejobName;

  protected controller: CityDistrictSidejobsListItemController;

  constructor() {
    super();

    this.controller = new CityDistrictSidejobsListItemController(this);
  }

  render() {
    const sidejob = this.controller.getSidejob(this.sidejobName, this.districtIndex);

    let assignedSidejobHint: string;

    if (sidejob) {
      assignedSidejobHint = msg(str`Assigned to "${sidejob.assignedClone!.name}"`);
    } else {
      assignedSidejobHint = msg('Assigned to nobody');
    }

    return html`
      <div class="sidejob">
        <div class="description">
          <p class="title">
            ${SIDEJOB_TEXTS[this.sidejobName].title()}

            <sl-tooltip>
              <span slot="content">${SIDEJOB_TEXTS[this.sidejobName].overview()}</span>

              <sl-icon name=${HINT_ICON}></sl-icon>
            </sl-tooltip>
          </p>

          <p class="hint">
            ${assignedSidejobHint}
          </p>
        </div>
      </div>

      <div class="progress-bar">
        <ca-city-district-sidejobs-list-item-unlock-progress
          district-index=${this.districtIndex}
          sidejob-name=${this.sidejobName}
        >
        </ca-city-district-sidejobs-list-item-unlock-progress>
      </div>
    `;
  }
}
