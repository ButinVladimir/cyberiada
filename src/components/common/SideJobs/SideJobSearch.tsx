import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { ISideJobSearch } from '@state/sideJobs';
import { Activity } from '../Activity'; 
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

  const title = React.useMemo<string>(() => {
    const type = t('activity.types.sideJobSearch', { ns: 'ui' });
    const template = t(`activities.${sideJobSearch.templateName}.title`, { ns: 'sideJobs' });

    return `${type}: ${template}`;
  }, [sideJobSearch.templateName, t]);

  return (
    <Activity
      activity={sideJobSearch}
      title={title}
      gameStateManager={gameStateManager}
    >
      <SideJobSearchProgress sideJobSearch={sideJobSearch} />
      <SideJobRequirements sideJob={sideJobSearch} />
      <SideJobBonusModifiers sideJob={sideJobSearch} />
    </Activity>
  );
});

export default SideJobSearch;
