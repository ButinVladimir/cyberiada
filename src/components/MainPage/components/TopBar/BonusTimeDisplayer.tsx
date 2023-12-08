import { useTranslation } from 'react-i18next';
import React from 'react';
import { observer } from 'mobx-react-lite'
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { ValueDisplayer } from '@components/common';
import { stateContext } from '@contexts/index';
import { formatTimeShort } from '@helpers/formatters';

const BonusTimeDisplayer = observer(() => {
  const gameStateManager = React.useContext(stateContext);
  const { t } = useTranslation();

  if (!gameStateManager) {
    return null;
  }

  const getFormattedBonusTime = () => formatTimeShort(gameStateManager.globalState.bonusTime);

  return (
    <Tooltip
      title={t('topBar.bonusTime', { ns: 'ui' })}
      arrow
    >
      <Typography
        variant="body1"
        noWrap
        component="div"
        sx={{ marginRight: 3 }}
      >
        <ValueDisplayer getValue={getFormattedBonusTime} />
      </Typography>
    </Tooltip>
  );
});

export default BonusTimeDisplayer;