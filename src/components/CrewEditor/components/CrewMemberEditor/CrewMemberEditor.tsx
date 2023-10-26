import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import pick from 'lodash/pick';
import { stateContext } from '@/contexts';
import { IPerson, IAttributes, ISkills, Person } from '@/state/person';
import { crewEditorCallbacksContext } from '../../crewEditorCallbacksContext';

interface ICrewMemberEditorProps {
  action: 'create' | 'edit';
  person?: IPerson;
}

interface ICommonParamsState {
  name: string;
  level: number;
  exp: number;
  hp: number;
  loyalty: number;
  attributePoints: number;
  skillPoints: number;
}

const commonParamsLabelMap: Record<Exclude<keyof ICommonParamsState, 'name'>, string> = {
  level: 'Level',
  exp: 'Experience',
  hp: 'HP',
  loyalty: 'Loyalty',
  attributePoints: 'Attribute points',
  skillPoints: 'Skill points',
};

const attributesLabelMap: Record<keyof IAttributes, string> = {
  strength: 'Strength',
  endurance: 'Endurance',
  agility: 'Agility',
  perception: 'Perception',
  intellect: 'Intellect',
  charisma: 'Charisma',
};

const skillsLabelMap: Record<keyof ISkills, string> = {
  closeCombat: 'Close combat',
  rangedCombat: 'Ranged combat',
  stealth: 'Stealth',
  infoGathering: 'Info gathering',
  persuasion: 'Persuasion',
  hacking: 'Hacking',
  engineering: 'Engineering',
  chemistry: 'Chemistry',
};

export default function CrewMemberEditor(props: ICrewMemberEditorProps) {
  const {
    action,
    person,
  } = props;
  const gameStateManager = React.useContext(stateContext);
  const { listMembers } = React.useContext(crewEditorCallbacksContext);

  const [commonParamsState, setCommonParamsState] = React.useState<ICommonParamsState>(() => {
    if (action === 'create') {
      return {
        name: '',
        level: 0,
        exp: 0,
        hp: 0,
        loyalty: 0,
        attributePoints: 0,
        skillPoints: 0,
      };
    }

    return pick(person!, ['name', 'level', 'exp', 'hp', 'loyalty', 'attributePoints', 'skillPoints']);
  });

  const [attributesState, setAttributesState] = React.useState<IAttributes>(() => {
    if (action === 'create') {
      return {
        strength: 0,
        endurance: 0,
        agility: 0,
        perception: 0,
        intellect: 0,
        charisma: 0,
      };
    }

    return { ...person!.attributes };
  });

  const [skillsState, setSkillsState] = React.useState<ISkills>(() => {
    if (action === 'create') {
      return {
        closeCombat: 0,
        rangedCombat: 0,
        stealth: 0,
        infoGathering: 0,
        persuasion: 0,
        hacking: 0,
        engineering: 0,
        chemistry: 0,
      };
    }

    return { ...person!.skills };
  });

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    const { value } = event.target;

    setCommonParamsState((prevState) => ({
      ...prevState,
      name: value,
    }));
  }, []);

  const handleCommonParamChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    const { name, value } = event.target;

    setCommonParamsState((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  }, []);

  const handleAttributeChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    const { name, value } = event.target;

    setAttributesState((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  }, []);

  const handleSkillChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    const { name, value } = event.target;

    setSkillsState((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  }, []);

  return (
    <form
      id="editCrewMember"
      autoComplete="off"
      onSubmit={() => {}}
    >
      <Grid container rowGap={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">
            { action === 'create' ? 'Creating crew member' : 'Editing crew member' }
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={commonParamsState.name}
            onChange={handleNameChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4">
            Basic parameters
          </Typography>
        </Grid>

        {Object.entries(commonParamsLabelMap).map(([name, label]) => (
          <Grid key={name} item xs={12} md={6} lg={4}>
            <TextField
              type="number"
              name={name}
              label={label}
              fullWidth
              value={commonParamsState[name as keyof ICommonParamsState]}
              onChange={handleCommonParamChange}
            />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Typography variant="h4">
            Attributes
          </Typography>
        </Grid>

        {Object.entries(attributesLabelMap).map(([name, label]) => (
          <Grid key={name} item xs={12} md={6} lg={4}>
            <TextField
              type="number"
              name={name}
              label={label}
              fullWidth
              value={attributesState[name as keyof IAttributes]}
              onChange={handleAttributeChange}
            />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Typography variant="h4">
            Skills
          </Typography>
        </Grid>

        {Object.entries(skillsLabelMap).map(([name, label]) => (
          <Grid key={name} item xs={12} md={6} lg={4}>
            <TextField
              type="number"
              name={name}
              label={label}
              fullWidth
              value={skillsState[name as keyof ISkills]}
              onChange={handleSkillChange}
            />
          </Grid>
        ))}

        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <ButtonGroup disableElevation>
            <Button
              type="button"
              variant="outlined"
              onClick={listMembers}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="contained"
              onClick={listMembers}
            >
              { action === 'create' ? 'Create' : 'Update'}
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </form>
  );
}
