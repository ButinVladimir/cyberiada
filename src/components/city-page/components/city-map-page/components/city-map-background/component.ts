import { css, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { localized } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { DistrictUnlockState } from '@state/city-state/types';
import { CityMapBackgroundController } from './controller';

@localized()
@customElement('ca-city-map-background')
export class CityMapBackground extends BaseComponent {
  private static DX: number[] = [1, 0, 1];
  private static DY: number[] = [0, 1, 1];

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

  private _controller: CityMapBackgroundController;

  private _canvasRef = createRef<HTMLCanvasElement>();

  private _offscreenCanvasContext: OffscreenCanvasRenderingContext2D | null = null;

  constructor() {
    super();

    this._controller = new CityMapBackgroundController(this);
  }

  private get _fullWidth() {
    return this._controller.mapWidth * (this.size + 1) + 1;
  }

  private get _fullHeight() {
    return this._controller.mapHeight * (this.size + 1) + 1;
  }

  render() {
    return html` <canvas ${ref(this._canvasRef)} width=${this._fullWidth} height=${this._fullHeight}></canvas> `;
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

    const offscreenCanvas = new OffscreenCanvas(this._fullWidth, this._fullHeight);

    this._offscreenCanvasContext = offscreenCanvas.getContext('2d');
    if (!this._offscreenCanvasContext) {
      throw new Error('Canvas context is not supported');
    }

    this.renderCells();
    this.renderOuterBorders();
    this.renderInnerVerticalBorders();
    this.renderInnerHorizontalBorders();
    this.renderInnerDots();

    context.drawImage(offscreenCanvas, 0, 0);
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
        districtState = this._controller.getDistrict(districtNum).state;

        context.fillStyle = styles.stateStyles[districtState].backgroundColor;
        context.fillRect(1 + x * (this.size + 1), 1 + y * (this.size + 1), this.size, this.size);
      }
    }
  }

  private renderOuterBorders() {
    if (!this._offscreenCanvasContext) {
      return;
    }

    const context = this._offscreenCanvasContext;

    const styles = this._controller.getStyles();

    context.lineWidth = 2;
    context.strokeStyle = styles.borderColor;

    const rightMostX = 1 + this._controller.mapWidth * (this.size + 1);
    const bottomMostY = 1 + this._controller.mapHeight * (this.size + 1);

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(rightMostX, 0);
    context.lineTo(rightMostX, bottomMostY);
    context.lineTo(0, bottomMostY);
    context.closePath();
    context.stroke();
  }

  private renderInnerVerticalBorders() {
    if (!this._offscreenCanvasContext) {
      return;
    }

    const context = this._offscreenCanvasContext;

    const styles = this._controller.getStyles();

    context.lineWidth = 2;

    let districtState: DistrictUnlockState;
    let lineX: number;
    let lineY: number;

    for (let x = 0; x < this._controller.mapWidth - 1; x++) {
      for (let y = 0; y < this._controller.mapHeight; y++) {
        if (this._controller.layout[x][y] !== this._controller.layout[x + 1][y]) {
          context.strokeStyle = styles.borderColor;
        } else {
          districtState = this._controller.getDistrict(this._controller.layout[x][y]).state;
          context.strokeStyle = styles.stateStyles[districtState].backgroundColor;
        }

        lineX = 1 + (x + 1) * (this.size + 1);
        lineY = 1 + y * (this.size + 1);

        context.beginPath();
        context.moveTo(lineX, lineY);
        context.lineTo(lineX, lineY + this.size);
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

    context.lineWidth = 2;

    let districtState: DistrictUnlockState;
    let lineX: number;
    let lineY: number;

    for (let x = 0; x < this._controller.mapWidth; x++) {
      for (let y = 0; y < this._controller.mapHeight - 1; y++) {
        if (this._controller.layout[x][y] !== this._controller.layout[x][y + 1]) {
          context.strokeStyle = styles.borderColor;
        } else {
          districtState = this._controller.getDistrict(this._controller.layout[x][y]).state;
          context.strokeStyle = styles.stateStyles[districtState].backgroundColor;
        }

        lineX = 1 + x * (this.size + 1);
        lineY = 1 + (y + 1) * (this.size + 1);

        context.beginPath();
        context.moveTo(lineX, lineY);
        context.lineTo(lineX + this.size, lineY);
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

    let districtState: DistrictUnlockState;
    let dotX: number;
    let dotY: number;

    const Pi2 = 2 * Math.PI;

    for (let x = 0; x < this._controller.mapWidth - 1; x++) {
      for (let y = 0; y < this._controller.mapHeight - 1; y++) {
        if (this.checkDotInSameDistrict(x, y)) {
          districtState = this._controller.getDistrict(this._controller.layout[x][y]).state;
          context.fillStyle = styles.stateStyles[districtState].backgroundColor;
        } else {
          context.fillStyle = styles.borderColor;
        }

        dotX = 1 + (x + 1) * (this.size + 1);
        dotY = 1 + (y + 1) * (this.size + 1);

        context.beginPath();
        context.ellipse(dotX, dotY, 1, 1, 0, 0, Pi2);
        context.fill();
      }
    }
  }

  private checkDotInSameDistrict(x: number, y: number): boolean {
    let nx: number;
    let ny: number;

    for (let i = 0; i < CityMapBackground.DX.length; i++) {
      nx = x + CityMapBackground.DX[i];
      ny = y + CityMapBackground.DY[i];

      if (this._controller.layout[x][y] !== this._controller.layout[nx][ny]) {
        return false;
      }
    }

    return true;
  }
}
