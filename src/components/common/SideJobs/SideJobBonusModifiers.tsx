import { useTranslation } from 'react-i18next';
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
import { ISideJob } from '@/state/sideJobs';

interface ISideJobBonusModifiersProps {
  sideJob: ISideJob;
}

const SideJobRequirements = observer((props: ISideJobBonusModifiersProps) => {
  const {
    sideJob,
  } = props;

  const { t } = useTranslation();

  const handleChangeAccordion = React.useCallback(() => {
    sideJob.toggleBonusModifiers();
  }, [sideJob]);

  return (
    <Accordion expanded={sideJob.sectionsOpened.bonusModifiers} onChange={handleChangeAccordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">
          {t('sections.bonusModifiers', { ns: 'common' })}
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
          {ATTRIBUTE_FIELDS.map((attribute) => sideJob.template.bonusModifiers.attributes[attribute]
            ? t(`attributes.${attribute}`, { ns: 'common' })
            : null
          )}
          {SKILL_FIELDS.map((skill) => sideJob.template.bonusModifiers.skills[skill]
            ? t(`skills.${skill}`, { ns: 'common' })
            : null
          )}
          {PERSON_STAT_FIELDS.map((stat) => sideJob.template.bonusModifiers.personStats[stat]
            ? t(`stats.${stat}`, { ns: 'common' })
            : null
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
});

export default SideJobRequirements;
