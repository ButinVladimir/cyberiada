import { IPerson, Quality } from '@state/common';

export interface ISideJobCreateArguments {
  templateName: string;
  level: number;
  quality: Quality;
  searchPerson: IPerson;
  performingPerson: IPerson;
}
