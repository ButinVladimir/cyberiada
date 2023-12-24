import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { ISideJob } from '@state/sideJobs';
import ValueDisplayer from '../ValueDisplayer';
import { IComponentWithGameStateManagerProps } from '../interfaces';
import SideJobRequirements from './SideJobRequirements';
import SideJobBonusModifiers from './SideJobBonusModifiers';

interface ISideJobProps extends IComponentWithGameStateManagerProps {
  sideJob: ISideJob;
}

const SideJob = observer((props: ISideJobProps) => {
  const {
    sideJob,
    gameStateManager,
  } = props;
  const { t } = useTranslation();

  const handleDeleteSideJob = () => {
    gameStateManager.deleteActivity(sideJob);
  };

  return (
    <Card variant="outlined">
      <CardHeader
        title={<ValueDisplayer getValue={() => t(`activities.${sideJob.templateName}.title`, { ns: 'sideJobs' })} />}
        subheader={<ValueDisplayer getValue={() => sideJob.assignedPersons[0].name}/>}
      />

      <CardContent>
        <SideJobRequirements sideJob={sideJob} />
        <SideJobBonusModifiers sideJob={sideJob} />
      </CardContent>

      <CardActions sx={{ justifyContent: 'end' }}>
        <Button onClick={handleDeleteSideJob}>
          {t('common.delete', { ns: 'ui' })}
        </Button>
      </CardActions>
    </Card>
  );
});

export default SideJob;
