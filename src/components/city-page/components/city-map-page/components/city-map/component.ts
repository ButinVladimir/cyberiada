import { css, html, PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { localized } from '@lit/localize';
import clamp from 'lodash/clamp';
import { range } from 'lit/directives/range.js';
import { map } from 'lit/directives/map.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import SlPopup from '@shoelace-style/shoelace/dist/components/popup/popup.js';
import { BaseComponent } from '@shared/base-component';
import { CityMapController } from './controller';
import { TEXT_HEIGHT, TOP_BAR_HEIGHT, VERTICAL_PADDING } from './constants';

@localized()
@customElement('ca-city-map')
export class CityMap extends BaseComponent<CityMapController> {
  static styles = css`
    :host {
      display: block;
    }

    div.content {
      width: 100%;
      position: relative;
    }

    div.tooltip-anchor {
      position: absolute;
    }

    sl-popup {
      --arrow-size: var(--sl-tooltip-arrow-size);
      --arrow-color: var(--sl-tooltip-background-color);
    }

    ca-city-map-district {
      opacity: 0;
    }

    ca-city-map-district.visible {
      opacity: 1;
    }
  `;

  protected controller: CityMapController;

  @state()
  private _size = 5;

  @state()
  private _selectedDistrict?: number;

  private _contentAnchorRef = createRef<HTMLDivElement>();

  private _popupRef = createRef<SlPopup>();

  private _positionX = 0;
  private _positionY = 0;

  constructor() {
    super();

    this.controller = new CityMapController(this);
  }

  firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    if (this._popupRef.value) {
      this._popupRef.value.anchor = {
        getBoundingClientRect: () => {
          return {
            width: 0,
            height: 0,
            x: this._positionX,
            y: this._positionY,
            top: this._positionY,
            left: this._positionX,
            right: this._positionX,
            bottom: this._positionY,
            toJSON() {},
          };
        },
      };
    }
  }

  render() {
    return html`
      <sl-resize-observer @sl-resize=${this.handleResize}>
        <div
          ${ref(this._contentAnchorRef)}
          class="content"
          @mousemove=${this.handleMouseMove}
          @mouseleave=${this.handleMouseLeave}
        >
          <ca-city-map-background size=${this._size}></ca-city-map-background>

          ${map(range(this.controller.districtsCount), this.renderDistrict)}

          <sl-popup
            ${ref(this._popupRef)}
            ?active=${this._selectedDistrict !== undefined}
            distance=${8}
            skidding=${8}
            placement="top-start"
          >
            <ca-city-map-tooltip-content district=${ifDefined(this._selectedDistrict)}> </ca-city-map-tooltip-content>
          </sl-popup>
        </div>
      </sl-resize-observer>
    `;
  }

  private renderDistrict = (districtNum: number) => {
    const classes = classMap({
      visible: this._selectedDistrict === districtNum,
    });

    return html`<ca-city-map-district
      class=${classes}
      district=${districtNum}
      size=${this._size}
    ></ca-city-map-district>`;
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (this._contentAnchorRef.value) {
      const contentBoundingRect = this._contentAnchorRef.value.getBoundingClientRect();

      this._positionX = event.clientX;
      this._positionY = event.clientY;

      const offsetX = event.clientX - contentBoundingRect.x - 1;
      const x = clamp(Math.floor(offsetX / (this._size + 1)), 0, this.controller.mapWidth - 1);

      const offsetY = event.clientY - contentBoundingRect.y - 1;
      const y = clamp(Math.floor(offsetY / (this._size + 1)), 0, this.controller.mapHeight - 1);

      this._selectedDistrict = this.controller.layout[x][y];
    }

    if (this._popupRef.value) {
      this._popupRef.value.reposition();
    }
  };

  private handleMouseLeave = () => {
    this._selectedDistrict = undefined;
  };

  private handleResize = (event: { detail: { entries: ResizeObserverEntry[] } }) => {
    const maxWidth = event.detail.entries[0].contentRect.width;
    const maxHeight = window.innerHeight - TOP_BAR_HEIGHT - VERTICAL_PADDING - TEXT_HEIGHT;

    const widthSize = maxWidth / this.controller.mapWidth;
    const heightSize = maxHeight / this.controller.mapHeight;
    const minSize = Math.min(heightSize, widthSize);

    this._size = Math.max(1, Math.floor(minSize) - 1);
  };
}
