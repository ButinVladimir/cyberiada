import { useTranslation } from 'react-i18next';
import React from 'react';
import { observer } from 'mobx-react-lite'
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { ValueDisplayer } from '@components/common';
import { stateContext } from '@contexts/index';
import { moneyFormatter } from '@helpers/formatters';

const MoneyDisplayer = observer(() => {
  const gameStateManager = React.useContext(stateContext);
  const { t } = useTranslation();

  if (!gameStateManager) {
    return null;
  }

  return (
    <Tooltip
      title={t('general.money', { ns: 'common' })}
      arrow
    >
      <Typography
        variant="body1"
        noWrap
        component="div"
        sx={{ marginRight: 3 }}
      >
        <ValueDisplayer getValue={() => moneyFormatter.format(gameStateManager.globalState.money)} />
      </Typography>
    </Tooltip>
  );
});

export default MoneyDisplayer;