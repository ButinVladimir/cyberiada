import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import CardHeader from '@mui/material/CardHeader';
import { IActivity } from '@state/common';
import ActivityStatus from './ActivityStatus';

interface IActivityHeaderProps {
  activity: IActivity;
  title: string | React.ReactNode;
}

const ActivityHeader = observer((props: IActivityHeaderProps) => {
  const {
    activity,
    title,
  } = props;
  const { t } = useTranslation();

  return (
    <CardHeader
      title={title}
      titleTypographyProps={{
        variant: 'h5'
      }}
      subheader={t(
        'activity.assignedTo',
        {
          ns: 'ui',
          crewMembers: activity.assignedPersons.map(p => p.name).join(', '),
        },
      )}
      avatar={<ActivityStatus activity={activity} />}
    />
  );
});

export default ActivityHeader;
