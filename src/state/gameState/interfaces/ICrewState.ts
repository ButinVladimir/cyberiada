import { IPerson } from '@state/common';

export interface ICrewState {
  crew: IPerson[];
  incomingRequests: IPerson[];

  addCrewMember(person: IPerson): void;
  getCrewMember(id: string): IPerson;
  updateCrewMember(id: string, person: IPerson): void;
  deleteCrewMember(id: string): void;
}
