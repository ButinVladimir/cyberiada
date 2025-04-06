import { css, html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { classMap } from 'lit/directives/class-map.js';
import SlRange from '@shoelace-style/shoelace/dist/components/range/range.component.js';
import { BaseComponent } from '@shared/base-component';
import { MapCellZoomPanelController } from './controller';
import { MapCellZoomChangeEvent } from './events';

@localized()
@customElement('ca-map-cell-zoom-panel')
export class MapCellZoomPanel extends BaseComponent<MapCellZoomPanelController> {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      background-color: var(--sl-panel-background-color);
      border: var(--ca-border);
      border-radius: var(--sl-border-radius-small);
    }

    sl-icon-button {
      font-size: var(--sl-font-size-large);
    }

    div.range-container {
      flex: 1 1 auto;
      width: 0;
      box-sizing: border-box;
      display: none;
    }

    div.range-container.show-range {
      width: 20em;
      display: block;
      padding: var(--sl-spacing-2x-small) var(--sl-spacing-medium);
    }

    div.zoom-button-container {
      flex: 0 0 auto;
      padding: var(--sl-spacing-3x-small);
      position: relative;
    }

    sl-range {
      width: 100%;
    }
  `;

  protected controller: MapCellZoomPanelController;

  @property({
    attribute: true,
    type: Number,
  })
  zoom!: number;

  @state()
  private _showRange = false;

  private _rangeElementRef = createRef<SlRange>();

  constructor() {
    super();

    this.controller = new MapCellZoomPanelController(this);
  }

  render() {
    const rangeContainerClasses = classMap({
      'range-container': true,
      'show-range': this._showRange,
    });

    return html`
      <div class=${rangeContainerClasses}>
        <sl-range
          ${ref(this._rangeElementRef)}
          min="1"
          max="5"
          step="1"
          tooltip="bottom"
          value=${this.zoom}
          @sl-change=${this.handleChangeZoom}
        >
        </sl-range>
      </div>

      <div class="zoom-button-container">
        <sl-tooltip placement="bottom">
          <span slot="content"> ${msg('Toggle zoom panel')} </span>

          <sl-icon-button
            name="zoom-in"
            label=${msg('Toggle zoom panel')}
            @click=${this.handleToggleZoomPanel}
          >
          </sl-icon-button>
        </sl-tooltip>
      </div>
    `;
  }

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    if (this._rangeElementRef.value) {
      this._rangeElementRef.value.tooltipFormatter = this.decimalNumberFormatter;
    }
  }

  private handleToggleZoomPanel = (event: Event) => {
    event.stopPropagation();

    this._showRange = !this._showRange;
  };

  private handleChangeZoom = (event: Event) => {
    event.stopPropagation();

    if (this._rangeElementRef.value) {
      this.dispatchEvent(new MapCellZoomChangeEvent(this._rangeElementRef.value.value));
    }
  };

  private decimalNumberFormatter = (value: number): string => {
    return this.controller.formatter.formatNumberDecimal(value);
  };
}
