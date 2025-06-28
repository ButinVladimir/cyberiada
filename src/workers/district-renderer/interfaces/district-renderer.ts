import { IDistrictRendererResult } from './district-renderer-result';

export interface IDistrictRenderer {
  renderDistrict(): Promise<IDistrictRendererResult>;
}
