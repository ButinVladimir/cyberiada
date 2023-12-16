import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite'
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { ValueDisplayer } from '@components/common';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import { formatTimeShort } from '@helpers/formatters';

const BonusTimeDisplayer = observer(() => {
  const gameStateManager = getGameStateManagerInstance();
  const { t } = useTranslation();

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