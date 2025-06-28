import { DistrictUnlockState } from '@state/city-state/types';
import { Theme } from '@shared/types';
import { IDistrictRenderer, IDistrictRendererArgs, IDistrictRendererResult, IDistrictStyles } from './interfaces';
import { CELL_SIZE, MAP_STYLES } from './constants';

export class DistrictRenderer implements IDistrictRenderer {
  private static DX: number[] = [0, 1, 0, 1];
  private static DY: number[] = [0, 0, 1, 1];

  private _mapWidth: number;
  private _mapHeight: number;
  private _layout: number[][];
  private _districtNum: number;
  private _districtUnlockState: DistrictUnlockState;
  private _selected: boolean;
  private _theme: Theme;

  private _offscreenCanvas: OffscreenCanvas;
  private _offscreenCanvasContext: OffscreenCanvasRenderingContext2D | null = null;

  constructor(args: IDistrictRendererArgs) {
    this._mapWidth = args.mapWidth;
    this._mapHeight = args.mapHeight;
    this._layout = args.layout;
    this._districtNum = args.districtNum;
    this._districtUnlockState = args.districtUnlockState;
    this._selected = args.selected;
    this._theme = args.theme;

    this._offscreenCanvas = args.canvas;
    this._offscreenCanvasContext = this._offscreenCanvas.getContext('2d');

    if (!this._offscreenCanvasContext) {
      throw new Error('Canvas context is not supported');
    }
  }

  async renderDistrict(): Promise<IDistrictRendererResult> {
    this.renderCells();
    this.renderOuterBorders();
    this.renderInnerVerticalBorders();
    this.renderInnerHorizontalBorders();
    this.renderInnerDots();

    const blob = await this._offscreenCanvas.convertToBlob();

    return {
      districtNum: this._districtNum,
      selected: this._selected,
      blob,
    };
  }

  private renderCells() {
    if (!this._offscreenCanvasContext) {
      return;
    }

    const context = this._offscreenCanvasContext;

    let districtNum: number;

    const styles = this.getStyles();

    for (let x = 0; x < this._mapWidth; x++) {
      for (let y = 0; y < this._mapHeight; y++) {
        districtNum = this._layout[x][y];

        if (districtNum !== this._districtNum) {
          continue;
        }

        context.fillStyle = styles.color;
        context.fillRect(1 + x * (CELL_SIZE + 1), 1 + y * (CELL_SIZE + 1), CELL_SIZE, CELL_SIZE);
      }
    }
  }

  private renderOuterBorders() {
    if (!this._offscreenCanvasContext) {
      return;
    }

    const context = this._offscreenCanvasContext;

    const styles = this.getStyles();

    context.lineWidth = 2;
    context.strokeStyle = styles.borderColor;

    let lineX: number;
    let lineY: number;

    lineY = 0;

    for (let x = 0; x < this._mapWidth; x++) {
      if (this._layout[x][0] !== this._districtNum) {
        continue;
      }

      lineX = 1 + x * (CELL_SIZE + 1) - 1;

      context.beginPath();
      context.moveTo(lineX, lineY);
      context.lineTo(lineX + 1 + CELL_SIZE + 1, lineY);
      context.stroke();
    }

    lineY = 1 + this._mapHeight * (CELL_SIZE + 1);

    for (let x = 0; x < this._mapWidth; x++) {
      if (this._layout[x][this._mapHeight - 1] !== this._districtNum) {
        continue;
      }

      lineX = 1 + x * (CELL_SIZE + 1) - 1;

      context.beginPath();
      context.moveTo(lineX, lineY);
      context.lineTo(lineX + 1 + CELL_SIZE + 1, lineY);
      context.stroke();
    }

    lineX = 0;

    for (let y = 0; y < this._mapHeight; y++) {
      if (this._layout[0][y] !== this._districtNum) {
        continue;
      }

      lineY = 1 + y * (CELL_SIZE + 1) - 1;

      context.beginPath();
      context.moveTo(lineX, lineY);
      context.lineTo(lineX, lineY + 1 + CELL_SIZE + 1);
      context.stroke();
    }

    lineX = 1 + this._mapWidth * (CELL_SIZE + 1);

    for (let y = 0; y < this._mapHeight; y++) {
      if (this._layout[this._mapWidth - 1][y] !== this._districtNum) {
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

    const styles = this.getStyles();

    context.lineWidth = 2;

    let lineX: number;
    let lineY: number;
    let matchingDistricts: number;

    for (let x = 0; x < this._mapWidth - 1; x++) {
      for (let y = 0; y < this._mapHeight; y++) {
        matchingDistricts = 0;
        matchingDistricts += +(this._layout[x][y] === this._districtNum);
        matchingDistricts += +(this._layout[x + 1][y] === this._districtNum);

        if (matchingDistricts === 0) {
          continue;
        }

        if (matchingDistricts === 2) {
          context.strokeStyle = styles.color;
        } else {
          context.strokeStyle = styles.borderColor;
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

    const styles = this.getStyles();

    context.lineWidth = 2;

    let lineX: number;
    let lineY: number;
    let matchingDistricts: number;

    for (let x = 0; x < this._mapWidth; x++) {
      for (let y = 0; y < this._mapHeight - 1; y++) {
        matchingDistricts = 0;
        matchingDistricts += +(this._layout[x][y] === this._districtNum);
        matchingDistricts += +(this._layout[x][y + 1] === this._districtNum);

        if (matchingDistricts === 0) {
          continue;
        }

        if (matchingDistricts === 2) {
          context.strokeStyle = styles.color;
        } else {
          context.strokeStyle = styles.borderColor;
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

    const styles = this.getStyles();

    let dotX: number;
    let dotY: number;
    let districtsCount: number;

    const Pi2 = 2 * Math.PI;

    for (let x = 0; x < this._mapWidth - 1; x++) {
      for (let y = 0; y < this._mapHeight - 1; y++) {
        districtsCount = this.countDotDistricts(x, y);

        if (districtsCount === 0) {
          continue;
        }

        if (districtsCount === 4) {
          context.fillStyle = styles.color;
        } else {
          context.fillStyle = styles.borderColor;
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

    for (let i = 0; i < DistrictRenderer.DX.length; i++) {
      nx = x + DistrictRenderer.DX[i];
      ny = y + DistrictRenderer.DY[i];

      if (this._layout[nx][ny] === this._districtNum) {
        count++;
      }
    }

    return count;
  }

  private getStyles(): IDistrictStyles {
    const styles = MAP_STYLES[this._theme][this._districtUnlockState];

    return this._selected ? styles.selectedStyles : styles.notSelectedStyles;
  }
}
