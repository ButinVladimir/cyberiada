import React from 'react';
import { observer } from 'mobx-react-lite';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { stateContext } from '@/contexts';

const TopPanel = observer(() => {
  const gameStateManager = React.useContext(stateContext);

  if (!gameStateManager) {
    return;
  }

  const handleAddCrewMember = () => {
    gameStateManager.crewState.addCrewMember();
  };
  
  return (
    <ButtonGroup sx={{ marginBottom: 2 }}>
      <Button
        type="button"
        variant="contained"
        onClick={handleAddCrewMember}
      >
        Create crew member
      </Button>
    </ButtonGroup>
  );
});

export default TopPanel;
