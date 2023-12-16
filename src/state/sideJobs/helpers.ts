import {
  ATTRIBUTE_FIELDS, SKILL_FIELDS, PERSON_STAT_FIELDS,
  IPerson, IActivityRequirements, Quality, QUALITY_STEPS,
} from '@state/common';
import {
  SEARCH_TIME_FACTOR, SEARCH_COST_FACTOR,
  SEARCH_INFO_GATHERING_FACTOR, SEARCH_INTELLECT_FACTOR,
} from './constants';
import { ISideJobTemplate } from './interfaces/ISideJobTemplate';

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

export function getSearchCompleteTime(person: IPerson, template: ISideJobTemplate, quality: Quality) {
  const factor = Math.max(
    1,
    SEARCH_TIME_FACTOR
      - SEARCH_INFO_GATHERING_FACTOR * person.skills.infoGathering
      - SEARCH_INTELLECT_FACTOR * person.attributes.intellect,
  );

  return template.baseTime * (factor ** QUALITY_STEPS[quality]);
}

export function getSearchCost(person: IPerson, template: ISideJobTemplate, quality: Quality) {
  const factor = Math.max(
    1,
    SEARCH_COST_FACTOR
      - SEARCH_INFO_GATHERING_FACTOR * person.skills.infoGathering
      - SEARCH_INTELLECT_FACTOR * person.attributes.intellect,
  );

  return template.baseTime * (factor ** QUALITY_STEPS[quality]);
}
