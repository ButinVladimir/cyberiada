import i18n from 'i18next';
import React from 'react';
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import { stateContext } from '@contexts/index';
import { COLOR_NOT_SELECTED, COLOR_SELECTED, GAME_STATE_BUTTONS } from './constants';
import { GameSpeedState } from '@state/gameState';

const GameStateToggler = observer(() => {
  const gameStateManager = React.useContext(stateContext);

  const handleChangeState = React.useCallback((state: GameSpeedState) => {
    gameStateManager?.globalState.changeGameSpeedState(state);
  }, [gameStateManager?.globalState]);

  if (!gameStateManager) {
    return null;
  }

  return (
    <ButtonGroup sx={{ marginRight: 3 }}>
      {GAME_STATE_BUTTONS.map(({ state, icon: Icon, tooltipKey }) => (
        <Tooltip key={state} title={i18n.t(`topBar.${tooltipKey}`, { ns: 'ui' })} arrow>
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
