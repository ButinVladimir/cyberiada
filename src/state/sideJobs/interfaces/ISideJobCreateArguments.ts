import { IPerson, Quality } from '@state/common';

export interface ISideJobCreateArguments {
  templateName: string;
  quality: Quality;
  searchPerson: IPerson;
  performingPerson: IPerson;
}
