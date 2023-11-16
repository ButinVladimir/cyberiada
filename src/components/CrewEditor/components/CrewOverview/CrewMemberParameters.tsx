import i18n from 'i18next';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ValueDisplayer, IPropertyDisplayer, IPropertySectionDisplayer } from '@components/common';
import { ATTRIBUTE_FIELDS, SKILL_FIELDS } from '@state/common';
import { IPerson } from '@state/person';

interface ICrewMemberParametersProps {
  person: IPerson;
}

const PropertyDisplayer = observer((props: IPropertyDisplayer) => {
  const {
    sectionKey,
    paramKey,
    getValue,
  } = props;

  return (
    <>
      <Grid item xs={6}>
        <Typography>
          {i18n.t(`${sectionKey}.${paramKey}`, { ns: 'common' })}
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ textAlign: "right" }}>
        <b>{<ValueDisplayer getValue={getValue} />}</b>
      </Grid>
    </>
  );
});

const PropertySectionDisplayer = observer((props: IPropertySectionDisplayer) => {
  const {
    sectionKey,
    properties,
  } = props;

  return (
    <Grid item xs={12} sm={6}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">
            {i18n.t(`sections.${sectionKey}`, { ns: 'common' })}
          </Typography>
        </Grid>

        {properties.map(({ paramKey, getValue }) => (
          <PropertyDisplayer
            key={paramKey}
            sectionKey={sectionKey}
            paramKey={paramKey}
            getValue={getValue}
          />
        ))}
      </Grid>
    </Grid>
  );
});

const CrewMemberParameters = observer((props: ICrewMemberParametersProps) => {
  const {
    person,
  } = props;

  const handleChangeAccordion  = React.useCallback(() => {
    person.toggleParameters();
  }, [person]);

  return (
    <Accordion expanded={person.sectionsOpened.parameters} onChange={handleChangeAccordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">
          {i18n.t('sections.parameters', { ns: 'common' })}
        </Typography>
      </AccordionSummary>
    
      <AccordionDetails>
        <Grid container columnSpacing={4} rowGap={1}>
          <PropertySectionDisplayer
            sectionKey="attributes"
            properties={ATTRIBUTE_FIELDS.map(field => ({
              paramKey: field,
              getValue: () => person.attributes[field],
            }))}
          />

          <PropertySectionDisplayer
            sectionKey="skills"
            properties={SKILL_FIELDS.map(field => ({
              paramKey: field,
              getValue: () => person.skills[field],
            }))}
          />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
});

export default CrewMemberParameters;
