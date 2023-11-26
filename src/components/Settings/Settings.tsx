import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LanguageSelector from './LanguageSelector';
import GameUpdateIntervalInput from './GameUpdateIntervalInput';
import BonusTimeSpeedInput from './BonusTimeSpeedInput';
import DeveloperModeToggle from './DeveloperModeToggle';

const Settings = observer(() => {
  const { t } = useTranslation();

  return (
    <Grid container rowSpacing={2} columnSpacing={4}>
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom>
          {t(`pages.settings`, { ns: 'ui'})}
        </Typography>
      </Grid>

      <LanguageSelector />

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <GameUpdateIntervalInput />
      <BonusTimeSpeedInput />

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <DeveloperModeToggle />
    </Grid>
  );
});

export default Settings;
