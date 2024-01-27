import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import { IComponentWithGameStateManagerProps, SideJobSearch } from '@components/common';

const SideJobSearchesList = observer((props: IComponentWithGameStateManagerProps) => {
  const { gameStateManager } = props;

  const { sideJobSearches } = gameStateManager.sideJobState;
  
  return (
    <Stack spacing={2}>
      {sideJobSearches.map((sideJobSearch) => (
        <SideJobSearch
          key={sideJobSearch.id}
          gameStateManager={gameStateManager}
          sideJobSearch={sideJobSearch}
        />
      ))}
    </Stack>
  );
});

export default SideJobSearchesList;
