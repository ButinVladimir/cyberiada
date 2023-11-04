import i18n from 'i18next';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { stateContext } from '@/contexts';
import { ATTRIBUTE_FIELDS, SKILL_FIELDS, PERSON_STAT_FIELDS } from '@state/common'
import { IJob } from '@state/job';
import { ValueDisplayer, IPropertyDisplayer, IPropertySectionDisplayer } from '@components/common';

interface IJobProps {
  job: IJob;
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
    <Grid item xs={12} sm={6} md={4}>
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

const CrewMember = observer((props: IJobProps) => {
  const {
    job,
  } = props;
  const gameStateManager = React.useContext(stateContext);

  if (!gameStateManager) {
    return;
  }

  const handleDeleteJob = () => {
    gameStateManager.jobState.deleteJob(job.id);
  };

  return (
    <Card variant="outlined">
      <CardHeader
        title={<ValueDisplayer getValue={() => i18n.t(`${job.templateName}.title`, { ns: 'jobs' })} />}
        subheader={<ValueDisplayer getValue={() => i18n.t(`${job.templateName}.description`, { ns: 'jobs' })} />}
      />

      <CardContent>
        <Grid container columnSpacing={4} rowGap={1}>
          <PropertySectionDisplayer
            sectionKey="attributes"
            properties={ATTRIBUTE_FIELDS.map(field => ({
              paramKey: field,
              getValue: () => job.requirements.attributes[field],
            }))}
          />

          <PropertySectionDisplayer
            sectionKey="skills"
            properties={SKILL_FIELDS.map(field => ({
              paramKey: field,
              getValue: () => job.requirements.skills[field],
            }))}
          />

          <PropertySectionDisplayer
            sectionKey="stats"
            properties={PERSON_STAT_FIELDS.map(field => ({
              paramKey: field,
              getValue: () => job.requirements.personStats[field],
            }))}
          />
        </Grid>
      </CardContent>

      <CardActions>
        <Button onClick={handleDeleteJob}>
          {i18n.t('jobs.deleteJob', { ns: 'ui' })}
        </Button>
      </CardActions>
    </Card>
  );
});

export default CrewMember;
