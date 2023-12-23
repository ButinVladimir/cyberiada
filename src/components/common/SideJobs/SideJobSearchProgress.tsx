import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { ISideJobSearch } from '@state/sideJobs';
import { formatTimeShort } from '@helpers/formatters';

interface ISideJobSearchProgressProps {
  sideJobSearch: ISideJobSearch;
}

const SideJobSearchProgress = observer((props: ISideJobSearchProgressProps) => {
  const {
    sideJobSearch,
  } = props;

  const timeLeft = formatTimeShort(
    Math.ceil(sideJobSearch.timeToFinish * (1 - sideJobSearch.completion))
  );

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', marginRight: 1 }}>
        <LinearProgress variant="determinate" value={sideJobSearch.completion * 100}  />
      </Box>

      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {timeLeft}
        </Typography>
      </Box>
    </Box>
  );
});

export default SideJobSearchProgress;
