import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite'
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import GameStateToggler from './GameStateToggler';
import BonusTimeDisplayer from './BonusTimeDisplayer';
import MoneyDisplayer from './MoneyDisplayer';
import CredibilityDisplayer from './CredibilityDisplayer';

interface ITopBarProps {
  onToggleSideMenu: () => void;
}

const TopBar = observer((props: ITopBarProps) => {
  const {
    onToggleSideMenu,
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  const gameStateManager = getGameStateManagerInstance();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Container>
        <Toolbar disableGutters variant="dense">
          <Tooltip title={t('topBar.menu', { ns: 'ui' })} arrow>
            <IconButton
              color="inherit"
              onClick={onToggleSideMenu}
              size="small"
              sx={{ marginRight: 3 }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <GameStateToggler gameStateManager={gameStateManager} />

          <BonusTimeDisplayer gameStateManager={gameStateManager} />

          <MoneyDisplayer gameStateManager={gameStateManager} />

          <CredibilityDisplayer gameStateManager={gameStateManager} />
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default TopBar;