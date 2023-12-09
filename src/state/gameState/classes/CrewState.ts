import { makeAutoObservable } from 'mobx';
import { ICrewState } from '../interfaces';
import { IPerson } from '@state/common';

export class CrewState implements ICrewState {
  crew: IPerson[] = [];
  incomingRequests: IPerson[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addCrewMember = (person: IPerson): void => {
    this.crew = [...this.crew, person];
  };

  getCrewMember = (id: string): IPerson => {
    const member = this.crew.find(p => p.id === id);
    if (!member) {
      throw new Error(`Person with id ${id} does not exist`);
    }

    return member;
  };

  updateCrewMember = (id: string, person: IPerson): void => {
    const existingMember = this.crew.find(p => p.id === id);
    if (!existingMember) {
      throw new Error(`Person with id ${id} does not exist`);
    }

    existingMember.update(person);
  };

  deleteCrewMember = (id: string): void => {
    this.crew = this.crew.filter(p => p.id !== id);
  };
}
