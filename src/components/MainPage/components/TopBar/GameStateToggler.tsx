import { useTranslation } from 'react-i18next';
import React from 'react';
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import { IComponentWithGameStateManagerProps } from '@components/common';
import { GameSpeedState } from '@state/common';
import { COLOR_NOT_SELECTED, COLOR_SELECTED, GAME_STATE_BUTTONS } from './constants';

const GameStateToggler = observer((props: IComponentWithGameStateManagerProps) => { 
  const { gameStateManager } = props;
  const { t } = useTranslation();

  const handleChangeState = React.useCallback((state: GameSpeedState) => {
    gameStateManager.globalState.changeGameSpeedState(state);
  }, [gameStateManager]);

  return (
    <ButtonGroup sx={{ marginRight: 3 }}>
      {GAME_STATE_BUTTONS.map(({ state, icon: Icon, tooltipKey }) => (
        <Tooltip key={state} title={t(`topBar.${tooltipKey}`, { ns: 'ui' })} arrow>
          <IconButton
            color={gameStateManager.globalState.gameSpeedState === state ? COLOR_SELECTED : COLOR_NOT_SELECTED}
            onClick={() => { handleChangeState(state) }}
            size="small"
            edge="start"
          >
            <Icon />
          </IconButton>
        </Tooltip>
      ))}
    </ButtonGroup>
  );
});

export default GameStateToggler;
