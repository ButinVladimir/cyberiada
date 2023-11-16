import React from 'react';
import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import { stateContext } from '@/contexts';
import CrewMember from './CrewMember';

const CrewList = observer(() => {
  const gameStateManager = React.useContext(stateContext);

  if (!gameStateManager) {
    return;
  }

  const crew = gameStateManager.crewState.crew;
  
  return (
    <Stack spacing={2}>
      {crew.map((person) => <CrewMember key={person.id} person={person} />)}
    </Stack>
  );
});

export default CrewList;
