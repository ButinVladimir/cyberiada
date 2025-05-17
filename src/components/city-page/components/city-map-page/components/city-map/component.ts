import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { localized } from '@lit/localize';
import { range } from 'lit/directives/range.js';
import { map } from 'lit/directives/map.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseComponent, SCREEN_WIDTH_POINTS } from '@shared/index';
import { DistrictUnlockState } from '@state/city-state';
import { CityMapController } from './controller';
import { BOTTOM_GAP } from './constants';
import { CityMapClickEvent } from './events';

@localized()
@customElement('ca-city-map')
export class CityMap extends BaseComponent {
  static styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      flex-direction: column;
      gap: var(--sl-spacing-medium);
      width: 100%;
    }

    div.content {
      position: relative;
      cursor: not-allowed;
    }

    div.content.unlocked {
      cursor: pointer;
    }

    ca-city-map-highlighted-district {
      opacity: 0;
    }

    ca-city-map-highlighted-district.visible {
      opacity: 1;
    }

    @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
      :host {
        flex-direction: row;
        flex-wrap: wrap;
      }

      div.content {
        flex: 1.5;
      }

      ca-city-map-district-description {
        flex: 1;
      }
    }
  `;

  private _controller: CityMapController;

  @state()
  private _size = 0;

  @state()
  private _selectedDistrictIndex?: number;

  private _contentRef = createRef<HTMLDivElement>();

  constructor() {
    super();

    this._controller = new CityMapController(this);
  }

  render() {
    let unlocked = false;

    if (this._selectedDistrictIndex !== undefined) {
      const district = this._controller.getDistrict(this._selectedDistrictIndex);

      unlocked = district.state !== DistrictUnlockState.locked;
    }

    const contentClasses = classMap({
      content: true,
      unlocked,
    });

    return html`
      <sl-resize-observer @sl-resize=${this.handleResize}>
        <div
          ${ref(this._contentRef)}
          class=${contentClasses}
          @mousemove=${this.handleMouseMove}
          @mouseleave=${this.handleMouseLeave}
          @click=${this.handleMapClick}
        >
          <ca-city-map-background size=${this._size}></ca-city-map-background>

          ${map(range(this._controller.districtsCount), this.renderDistrict)}
        </div>
      </sl-resize-observer>
      <ca-city-map-district-description district=${ifDefined(this._selectedDistrictIndex)}>
      </ca-city-map-district-description>
    `;
  }

  private renderDistrict = (districtNum: number) => {
    const classes = classMap({
      visible: this._selectedDistrictIndex === districtNum,
    });

    return html`<ca-city-map-highlighted-district
      class=${classes}
      district=${districtNum}
      size=${this._size}
    ></ca-city-map-highlighted-district>`;
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (this._contentRef.value) {
      const contentBoundingRect = this._contentRef.value.getBoundingClientRect();

      const offsetX = event.clientX - contentBoundingRect.x;
      const x = Math.round((offsetX / this._size) * (this._controller.mapWidth - 1));

      const offsetY = event.clientY - contentBoundingRect.y;
      const y = Math.round((offsetY / this._size) * (this._controller.mapHeight - 1));

      this._selectedDistrictIndex = this._controller.layout[x][y];
    }
  };

  private handleMouseLeave = () => {
    this._selectedDistrictIndex = undefined;
  };

  private handleResize = (event: { detail: { entries: ResizeObserverEntry[] } }) => {
    const containerBoundingClientRect = this.getBoundingClientRect();
    const width = event.detail.entries[0].contentRect.width;
    const height = window.innerHeight - containerBoundingClientRect.y - BOTTOM_GAP;
    this._size = Math.min(width, height);

    if (this._contentRef.value) {
      this._contentRef.value.style.width = `${this._size}px`;
      this._contentRef.value.style.height = `${this._size}px`;
    }
  };

  private handleMapClick = () => {
    if (this._selectedDistrictIndex !== undefined) {
      const district = this._controller.getDistrict(this._selectedDistrictIndex);

      if (district.state !== DistrictUnlockState.locked) {
        this.dispatchEvent(new CityMapClickEvent(this._selectedDistrictIndex));
      }
    }
  };
}
