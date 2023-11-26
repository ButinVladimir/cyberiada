import { useTranslation } from 'react-i18next';
import React from 'react';
import { observer } from 'mobx-react-lite'
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { ValueDisplayer } from '@components/common';
import { stateContext } from '@contexts/index';
import { decimalFormatter } from '@helpers/formatters';

const CredibilityDisplayer = observer(() => {
  const gameStateManager = React.useContext(stateContext);
  const { t } = useTranslation();

  if (!gameStateManager) {
    return null;
  }

  return (
    <Tooltip
      title={t('general.credibility', { ns: 'common' })}
      arrow
    >
      <Typography
        variant="body1"
        noWrap
        component="div"
        color="HighlightText"
      >
        <ValueDisplayer getValue={() => decimalFormatter.format(gameStateManager.globalState.credibility)} />
      </Typography>
    </Tooltip>
  );
});

export default CredibilityDisplayer;