import i18n from 'i18next';
import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { crewEditorCallbacksContext } from '../../crewEditorCallbacksContext';

export default function TopPanel() {
  const { startCreatingMember } = React.useContext(crewEditorCallbacksContext);

  const handleStartCreatingMember = () => {
    startCreatingMember();
  };
  
  return (
    <ButtonGroup sx={{ marginBottom: 2 }}>
      <Button
        type="button"
        variant="contained"
        onClick={handleStartCreatingMember}
      >
        {i18n.t('crewEditor.createCrewMember', { ns: 'ui' })}
      </Button>
    </ButtonGroup>
  );
}
