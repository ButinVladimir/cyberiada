import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import { IComponentWithGameStateManagerProps, SideJob } from '@components/common';

const SideJobsList = observer((props: IComponentWithGameStateManagerProps) => {
  const { gameStateManager } = props;

  const { sideJobs } = gameStateManager.sideJobState;
  
  return (
    <Stack spacing={2}>
      {sideJobs.map((sideJob) => (
        <SideJob
          key={sideJob.id}
          gameStateManager={gameStateManager}
          sideJob={sideJob}
        />
      ))}
    </Stack>
  );
});

export default SideJobsList;
