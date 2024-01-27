import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import { IComponentWithGameStateManagerProps } from '@components/common';

type ChangeEventHandler = (event: Event, value: number | number[]) => void;

const BonusTimeSpeedInput = observer((props: IComponentWithGameStateManagerProps) => {
  const { gameStateManager } = props;
  const { t } = useTranslation();

  const handleChangeBonusTimeSpeed = React.useCallback<ChangeEventHandler>((event, value) => {
    gameStateManager.settingsState.bonusTimeSpeed = value as number;
  }, [gameStateManager]);

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
