import { IPerson } from '@state/person';

export interface ICrewState {
  crew: IPerson[];
  incomingRequests: IPerson[];

  addCrewMember(): IPerson;
  updateCrewMember(id: string, person: IPerson): void;
  deleteCrewMember(id: string): void;
}
