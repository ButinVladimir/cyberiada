import { IPerson, IActivity } from '@state/common';

export interface ICrewState {
  crew: IPerson[];
  incomingRequests: IPerson[];
  activitiesInProcess: IActivity[];
  needsActivityReassignment: boolean;
  personActivityMap: Map<IPerson, IActivity>;

  addCrewMember(person: IPerson): void;
  getCrewMember(id: string): IPerson;
  updateCrewMember(id: string, person: IPerson): void;
  deleteCrewMember(id: string): void;
  requestActivityReassignment: () => void;
}
