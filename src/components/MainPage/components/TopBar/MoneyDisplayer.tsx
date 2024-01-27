import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite'
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { IComponentWithGameStateManagerProps } from '@components/common';
import { moneyFormatter } from '@helpers/formatters';

const MoneyDisplayer = observer((props: IComponentWithGameStateManagerProps) => {
  const { gameStateManager } = props;
  const { t } = useTranslation();

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
        {moneyFormatter.format(gameStateManager.globalState.money)}
      </Typography>
    </Tooltip>
  );
});

export default MoneyDisplayer;