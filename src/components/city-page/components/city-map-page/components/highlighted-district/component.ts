import { css, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { localized } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { DistrictUnlockState } from '@state/city-state/types';
import { CityMapHighlightedDistrictController } from './controller';
import { CELL_SIZE } from '../../constants';

@localized()
@customElement('ca-city-map-highlighted-district')
export class CityMapHighlightedDistrict extends BaseComponent {
  private static DX: number[] = [0, 1, 0, 1];
  private static DY: number[] = [0, 0, 1, 1];

  static styles = css`
    :host {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
  `;

  @property({
    attribute: 'size',
    type: Number,
  })
  public size = 1;

  @property({
    attribute: 'district',
    type: Number,
  })
  public district!: number;

  private _controller: CityMapHighlightedDistrictController;

  private _canvasRef = createRef<HTMLCanvasElement>();

  private _offscreenCanvasContext: OffscreenCanvasRenderingContext2D | null = null;

  constructor() {
    super();

    this._controller = new CityMapHighlightedDistrictController(this);
  }

  render() {
    return html` <canvas ${ref(this._canvasRef)} width=${this.size} height=${this.size}></canvas> `;
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    requestAnimationFrame(this.renderCanvas);
  }

  private renderCanvas = () => {
    if (!this._canvasRef.value) {
      return;
    }

    const context = this._canvasRef.value.getContext('2d');
    if (!context) {
      throw new Error('Canvas context is not supported');
    }

    const fullWidth = (CELL_SIZE + 1) * this._controller.mapWidth + 1;
    const fullHeight = (CELL_SIZE + 1) * this._controller.mapHeight + 1;
    const offscreenCanvas = new OffscreenCanvas(fullWidth, fullHeight);

    this._offscreenCanvasContext = offscreenCanvas.getContext('2d');
    if (!this._offscreenCanvasContext) {
      throw new Error('Canvas context is not supported');
    }

    this.renderCells();
    this.renderOuterBorders();
    this.renderInnerVerticalBorders();
    this.renderInnerHorizontalBorders();
    this.renderInnerDots();

    context.drawImage(offscreenCanvas, 0, 0, fullWidth, fullHeight, 0, 0, this.size, this.size);
  };

  private renderCells() {
    if (!this._offscreenCanvasContext) {
      return;
    }

    const context = this._offscreenCanvasContext;

    let districtNum: number;
    let districtState: DistrictUnlockState;

    const styles = this._controller.getStyles();

    for (let x = 0; x < this._controller.mapWidth; x++) {
      for (let y = 0; y < this._controller.mapHeight; y++) {
        districtNum = this._controller.layout[x][y];

        if (districtNum !== this.district) {
          continue;
        }

        districtState = this._controller.getDistrict(districtNum).state;

        context.fillStyle = styles.stateStyles[districtState].selectedColor;
        context.fillRect(1 + x * (CELL_SIZE + 1), 1 + y * (CELL_SIZE + 1), CELL_SIZE, CELL_SIZE);
      }
    }
  }

  private renderOuterBorders() {
    if (!this._offscreenCanvasContext) {
      return;
    }

    const context = this._offscreenCanvasContext;

    const styles = this._controller.getStyles();
    const districtState: DistrictUnlockState = this._controller.getDistrict(this.district).state;

    context.lineWidth = 2;
    context.strokeStyle = styles.stateStyles[districtState].selectedBorderColor;

    let lineX: number;
    let lineY: number;

    lineY = 0;

    for (let x = 0; x < this._controller.mapWidth; x++) {
      if (this._controller.layout[x][0] !== this.district) {
        continue;
      }

      lineX = 1 + x * (CELL_SIZE + 1) - 1;

      context.beginPath();
      context.moveTo(lineX, lineY);
      context.lineTo(lineX + 1 + CELL_SIZE + 1, lineY);
      context.stroke();
    }

    lineY = 1 + this._controller.mapHeight * (CELL_SIZE + 1);

    for (let x = 0; x < this._controller.mapWidth; x++) {
      if (this._controller.layout[x][this._controller.mapHeight - 1] !== this.district) {
        continue;
      }

      lineX = 1 + x * (CELL_SIZE + 1) - 1;

      context.beginPath();
      context.moveTo(lineX, lineY);
      context.lineTo(lineX + 1 + CELL_SIZE + 1, lineY);
      context.stroke();
    }

    lineX = 0;

    for (let y = 0; y < this._controller.mapHeight; y++) {
      if (this._controller.layout[0][y] !== this.district) {
        continue;
      }

      lineY = 1 + y * (CELL_SIZE + 1) - 1;

      context.beginPath();
      context.moveTo(lineX, lineY);
      context.lineTo(lineX, lineY + 1 + CELL_SIZE + 1);
      context.stroke();
    }

    lineX = 1 + this._controller.mapWidth * (CELL_SIZE + 1);

    for (let y = 0; y < this._controller.mapHeight; y++) {
      if (this._controller.layout[this._controller.mapWidth - 1][y] !== this.district) {
        continue;
      }

      lineY = 1 + y * (CELL_SIZE + 1) - 1;

      context.beginPath();
      context.moveTo(lineX, lineY);
      context.lineTo(lineX, lineY + 1 + CELL_SIZE + 1);
      context.stroke();
    }
  }

  private renderInnerVerticalBorders() {
    if (!this._offscreenCanvasContext) {
      return;
    }

    const context = this._offscreenCanvasContext;

    const styles = this._controller.getStyles();
    const districtState: DistrictUnlockState = this._controller.getDistrict(this.district).state;

    context.lineWidth = 2;

    let lineX: number;
    let lineY: number;
    let matchingDistricts: number;

    for (let x = 0; x < this._controller.mapWidth - 1; x++) {
      for (let y = 0; y < this._controller.mapHeight; y++) {
        matchingDistricts = 0;
        matchingDistricts += +(this._controller.layout[x][y] === this.district);
        matchingDistricts += +(this._controller.layout[x + 1][y] === this.district);

        if (matchingDistricts === 0) {
          continue;
        }

        if (matchingDistricts === 2) {
          context.strokeStyle = styles.stateStyles[districtState].selectedColor;
        } else {
          context.strokeStyle = styles.stateStyles[districtState].selectedBorderColor;
        }

        lineX = 1 + (x + 1) * (CELL_SIZE + 1);
        lineY = 1 + y * (CELL_SIZE + 1);

        context.beginPath();
        context.moveTo(lineX, lineY);
        context.lineTo(lineX, lineY + CELL_SIZE);
        context.stroke();
      }
    }
  }

  private renderInnerHorizontalBorders() {
    if (!this._offscreenCanvasContext) {
      return;
    }

    const context = this._offscreenCanvasContext;

    const styles = this._controller.getStyles();
    const districtState: DistrictUnlockState = this._controller.getDistrict(this.district).state;

    context.lineWidth = 2;

    let lineX: number;
    let lineY: number;
    let matchingDistricts: number;

    for (let x = 0; x < this._controller.mapWidth; x++) {
      for (let y = 0; y < this._controller.mapHeight - 1; y++) {
        matchingDistricts = 0;
        matchingDistricts += +(this._controller.layout[x][y] === this.district);
        matchingDistricts += +(this._controller.layout[x][y + 1] === this.district);

        if (matchingDistricts === 0) {
          continue;
        }

        if (matchingDistricts === 2) {
          context.strokeStyle = styles.stateStyles[districtState].selectedColor;
        } else {
          context.strokeStyle = styles.stateStyles[districtState].selectedBorderColor;
        }

        lineX = 1 + x * (CELL_SIZE + 1);
        lineY = 1 + (y + 1) * (CELL_SIZE + 1);

        context.beginPath();
        context.moveTo(lineX, lineY);
        context.lineTo(lineX + CELL_SIZE, lineY);
        context.stroke();
      }
    }
  }

  private renderInnerDots() {
    if (!this._offscreenCanvasContext) {
      return;
    }

    const context = this._offscreenCanvasContext;

    const styles = this._controller.getStyles();
    const districtState: DistrictUnlockState = this._controller.getDistrict(this.district).state;

    let dotX: number;
    let dotY: number;
    let districtsCount: number;

    const Pi2 = 2 * Math.PI;

    for (let x = 0; x < this._controller.mapWidth - 1; x++) {
      for (let y = 0; y < this._controller.mapHeight - 1; y++) {
        districtsCount = this.countDotDistricts(x, y);

        if (districtsCount === 0) {
          continue;
        }

        if (districtsCount === 4) {
          context.fillStyle = styles.stateStyles[districtState].selectedColor;
        } else {
          context.fillStyle = styles.stateStyles[districtState].selectedBorderColor;
        }

        dotX = 1 + (x + 1) * (CELL_SIZE + 1);
        dotY = 1 + (y + 1) * (CELL_SIZE + 1);

        context.beginPath();
        context.ellipse(dotX, dotY, 1, 1, 0, 0, Pi2);
        context.fill();
      }
    }
  }

  private countDotDistricts(x: number, y: number): number {
    let nx: number;
    let ny: number;
    let count = 0;

    for (let i = 0; i < CityMapHighlightedDistrict.DX.length; i++) {
      nx = x + CityMapHighlightedDistrict.DX[i];
      ny = y + CityMapHighlightedDistrict.DY[i];

      if (this._controller.layout[nx][ny] === this.district) {
        count++;
      }
    }

    return count;
  }
}
