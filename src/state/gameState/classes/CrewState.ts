import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { ICrewState } from '../interfaces';
import { IPerson, Person } from '@/state/person';

export class CrewState implements ICrewState {
  crew: IPerson[] = [];
  incomingRequests: IPerson[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addCrewMember = (): void => {
    const newMember = new Person(uuid());

    this.crew.push(newMember);
  };

  updateCrewMember = (person: IPerson): void => {
    const existingMember = this.crew.find(p => p.id === person.id);
    if (!existingMember) {
      throw new Error(`Person with id ${person.id} does not exist`);
    }

    existingMember.update(person);
  };

  deleteCrewMember = (id: string): void => {
    this.crew = this.crew.filter(p => p.id !== id);
  };
}
