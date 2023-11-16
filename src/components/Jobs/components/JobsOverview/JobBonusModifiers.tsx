import i18n from 'i18next';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ATTRIBUTE_FIELDS, SKILL_FIELDS, PERSON_STAT_FIELDS } from '@state/common'
import { IJob } from '@state/job';

interface IJobBonusModifiersProps {
  job: IJob;
}

const JobRequirements = observer((props: IJobBonusModifiersProps) => {
  const {
    job,
  } = props;

  const handleChangeAccordion = React.useCallback(() => {
    job.toggleBonusModifiers();
  }, [job]);

  return (
    <Accordion expanded={job.sectionsOpened.bonusModifiers} onChange={handleChangeAccordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">
          {i18n.t('sections.bonusModifiers', { ns: 'common' })}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          sx={{ marginBottom: 1 }}
        >
          {ATTRIBUTE_FIELDS.map((attribute) => job.bonusModifiers.attributes[attribute]
            ? i18n.t(`attributes.${attribute}`, { ns: 'common' })
            : null
          )}
          {SKILL_FIELDS.map((skill) => job.bonusModifiers.skills[skill]
            ? i18n.t(`skills.${skill}`, { ns: 'common' })
            : null
          )}
          {PERSON_STAT_FIELDS.map((stat) => job.bonusModifiers.personStats[stat]
            ? i18n.t(`stats.${stat}`, { ns: 'common' })
            : null
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
});

export default JobRequirements;
