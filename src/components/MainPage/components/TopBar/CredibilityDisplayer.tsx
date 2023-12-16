import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite'
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { ValueDisplayer } from '@components/common';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import { decimalFormatter } from '@helpers/formatters';

const CredibilityDisplayer = observer(() => {
  const gameStateManager = getGameStateManagerInstance();
  const { t } = useTranslation();

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