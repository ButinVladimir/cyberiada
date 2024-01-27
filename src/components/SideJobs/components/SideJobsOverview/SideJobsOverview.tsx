import React from 'react';
import { observer } from 'mobx-react-lite';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import SideJobsTabsContainer from './SideJobsTabsContainer';
import SideJobsList from './SideJobsList';
import SideJobSearchesList from './SideJobSearchesList';
import { SideJobTabs, TabsChangeCallback } from './types';

const SideJobsOverview = observer(() => {
  const gameStateManager = getGameStateManagerInstance();
  const [selectedTab, setSelectedTab] = React.useState<SideJobTabs>(SideJobTabs.Searches);

  const handleSelectTab = React.useCallback<TabsChangeCallback>((event, value) => {
    setSelectedTab(value);
  }, []);

  console.log('Render overview', Math.random() * 100);

  return (
    <>
      <SideJobsTabsContainer 
        gameStateManager={gameStateManager}
        selectedTab={selectedTab}
        onSelectTab={handleSelectTab}
      />

      {selectedTab === SideJobTabs.Searches && <SideJobSearchesList gameStateManager={gameStateManager} />}
      {selectedTab === SideJobTabs.Found && <SideJobsList gameStateManager={gameStateManager} />}
    </>
  );
});

export default SideJobsOverview;
