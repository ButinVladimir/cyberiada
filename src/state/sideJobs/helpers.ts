import {
  ATTRIBUTE_FIELDS, SKILL_FIELDS, PERSON_STAT_FIELDS, QUALITY_STEPS,
} from '@state/common';
import {
  SEARCH_TIME_FACTOR, SEARCH_COST_FACTOR,
  SEARCH_INFO_GATHERING_FACTOR, SEARCH_INTELLECT_FACTOR,
} from './constants';
import { ISideJob, ISideJobSearch } from './interfaces';

export function checkSidejobIsApplicable(sideJob: ISideJob): boolean {
  if (sideJob.assignedPersons.length > 1) {
    return false;
  }

  for (const field of ATTRIBUTE_FIELDS) {
    if (sideJob.assignedPersons[0].attributes[field] < sideJob.requirements.attributes[field]) {
      return false;
    }
  }

  for (const field of SKILL_FIELDS) {
    if (sideJob.assignedPersons[0].skills[field] < sideJob.requirements.skills[field]) {
      return false;
    }
  }

  for (const field of PERSON_STAT_FIELDS) {
    if (sideJob.assignedPersons[0].personStats[field] < sideJob.requirements.personStats[field]) {
      return false;
    }
  }

  return false;
}

export function getSearchCompleteTime(sideJobSearch: ISideJobSearch): number {
  const factor = Math.max(
    1,
    SEARCH_TIME_FACTOR
      - SEARCH_INFO_GATHERING_FACTOR * sideJobSearch.assignedPersons[0].skills.infoGathering
      - SEARCH_INTELLECT_FACTOR * sideJobSearch.assignedPersons[0].attributes.intellect,
  );

  return sideJobSearch.template.baseTime * (factor ** QUALITY_STEPS[sideJobSearch.quality]);
}

export function getSearchCost(sideJobSearch: ISideJobSearch): number {
  const factor = Math.max(
    1,
    SEARCH_COST_FACTOR
      - SEARCH_INFO_GATHERING_FACTOR * sideJobSearch.assignedPersons[0].skills.infoGathering
      - SEARCH_INTELLECT_FACTOR * sideJobSearch.assignedPersons[0].attributes.intellect,
  );
  const ratio = sideJobSearch.timeLeft / sideJobSearch.timeToFinish;

  return ratio * sideJobSearch.template.baseTime * (factor ** QUALITY_STEPS[sideJobSearch.quality]);
}
