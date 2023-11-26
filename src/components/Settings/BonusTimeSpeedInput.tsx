import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import { stateContext } from '@/contexts';
import { Typography } from '@mui/material';

type ChangeEventHandler = (event: Event, value: number | number[]) => void;

const BonusTimeSpeedInput = observer(() => {
  const gameStateManager = React.useContext(stateContext);
  const { t } = useTranslation();

  const handleChangeBonusTimeSpeed = React.useCallback<ChangeEventHandler>((event, value) => {
    if (gameStateManager) {
      gameStateManager.settingsState.setBonusTimeSpeed(value as number);
    }
  }, [gameStateManager]);

  if (!gameStateManager) {
    return;
  }

  const { bonusTimeSpeed }= gameStateManager.settingsState;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Typography gutterBottom>
        {t('settings.bonusTimeSpeed', { ns: 'ui' })}
      </Typography>

      <Slider
        value={bonusTimeSpeed}
        step={1}
        min={2}
        max={20}
        valueLabelDisplay="auto"
        onChange={handleChangeBonusTimeSpeed}
      />
    </Grid>
  );
});

export default BonusTimeSpeedInput;
