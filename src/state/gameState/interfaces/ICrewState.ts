import { IPerson } from '@state/person';

export interface ICrewState {
  crew: IPerson[];
  incomingRequests: IPerson[];

  addCrewMember(): void;
  updateCrewMember(person: IPerson): void;
  deleteCrewMember(id: string): void;
}
