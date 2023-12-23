import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite'
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { IComponentWithGameStateManagerProps } from '@components/common';
import { formatTimeShort } from '@helpers/formatters';

const BonusTimeDisplayer = observer((props: IComponentWithGameStateManagerProps) => {
  const { gameStateManager } = props;
  const { t } = useTranslation();

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
        {formatTimeShort(gameStateManager.globalState.bonusTime)}
      </Typography>
    </Tooltip>
  );
});

export default BonusTimeDisplayer;