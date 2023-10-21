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
import { selectMemberContext } from '../../selectMemberContext';

interface IPropertyDisplayer {
  title: string;
  getValue: () => number;
}

interface IPropertySectionDisplayer {
  title: string;
  properties: {
    key: number;
    title: string;
    getValue: () => number;
  }[];
}

interface ICrewMemberProps {
  person: IPerson;
}

const PropertyDisplayer = observer((props: IPropertyDisplayer) => {
  const {
    title,
    getValue,
  } = props;

  return (
    <>
      <Grid item xs={6}>
        <Typography>
          {title}
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
    title,
    properties,
  } = props;

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">
            {title}
          </Typography>
        </Grid>

        {properties.map(({ key, title: propertyTitle, getValue }) => (
          <PropertyDisplayer
            key={key}
            title={propertyTitle}
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
  const selectMemberCallback = React.useContext(selectMemberContext);

  if (!gameStateManager) {
    return;
  }

  const handleStartEditingMember = () => {
    selectMemberCallback(person);
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
          <Grid container columnSpacing={4} rowSpacing={1}>
            <PropertySectionDisplayer
              title="General"
              properties={[
                { key: 1, title: 'HP', getValue: () => person.hp },
                { key: 2, title: 'Loyalty', getValue: () => person.loyalty },
                { key: 3, title: 'Attribute points', getValue: () => person.attributePoints },
                { key: 4, title: 'Skill points', getValue: () => person.skillPoints },
              ]}
            />

            <PropertySectionDisplayer
              title="Attributes"
              properties={[
                { key: 1, title: 'Strength', getValue: () => person.attributes.strength },
                { key: 2, title: 'Endurance', getValue: () => person.attributes.endurance },
                { key: 3, title: 'Agility', getValue: () => person.attributes.agility },
                { key: 4, title: 'Perception', getValue: () => person.attributes.perception },
                { key: 5, title: 'Intellect', getValue: () => person.attributes.intellect },
                { key: 6, title: 'Charisma', getValue: () => person.attributes.charisma },
              ]}
            />

            <PropertySectionDisplayer
              title="Skills"
              properties={[
                { key: 1, title: 'Close combat', getValue: () => person.skills.closeCombat },
                { key: 2, title: 'Ranged combat', getValue: () => person.skills.rangedCombat },
                { key: 3, title: 'Stealth', getValue: () => person.skills.stealth },
                { key: 4, title: 'Info gathering', getValue: () => person.skills.infoGathering },
                { key: 5, title: 'Persuasion', getValue: () => person.skills.persuasion },
                { key: 6, title: 'Hacking', getValue: () => person.skills.hacking },
                { key: 7, title: 'Engineering', getValue: () => person.skills.engineering },
                { key: 8, title: 'Chemistry', getValue: () => person.skills.chemistry },
              ]}
            />

            <PropertySectionDisplayer
              title="Stats"
              properties={[
                { key: 1, title: 'MC score', getValue: () => person.stats.closeCombatScore },
                { key: 2, title: 'RC score', getValue: () => person.stats.rangedCombatScore },
                { key: 3, title: 'Defense', getValue: () => person.stats.defense },
                { key: 4, title: 'Speed', getValue: () => person.stats.speed },
                { key: 5, title: 'Max HP', getValue: () => person.stats.maxHp },
              ]}
            />
          </Grid>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button onClick={handleDeleteMember}>Delete member</Button>
      </CardActions>
    </Card>
  );
});

export default CrewMember;
