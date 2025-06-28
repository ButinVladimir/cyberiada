import { DistrictRenderer } from './district-renderer';
import { IDistrictRendererArgs } from './interfaces';

onmessage = async (e: MessageEvent<IDistrictRendererArgs>) => {
  const districtRenderer = new DistrictRenderer(e.data);

  const districtRendererResult = await districtRenderer.renderDistrict();

  postMessage(districtRendererResult);
};
