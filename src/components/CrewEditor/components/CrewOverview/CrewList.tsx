import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import CrewMember from './CrewMember';

const CrewList = observer(() => {
  const gameStateManager = getGameStateManagerInstance();

  const crew = gameStateManager.crewState.crew;
  
  return (
    <Stack spacing={2}>
      {crew.map((person) => <CrewMember key={person.id} person={person} />)}
    </Stack>
  );
});

export default CrewList;
