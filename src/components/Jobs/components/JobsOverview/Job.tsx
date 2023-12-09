import { useTranslation } from 'react-i18next';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { stateContext } from '@/contexts';
import { ISideJob } from '@/state/sideJobs';
import { ValueDisplayer } from '@components/common';
import JobRequirements from './JobRequirements';
import JobBonusModifiers from './JobBonusModifiers';

interface IJobProps {
  job: ISideJob;
}

const Job = observer((props: IJobProps) => {
  const {
    job,
  } = props;
  const gameStateManager = React.useContext(stateContext);
  const { t } = useTranslation();

  if (!gameStateManager) {
    return;
  }

  const handleDeleteJob = () => {
    gameStateManager.jobState.deleteJob(job.id);
  };

  return (
    <Card variant="outlined">
      <CardHeader
        title={<ValueDisplayer getValue={() => t(`${job.templateName}.title`, { ns: 'jobs' })} />}
        subheader={<ValueDisplayer getValue={() => t(`${job.templateName}.description`, { ns: 'jobs' })} />}
      />

      <CardContent>
        <JobRequirements job={job} />
        <JobBonusModifiers job={job} />
      </CardContent>

      <CardActions sx={{ justifyContent: 'end' }}>
        <Button onClick={handleDeleteJob}>
          {t('jobs.deleteJob', { ns: 'ui' })}
        </Button>
      </CardActions>
    </Card>
  );
});

export default Job;
