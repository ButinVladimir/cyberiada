import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import { ISideJob } from '@/state/sideJobs';
import { ValueDisplayer } from '@components/common';

interface IJobProps {
  job: ISideJob;
}

const Job = observer((props: IJobProps) => {
  const {
    job,
  } = props;
  const gameStateManager = getGameStateManagerInstance();
  const { t } = useTranslation();

  const handleDeleteSideJob = () => {
    gameStateManager.sideJobState.deleteSideJob(job);
  };

  return (
    <Card variant="outlined">
      <CardHeader
        title={<ValueDisplayer getValue={() => t(`${job.templateName}.title`, { ns: 'jobs' })} />}
        subheader={<ValueDisplayer getValue={() => t(`${job.templateName}.description`, { ns: 'jobs' })} />}
      />

      <CardContent>
      </CardContent>

      <CardActions sx={{ justifyContent: 'end' }}>
        <Button onClick={handleDeleteSideJob}>
          {t('jobs.deleteJob', { ns: 'ui' })}
        </Button>
      </CardActions>
    </Card>
  );
});

export default Job;
