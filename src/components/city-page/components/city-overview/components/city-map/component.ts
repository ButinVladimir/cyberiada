import { LitElement, css, html } from 'lit';
import { customElement, query, property } from 'lit/decorators.js';
import { MAP_WIDTH, MAP_HEIGHT } from '@shared/constants';
import { CityMapDistrictSelectedEvent } from './events/city-map-district-selected-event';

@customElement('ca-city-map')
export class CityMap extends LitElement {
  static styles = css`
    canvas {
      cursor: pointer;
    }
  `;

  @query('canvas', true)
  private _canvas!: HTMLCanvasElement;

  @property({
    attribute: 'map-cell-size',
    type: Number,
  })
  mapCellSize = 5;

  @property({
    attribute: false,
  })
  map!: number[][];

  @property({
    attribute: 'selected-district',
    type: Number,
  })
  selectedDistrict?: number;

  render() {
    const cellSizeWithBorder = this.cellSizeWithBorder;
    const width = MAP_WIDTH * cellSizeWithBorder;
    const height = MAP_HEIGHT * cellSizeWithBorder;

    return html`
      <canvas width=${width} height=${height} @mouseleave=${this.handleMouseLeave} @mousemove=${this.handleMouseMove}>
        Canvas is not supported
      </canvas>
    `;
  }

  get cellSizeWithBorder() {
    return this.mapCellSize + 1;
  }

  protected updated(): void {
    console.log('Updated');
    this.renderCanvas();
  }

  private renderCanvas() {
    const context = this._canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas context is not supported');
    }

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = this._canvas.width;
    offscreenCanvas.height = this._canvas.height;
    const offscreenCanvasContext = offscreenCanvas.getContext('2d');
    if (!offscreenCanvasContext) {
      throw new Error('Canvas context is not supported');
    }

    this.renderCells(offscreenCanvasContext);
    this.renderBorders(offscreenCanvasContext);

    context.drawImage(offscreenCanvas, 0, 0);
  }

  private renderCells(context: CanvasRenderingContext2D) {
    const cellSizeWithBorder = this.cellSizeWithBorder;

    for (let x = 0; x < MAP_WIDTH; x++) {
      for (let y = 0; y < MAP_HEIGHT; y++) {
        context.fillStyle = this.selectedDistrict === this.map[x][y] ? '#050' : '#010';
        context.fillRect(
          x * cellSizeWithBorder,
          y * cellSizeWithBorder,
          (x + 1) * cellSizeWithBorder,
          (y + 1) * cellSizeWithBorder,
        );
      }
    }
  }

  private renderBorders(context: CanvasRenderingContext2D) {
    const cellSizeWithBorder = this.cellSizeWithBorder;

    context.lineWidth = 1;
    context.strokeStyle = '#EEEEEE';

    for (let x = 0; x < MAP_WIDTH; x++) {
      for (let y = 0; y < MAP_HEIGHT; y++) {
        if (x < MAP_WIDTH - 1 && this.map[x][y] !== this.map[x + 1][y]) {
          this.updateContextBorderStyle(
            context,
            this.map[x][y] === this.selectedDistrict || this.map[x + 1][y] === this.selectedDistrict,
          );

          context.beginPath();
          context.moveTo((x + 1) * cellSizeWithBorder, y * cellSizeWithBorder);
          context.lineTo((x + 1) * cellSizeWithBorder, (y + 1) * cellSizeWithBorder);
          context.stroke();
        }

        if (y < MAP_HEIGHT - 1 && this.map[x][y] !== this.map[x][y + 1]) {
          this.updateContextBorderStyle(
            context,
            this.map[x][y] === this.selectedDistrict || this.map[x][y + 1] === this.selectedDistrict,
          );

          context.beginPath();
          context.moveTo(x * cellSizeWithBorder, (y + 1) * cellSizeWithBorder);
          context.lineTo((x + 1) * cellSizeWithBorder, (y + 1) * cellSizeWithBorder);
          context.stroke();
        }
      }
    }

    for (let x = 0; x < MAP_WIDTH; x++) {
      this.updateContextBorderStyle(context, this.map[x][0] === this.selectedDistrict);

      context.beginPath();
      context.moveTo(x * cellSizeWithBorder, 0);
      context.lineTo((x + 1) * cellSizeWithBorder, 0);
      context.stroke();
    }

    for (let y = 0; y < MAP_HEIGHT; y++) {
      this.updateContextBorderStyle(context, this.map[0][y] === this.selectedDistrict);

      context.beginPath();
      context.moveTo(0, y * cellSizeWithBorder);
      context.lineTo(0, (y + 1) * cellSizeWithBorder);
      context.stroke();
    }

    for (let x = 0; x < MAP_WIDTH; x++) {
      this.updateContextBorderStyle(context, this.map[x][MAP_HEIGHT - 1] === this.selectedDistrict);

      context.beginPath();
      context.moveTo(x * cellSizeWithBorder, MAP_HEIGHT * cellSizeWithBorder);
      context.lineTo((x + 1) * cellSizeWithBorder, MAP_HEIGHT * cellSizeWithBorder);
      context.stroke();
    }

    for (let y = 0; y < MAP_HEIGHT; y++) {
      this.updateContextBorderStyle(context, this.map[MAP_WIDTH - 1][y] === this.selectedDistrict);

      context.beginPath();
      context.moveTo(MAP_WIDTH * cellSizeWithBorder, y * cellSizeWithBorder);
      context.lineTo(MAP_WIDTH * cellSizeWithBorder, (y + 1) * cellSizeWithBorder);
      context.stroke();
    }
  }

  private updateContextBorderStyle(context: CanvasRenderingContext2D, isSelected: boolean) {
    if (isSelected) {
      context.lineWidth = 2;
    } else {
      context.lineWidth = 1;
    }
  }

  private handleMouseLeave = () => {
    this.dispatchEvent(new CityMapDistrictSelectedEvent(undefined));
  };

  private handleMouseMove = (event: MouseEvent) => {
    const cellSizeWithBorder = this.cellSizeWithBorder;
    const x = Math.min(Math.floor(event.offsetX / cellSizeWithBorder), MAP_WIDTH - 1);
    const y = Math.min(Math.floor(event.offsetY / cellSizeWithBorder), MAP_HEIGHT - 1);

    this.dispatchEvent(new CityMapDistrictSelectedEvent(this.map[x][y]));
  };
}
