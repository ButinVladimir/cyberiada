import { useTranslation } from 'react-i18next';
import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { crewEditorCallbacksContext } from '../../crewEditorCallbacksContext';

export default function TopPanel() {
  const { startCreatingMember } = React.useContext(crewEditorCallbacksContext);
  const { t } = useTranslation();

  const handleStartCreatingMember = () => {
    startCreatingMember();
  };
  
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h3" gutterBottom>
        {t(`pages.crewEditor`, { ns: 'ui'})}
      </Typography>

      <ButtonGroup>
        <Button
          type="button"
          variant="contained"
          onClick={handleStartCreatingMember}
        >
          {t('crewEditor.createCrewMember', { ns: 'ui' })}
        </Button>
      </ButtonGroup>
    </Box>
  );
}
