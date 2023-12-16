import { Quality } from '@state/common';

export interface IJobCreateArguments {
  templateName: string;
  level: number;
  quality: Quality;
  searchPersonId: string;
  performingPersonId: string;
  isPaid: boolean;
}
