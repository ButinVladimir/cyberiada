import {
  ATTRIBUTE_FIELDS, SKILL_FIELDS, PERSON_STAT_FIELDS,
  IPerson, IActivityRequirements, Quality, QUALITY_STEPS,
} from '@state/common';
import { BASE_SEARCH_TIME, SEARCH_TIME_FACTOR } from './constants';

export function checkSidejobIsApplicable(assignedPersons: IPerson[], requirements: IActivityRequirements): boolean {
  if (assignedPersons.length > 1) {
    return false;
  }

  for (const field of ATTRIBUTE_FIELDS) {
    if (assignedPersons[0].attributes[field] < requirements.attributes[field]) {
      return false;
    }
  }

  for (const field of SKILL_FIELDS) {
    if (assignedPersons[0].skills[field] < requirements.skills[field]) {
      return false;
    }
  }

  for (const field of PERSON_STAT_FIELDS) {
    if (assignedPersons[0].personStats[field] < requirements.personStats[field]) {
      return false;
    }
  }

  return false;
}

export function getSearchCompleteTime(quality: Quality) {
  return BASE_SEARCH_TIME * (SEARCH_TIME_FACTOR ** QUALITY_STEPS[quality]);
}
