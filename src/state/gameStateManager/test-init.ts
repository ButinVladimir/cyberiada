import { Person, Quality } from '@state/common';
import { v4 as uuid } from 'uuid';
import { getGameStateManagerInstance } from './get-instance';

export function initTestData() {
  const gameStateManager = getGameStateManagerInstance();

  const crewMember1 = new Person(uuid());
  crewMember1.name = 'Crew member 1';
  const crewMember2 = new Person(uuid());
  crewMember2.name = 'Crew member 2';

  gameStateManager.crewState.addCrewMember(crewMember1);
  gameStateManager.crewState.addCrewMember(crewMember2);

  gameStateManager.sideJobState.startSideJobSearch({
    performingPerson: crewMember1,
    searchPerson: crewMember1,
    quality: Quality.Excellent,
    templateName: 'oddjobs',
  });
  gameStateManager.sideJobState.startSideJobSearch({
    performingPerson: crewMember1,
    searchPerson: crewMember1,
    quality: Quality.Excellent,
    templateName: 'oddjobs',
  });

  gameStateManager.sideJobState.startSideJob({
    performingPerson: crewMember2,
    searchPerson: crewMember2,
    quality: Quality.Abysmal,
    templateName: 'oddjobs',
  });
  gameStateManager.sideJobState.startSideJob({
    performingPerson: crewMember2,
    searchPerson: crewMember2,
    quality: Quality.Abysmal,
    templateName: 'oddjobs',
  });

}
