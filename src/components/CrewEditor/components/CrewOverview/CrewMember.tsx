import i18n from 'i18next';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { stateContext } from '@/contexts';
import { IPerson } from '@state/person';
import { ValueDisplayer } from '@components/common';
import { crewEditorCallbacksContext } from '../../crewEditorCallbacksContext';
import CrewMemberStats from './CrewMemberStats';
import CrewMemberParameters from './CrewMemberParameters';

interface ICrewMemberProps {
  person: IPerson;
}

const CrewMember = observer((props: ICrewMemberProps) => {
  const {
    person,
  } = props;
  const gameStateManager = React.useContext(stateContext);
  const { startEditingMember } = React.useContext(crewEditorCallbacksContext);

  const handleStartEditingMember = React.useCallback(() => {
    startEditingMember(person);
  }, [startEditingMember, person]);

  const handleDeleteMember = React.useCallback(() => {
    gameStateManager?.crewState.deleteCrewMember(person.id);
  }, [gameStateManager?.crewState, person]);

  if (!gameStateManager) {
    return;
  }

  return (
    <Card variant="outlined">
      <CardHeader
        title={<ValueDisplayer getValue={() => person.name} />}
        subheader={<ValueDisplayer getValue={() => person.id} />}
      />

      <CardContent>
        <CrewMemberStats person={person} />
        <CrewMemberParameters person={person} />
      </CardContent>

      <CardActions sx={{ justifyContent: 'end' }}>
        <Button onClick={handleStartEditingMember}>
          {i18n.t('crewEditor.editCrewMember', { ns: 'ui' })}
        </Button>
        <Button onClick={handleDeleteMember}>
          {i18n.t('crewEditor.deleteCrewMember', { ns: 'ui' })}
        </Button>
      </CardActions>
    </Card>
  );
});

export default CrewMember;
