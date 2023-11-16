import React from 'react';
import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import { stateContext } from '@/contexts';
import Job from './Job';

const JobsList = observer(() => {
  const gameStateManager = React.useContext(stateContext);

  if (!gameStateManager) {
    return;
  }

  const jobs = gameStateManager.jobState.jobs;
  
  return (
    <Stack spacing={2}>
      {jobs.map((job) => <Job key={job.id} job={job} />)}
    </Stack>
  );
});

export default JobsList;
