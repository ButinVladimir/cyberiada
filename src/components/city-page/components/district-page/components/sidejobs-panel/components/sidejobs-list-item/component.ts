import { css, html, nothing } from 'lit';
import { localized } from '@lit/localize';
import { consume, provide } from '@lit/context';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { HINT_ICON, SCREEN_WIDTH_POINTS, dragIconStyle, hintIconStyle } from '@shared/styles';
import { SIDEJOB_TEXTS } from '@texts/index';
import { SidejobName } from '@state/company-state';
import { sidejobNameContext } from './contexts';
import { districtIndexContext } from '../../../../contexts';

@localized()
@customElement('ca-city-district-sidejobs-list-item')
export class CityDistrictSidejobsListItem extends BaseComponent {
  static styles = [
    hintIconStyle,
    dragIconStyle,
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

  @provide({ context: sidejobNameContext })
  @property({
    attribute: 'sidejob-name',
    type: String,
  })
  sidejobName!: SidejobName;

  @consume({ context: districtIndexContext, subscribe: true })
  private _districtIndex?: number;

  render() {
    if (this._districtIndex === undefined) {
      return nothing;
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
        </div>
      </div>

      <div class="progress-bar">
        <ca-city-district-sidejobs-list-item-unlock-progress> </ca-city-district-sidejobs-list-item-unlock-progress>
      </div>
    `;
  }
}
