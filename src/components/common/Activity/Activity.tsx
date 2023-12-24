import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { IActivity } from '@state/common';
import { IComponentWithGameStateManagerProps } from '../interfaces';
import ActivityHeader from './ActivityHeader';

interface IActivityProps extends IComponentWithGameStateManagerProps {
  activity: IActivity;
  title: string | React.ReactNode;
}

const Activity = observer((props: React.PropsWithChildren<IActivityProps>) => {
  const {
    activity,
    title,
    gameStateManager,
    children,
  } = props;
  const { t } = useTranslation();

  const handleDeleteSideJob = () => {
    gameStateManager.deleteActivity(activity);
  };

  return (
    <Card variant="outlined">
      <ActivityHeader activity={activity} title={title} />

      <CardContent sx={{ paddingTop: 0 }}>
        {children}
      </CardContent>

      <CardActions sx={{ justifyContent: 'end' }}>
        <Button onClick={handleDeleteSideJob}>
          {t('common.delete', { ns: 'ui' })}
        </Button>
      </CardActions>
    </Card>
  );
});

export default Activity;
