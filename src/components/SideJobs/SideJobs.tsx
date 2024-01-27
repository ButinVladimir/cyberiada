import React from 'react';
import Typography from '@mui/material/Typography';
import TopPanel from './components/TopPanel';
import AddSideJobModal from './components/AddSideJobModal';
import SideJobsOverview from './components/SideJobsOverview';

export default function SideJobs() {
  const [createSideJobModalOpened, setCreateJobModalOpened] = React.useState(false);

  const handleOpenCreateSideJobModal = () => {
    setCreateJobModalOpened(true);
  };

  const handleCloseCreateSideJobModal = () => {
    setCreateJobModalOpened(false);
  };

  return (
    <>
      <TopPanel
        onOpenCreateSideJobModal={handleOpenCreateSideJobModal}
      />

      <Typography component="p">
        Side jobs are basic activity for your crew. They provide profit immediately, have low requirements but generally have low rewards.
        Your crew member will get resources immediately while working on it.
        Only one crew member can be assigned to work on it.
      </Typography>

      <SideJobsOverview />

      <AddSideJobModal
        opened={createSideJobModalOpened}
        onCloseModal={handleCloseCreateSideJobModal}
      />
    </>
  );
}
