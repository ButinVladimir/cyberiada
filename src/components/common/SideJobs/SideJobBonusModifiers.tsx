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
import { ISideJob } from '@state/sideJobs';
import { floatFormatter } from '@helpers/formatters';

interface ISideJobBonusModifiersProps {
  sideJob: ISideJob;
}

interface IBonusModifierProps {
  field: string;
  value?: number;
}

const BonusModifier = observer((props: IBonusModifierProps) => {
  const { field, value } = props;

  if (!value) {
    return null;
  }

  return (
    <div>{field} x <b>{floatFormatter.format(value)}</b></div>
  )
});

const SideJobBonusModifiers = observer((props: ISideJobBonusModifiersProps) => {
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
        <Typography variant="h6">
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
          {ATTRIBUTE_FIELDS.map((attribute) => {
            const value = sideJob.template.bonusModifiers.attributes[attribute];

            if (!value) {
              return null;
            }

            return (<BonusModifier
              key={attribute}
              field={t(`attributes.${attribute}`, { ns: 'common' })}
              value={value}
            />);
          })}

          {SKILL_FIELDS.map((skill) => {
            const value = sideJob.template.bonusModifiers.skills[skill];

            if (!value) {
              return null;
            }

            return (<BonusModifier
              key={skill}
              field={t(`skills.${skill}`, { ns: 'common' })}
              value={value}
            />);
          })}

          {PERSON_STAT_FIELDS.map((stat) => {
            const value = sideJob.template.bonusModifiers.personStats[stat];

            if (!value) {
              return null;
            }

            return (<BonusModifier
              key={stat}
              field={t(`stats.${stat}`, { ns: 'common' })}
              value={value}
            />);
          })}

          <BonusModifier
            field={t(`common.total`, { ns: 'ui' })}
            value={sideJob.bonusModifier}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
});

export default SideJobBonusModifiers;
