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
import { IPerson } from '@/state/person';
import { ValueDisplayer } from '@components/common';
import { crewEditorCallbacksContext } from '../../crewEditorCallbacksContext';

interface IPropertyDisplayer {
  sectionKey: string;
  paramKey: string;
  getValue: () => number;
}

interface IPropertySectionDisplayer {
  sectionKey: string;
  properties: {
    key: number;
    paramKey: string;
    getValue: () => number;
  }[];
}

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

        {properties.map(({ key, paramKey, getValue }) => (
          <PropertyDisplayer
            key={key}
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
                { key: 1, paramKey: 'level', getValue: () => person.level },
                { key: 2, paramKey: 'exp', getValue: () => person.exp },
                { key: 3, paramKey: 'hp', getValue: () => person.hp },
                { key: 4, paramKey: 'loyalty', getValue: () => person.loyalty },
                { key: 5, paramKey: 'attributePoints', getValue: () => person.attributePoints },
                { key: 6, paramKey: 'skillPoints', getValue: () => person.skillPoints },
              ]}
            />

            <PropertySectionDisplayer
              sectionKey="attributes"
              properties={[
                { key: 1, paramKey: 'strength', getValue: () => person.attributes.strength },
                { key: 2, paramKey: 'endurance', getValue: () => person.attributes.endurance },
                { key: 3, paramKey: 'agility', getValue: () => person.attributes.agility },
                { key: 4, paramKey: 'perception', getValue: () => person.attributes.perception },
                { key: 5, paramKey: 'intellect', getValue: () => person.attributes.intellect },
                { key: 6, paramKey: 'charisma', getValue: () => person.attributes.charisma },
              ]}
            />

            <PropertySectionDisplayer
              sectionKey="skills"
              properties={[
                { key: 1, paramKey: 'closeCombat', getValue: () => person.skills.closeCombat },
                { key: 2, paramKey: 'rangedCombat', getValue: () => person.skills.rangedCombat },
                { key: 3, paramKey: 'stealth', getValue: () => person.skills.stealth },
                { key: 4, paramKey: 'infoGathering', getValue: () => person.skills.infoGathering },
                { key: 5, paramKey: 'persuasion', getValue: () => person.skills.persuasion },
                { key: 6, paramKey: 'hacking', getValue: () => person.skills.hacking },
                { key: 7, paramKey: 'engineering', getValue: () => person.skills.engineering },
                { key: 8, paramKey: 'chemistry', getValue: () => person.skills.chemistry },
              ]}
            />

            <PropertySectionDisplayer
              sectionKey="stats"
              properties={[
                { key: 1, paramKey: 'closeCombatScore', getValue: () => person.personStats.closeCombatScore },
                { key: 2, paramKey: 'rangedCombatScore', getValue: () => person.personStats.rangedCombatScore },
                { key: 3, paramKey: 'defense', getValue: () => person.personStats.defense },
                { key: 4, paramKey: 'maxHp', getValue: () => person.personStats.maxHp },
              ]}
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
