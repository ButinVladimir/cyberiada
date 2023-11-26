import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { stateContext } from '@/contexts';

type ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;

const DeveloperModeToggle = observer(() => {
  const gameStateManager = React.useContext(stateContext);
  const { t } = useTranslation();

  const handleToggleDevMode = React.useCallback<ChangeEventHandler>((event, checked) => {
    if (gameStateManager) {
      gameStateManager.settingsState.toggleDeveloperMode(checked);
    }
  }, [gameStateManager]);

  if (!gameStateManager) {
    return;
  }

  const { developerModeEnabled }= gameStateManager.settingsState;

  return (
    <Grid item xs={12}>
      <FormGroup>
        <FormControlLabel 
          label={t('settings.developerModeEnabled', { ns: 'ui' })}
          control={
            <Checkbox 
              onChange={handleToggleDevMode}
              checked={developerModeEnabled}
            />
          }
        />
      </FormGroup>
    </Grid>
  );
});

export default DeveloperModeToggle;
