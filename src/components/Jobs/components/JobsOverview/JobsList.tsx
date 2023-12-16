import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import Job from './Job';

const JobsList = observer(() => {
  const gameStateManager = getGameStateManagerInstance();

  const sideJobs = gameStateManager.sideJobState.sideJobs;
  
  return (
    <Stack spacing={2}>
      {sideJobs.map((sideJob) => <Job key={sideJob.id} job={sideJob} />)}
    </Stack>
  );
});

export default JobsList;
