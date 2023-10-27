import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import pick from 'lodash/pick';
import { v4 as uuid } from 'uuid';
import { stateContext } from '@/contexts';
import { IPerson, IAttributes, ISkills, Person } from '@/state/person';
import { crewEditorCallbacksContext } from '../../crewEditorCallbacksContext';
import { ICommonParamsState } from './types';
import NameInput from './NameInput';
import CommonParamInputs from './CommonParamInputs';
import AttributeInputs from './AttributeInputs';
import SkillInputs from './SkillInputs';

interface ICrewMemberEditorProps {
  action: 'create' | 'edit';
  person?: IPerson;
}

export default function CrewMemberEditor(props: ICrewMemberEditorProps) {
  const {
    action,
    person,
  } = props;
  const gameStateManager = React.useContext(stateContext);
  const { listMembers } = React.useContext(crewEditorCallbacksContext);

  const [commonParamsState, setCommonParamsState] = React.useState<ICommonParamsState>(() => {
    if (!person) {
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

    return pick(person, ['name', 'level', 'exp', 'hp', 'loyalty', 'attributePoints', 'skillPoints']);
  });

  const [attributesState, setAttributesState] = React.useState<IAttributes>(() => {
    if (!person) {
      return {
        strength: 0,
        endurance: 0,
        agility: 0,
        perception: 0,
        intellect: 0,
        charisma: 0,
      };
    }

    return { ...person.attributes };
  });

  const [skillsState, setSkillsState] = React.useState<ISkills>(() => {
    if (!person) {
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

    return { ...person.skills };
  });

  const handleSubmit = () => {
    const newPerson = new Person(
      person ? person.id : uuid()
    );

    Object.assign(newPerson, commonParamsState);
    Object.assign(newPerson.attributes, attributesState);
    Object.assign(newPerson.skills, skillsState);

    if (person) {
      gameStateManager?.crewState.updateCrewMember(person.id, newPerson);
    } else {
      gameStateManager?.crewState.addCrewMember(newPerson);
    }

    listMembers();
  };

  return (
    <form
      id="editCrewMember"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Grid container rowGap={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">
            {action === 'create' ? 'Creating crew member' : 'Editing crew member'}
          </Typography>
        </Grid>

        <NameInput
          commonParamsState={commonParamsState}
          setCommonParamsState={setCommonParamsState}
        />

        <CommonParamInputs
          commonParamsState={commonParamsState}
          setCommonParamsState={setCommonParamsState}
        />

        <AttributeInputs
          attributesState={attributesState}
          setAttributesState={setAttributesState}
        />

        <SkillInputs
          skillsState={skillsState}
          setSkillsState={setSkillsState}
        />

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
              type="submit"
              variant="contained"
            >
              {action === 'create' ? 'Create' : 'Update'}
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </form>
  );
}
