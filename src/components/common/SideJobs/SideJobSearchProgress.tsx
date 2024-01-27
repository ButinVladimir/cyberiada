import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { ISideJobSearch } from '@state/sideJobs';
import { formatTimeShort, moneyFormatter } from '@helpers/formatters';

interface ISideJobSearchProgressProps {
  sideJobSearch: ISideJobSearch;
}

const SideJobSearchProgressBar = observer((props: ISideJobSearchProgressProps) => {
  const {
    sideJobSearch,
  } = props;

  return (
    <LinearProgress
      variant="determinate"
      value={sideJobSearch.completion * 100}
      sx={{
        height: 6,
        borderRadius: 1,
      }}
    />
  );
});

const SideJobSearchTimeLeft = observer((props: ISideJobSearchProgressProps) => {
  const {
    sideJobSearch,
  } = props;

  const { t } = useTranslation();

  const timeLeft = React.useMemo(() => formatTimeShort(
    Math.ceil(sideJobSearch.timeToFinish * (1 - sideJobSearch.completion))
  ), [sideJobSearch.timeToFinish, sideJobSearch.completion]);

  return (
    <Tooltip title={t('activity.timeUntilComplete', { ns: 'ui' })} arrow>
      <Typography variant="body2" color="text.secondary">
        {timeLeft}
      </Typography>
    </Tooltip>
  );
});

const SideJobSearchRedeemButton = observer((props: ISideJobSearchProgressProps) => {
  const {
    sideJobSearch,
  } = props;

  const { t } = useTranslation();

  const cost = React.useMemo(
    () => moneyFormatter.format(sideJobSearch.cost),
    [sideJobSearch.cost],
  );

  const handleClick = React.useCallback(() => {
    sideJobSearch.redeem();
  }, [sideJobSearch]);

  return (
    <Button
      variant="contained"
      disabled={!sideJobSearch.canBePaid}
      onClick={handleClick}
    >
      {t('activity.redeemFor', { ns: 'ui', cost })}
    </Button>
  );
});


const SideJobSearchProgress = observer((props: ISideJobSearchProgressProps) => {
  const {
    sideJobSearch,
  } = props;

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 2,
    }}>
      <Box sx={{
        width: '100%',
        marginRight: 1,
        flex: '1 1 auto',
      }}>
        <SideJobSearchProgressBar sideJobSearch={sideJobSearch} />
      </Box>

      <Box sx={{
        minWidth: 70,
        marginRight: 1,
        flex: '0 0 auto',
      }}>
        <SideJobSearchTimeLeft sideJobSearch={sideJobSearch} />
      </Box>

      <Box sx={{
        minWidth: 70,
        flex: '0 0 auto',
      }}>
        <SideJobSearchRedeemButton sideJobSearch={sideJobSearch} />
      </Box>
    </Box>
  );
});

export default SideJobSearchProgress;
