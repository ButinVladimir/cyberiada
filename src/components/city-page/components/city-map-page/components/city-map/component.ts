import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { localized } from '@lit/localize';
import clamp from 'lodash/clamp';
import { range } from 'lit/directives/range.js';
import { map } from 'lit/directives/map.js';
import { classMap } from 'lit/directives/class-map.js';
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

  constructor() {
    super();

    this.controller = new CityMapController(this);
  }

  render() {
    return html`
      <sl-resize-observer @sl-resize=${this.handleResize}>
        <div class="content" @mousemove=${this.handleMouseMove} @mouseleave=${this.handleMouseLeave}>
          <ca-city-map-background size=${this._size}></ca-city-map-background>
          ${map(range(this.controller.districtsCount), this.renderDistrict)}
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
    const x = clamp(Math.floor((event.offsetX - 1) / (this._size + 1)), 0, this.controller.mapWidth - 1);

    const y = clamp(Math.floor((event.offsetY - 1) / (this._size + 1)), 0, this.controller.mapHeight - 1);

    this._selectedDistrict = this.controller.layout[x][y];
  };

  private handleMouseLeave = () => {
    this._selectedDistrict = undefined;
  };

  private handleResize = (event: { detail: { entries: ResizeObserverEntry[] } }) => {
    const maxHeight = window.innerHeight - TOP_BAR_HEIGHT - VERTICAL_PADDING - TEXT_HEIGHT;
    const maxWidth = event.detail.entries[0].contentRect.width;
    const maxSize = Math.min(maxWidth, maxHeight);

    this._size = Math.max(1, Math.floor(maxSize / this.controller.mapWidth) - 1);
  };
}
