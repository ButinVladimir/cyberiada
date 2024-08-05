import { t } from 'i18next';
import { LitElement, css, html } from 'lit';
import { customElement, query, property, state } from 'lit/decorators.js';
import SlRange from '@shoelace-style/shoelace/dist/components/range/range.component.js';
import { MapCellZoomChangeEvent } from './events';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-map-cell-zoom-panel')
export class MapCellZoomPanel extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      background-color: var(--sl-panel-background-color);
      border: var(--sl-panel-border-width) solid var(--sl-panel-border-color);
      border-radius: var(--sl-border-radius-small);
    }

    sl-icon-button {
      font-size: var(--sl-font-size-large);
    }

    div.range-container {
      flex: 1 1 auto;
      width: 0;
      box-sizing: border-box;
      visibility: hidden;
      transition:
        visibility var(--sl-transition-x-fast) ease,
        width var(--sl-transition-x-fast) ease,
        padding-right var(--sl-transition-x-fast) ease;
    }

    div.range-container.show-range {
      width: 20em;
      visibility: visible;
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

  @property({
    attribute: true,
    type: Number,
  })
  zoom!: number;

  @state()
  private _showRange = false;

  @query('sl-range')
  private _rangeElement!: SlRange;

  render() {
    const rangeContainerClasses = classMap({
      'range-container': true,
      'show-range': this._showRange,
    });

    return html`
      <div class=${rangeContainerClasses}>
        <sl-range min="1" max="5" step="1" tooltip="bottom" value=${this.zoom} @sl-change=${this.handleChangeZoom}>
        </sl-range>
      </div>

      <div class="zoom-button-container">
        <sl-tooltip>
          <intl-message slot="content" label="ui:city:cityOverview:toggleZoomPanel">Toggle zoom panel</intl-message>
          <sl-icon-button
            name="zoom-in"
            label=${t('city.cityOverview.toggleZoomPanel', { ns: 'ui' })}
            @click=${this.handleToggleZoomPanel}
          >
          </sl-icon-button>
        </sl-tooltip>
      </div>
    `;
  }

  private handleToggleZoomPanel = (event: Event) => {
    event.stopPropagation();

    this._showRange = !this._showRange;
  };

  private handleChangeZoom = (event: Event) => {
    event.stopPropagation();

    this.dispatchEvent(new MapCellZoomChangeEvent(this._rangeElement.value));
  };
}
