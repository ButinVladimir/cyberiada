import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { ISideJobSearch } from '@/state/sideJobs';
import ValueDisplayer from '../ValueDisplayer';
import { IComponentWithGameStateManagerProps } from '../interfaces';
import SideJobRequirements from './SideJobRequirements';
import SideJobBonusModifiers from './SideJobBonusModifiers';
import SideJobSearchProgress from './SideJobSearchProgress';

interface ISideJobSearchProps extends IComponentWithGameStateManagerProps {
  sideJobSearch: ISideJobSearch;
}

const SideJobSearch = observer((props: ISideJobSearchProps) => {
  const {
    sideJobSearch,
    gameStateManager,
  } = props;
  const { t } = useTranslation();

  const handleDeleteSideJob = () => {
    gameStateManager.deleteActivity(sideJobSearch);
  };

  return (
    <Card variant="outlined">
      <CardHeader
        title={<ValueDisplayer getValue={() => t(`activities.${sideJobSearch.templateName}.title`, { ns: 'sideJobs' })} />}
        subheader={<ValueDisplayer getValue={() => sideJobSearch.assignedPersons[0].name}/>}
      />

      <CardContent>
        <SideJobSearchProgress sideJobSearch={sideJobSearch} />
        <SideJobRequirements sideJob={sideJobSearch} />
        <SideJobBonusModifiers sideJob={sideJobSearch} />
      </CardContent>

      <CardActions sx={{ justifyContent: 'end' }}>
        <Button onClick={handleDeleteSideJob}>
          {t('common.delete', { ns: 'ui' })}
        </Button>
      </CardActions>
    </Card>
  );
});

export default SideJobSearch;
