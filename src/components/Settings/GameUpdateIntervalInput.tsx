import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import { IComponentWithGameStateManagerProps } from '@components/common';

type ChangeEventHandler = (event: Event, value: number | number[]) => void;

const GameUpdateIntervalInput = observer((props: IComponentWithGameStateManagerProps) => {
  const { gameStateManager } = props;
  const { t } = useTranslation();

  const handleChangeGameUpdateInterval = React.useCallback<ChangeEventHandler>((event, value) => {
    gameStateManager.settingsState.setGameUpdateInterval(value as number);
  }, [gameStateManager]);

  const { gameUpdateInterval }= gameStateManager.settingsState;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Typography gutterBottom>
        {t('settings.gameUpdateInterval', { ns: 'ui' })}
      </Typography>

      <Slider
        value={gameUpdateInterval}
        step={100}
        min={100}
        max={10000}
        valueLabelDisplay="auto"
        onChange={handleChangeGameUpdateInterval}
      />
    </Grid>
  );
});

export default GameUpdateIntervalInput;
