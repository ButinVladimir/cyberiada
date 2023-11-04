import React from 'react';
import TopPanel from './TopPanel';
import JobsList from './JobsList';
import AddJobModal from './AddJobModal';

export default function CrewOverview() {
  const [jobModalOpened, setJobModalOpened] = React.useState(false);

  const handleOpenJobModal = () => {
    setJobModalOpened(true);
  };

  const handleCloseJobModal = () => {
    setJobModalOpened(false);
  };

  return (
    <>
      <TopPanel onOpenJobModal={handleOpenJobModal} />
      <JobsList />
      <AddJobModal
        opened={jobModalOpened}
        onCloseModal={handleCloseJobModal}
      />
    </>
  );
}
