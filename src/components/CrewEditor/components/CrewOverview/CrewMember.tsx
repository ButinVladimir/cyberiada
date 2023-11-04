import i18n from 'i18next';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { stateContext } from '@/contexts';
import { ATTRIBUTE_FIELDS, SKILL_FIELDS, PERSON_STAT_FIELDS } from '@state/common'
import { IPerson } from '@state/person';
import { ValueDisplayer, IPropertyDisplayer, IPropertySectionDisplayer } from '@components/common';
import { crewEditorCallbacksContext } from '../../crewEditorCallbacksContext';

interface ICrewMemberProps {
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
    <Grid item xs={12} sm={6} md={3}>
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

const CrewMember = observer((props: ICrewMemberProps) => {
  const {
    person,
  } = props;
  const gameStateManager = React.useContext(stateContext);
  const { startEditingMember } = React.useContext(crewEditorCallbacksContext);

  if (!gameStateManager) {
    return;
  }

  const handleStartEditingMember = () => {
    startEditingMember(person);
  };

  const handleDeleteMember = () => {
    gameStateManager.crewState.deleteCrewMember(person.id);
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={handleStartEditingMember}>
        <CardHeader
          title={<ValueDisplayer getValue={() => person.name} />}
          subheader={<ValueDisplayer getValue={() => person.id} />}
        />

        <CardContent>
          <Grid container columnSpacing={4} rowGap={1}>
            <PropertySectionDisplayer
              sectionKey="general"
              properties={[
                { paramKey: 'level', getValue: () => person.level },
                { paramKey: 'exp', getValue: () => person.exp },
                { paramKey: 'hp', getValue: () => person.hp },
                { paramKey: 'loyalty', getValue: () => person.loyalty },
                { paramKey: 'attributePoints', getValue: () => person.attributePoints },
                { paramKey: 'skillPoints', getValue: () => person.skillPoints },
              ]}
            />

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

            <PropertySectionDisplayer
              sectionKey="stats"
              properties={PERSON_STAT_FIELDS.map(field => ({
                paramKey: field,
                getValue: () => person.personStats[field],
              }))}
            />
          </Grid>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button onClick={handleDeleteMember}>
          {i18n.t('crewEditor.deleteCrewMember', { ns: 'ui' })}
        </Button>
      </CardActions>
    </Card>
  );
});

export default CrewMember;
