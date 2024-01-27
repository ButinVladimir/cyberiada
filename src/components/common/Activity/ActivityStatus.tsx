import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Tooltip from '@mui/material/Tooltip';
import PlayIcon from '@mui/icons-material/PlayCircleFilled';
import PauseIcon from '@mui/icons-material/PauseCircleFilled';
import { IActivity } from '@state/common';

interface IActivityStatusProps {
  activity: IActivity;
}

const ActivityStatus = observer((props: IActivityStatusProps) => {
  const {
    activity,
  } = props;
  const { t } = useTranslation();

  const tooltipTitle = React.useMemo(() => 
    `activity.activityStatus.${activity.isActive ? 'inProgress': 'onHold'}`,
    [activity.isActive],
  );

  return (
    <Tooltip
      title={t(tooltipTitle, { ns: 'ui' })}
      arrow
    >
      {activity.isActive
        ? <PlayIcon fontSize="large" />
        : <PauseIcon fontSize="large" />
      }
    </Tooltip>
  );
});

export default ActivityStatus;
