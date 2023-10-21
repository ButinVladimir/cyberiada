import React from 'react';
import { observer } from 'mobx-react-lite'
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { stateContext } from '@/contexts'
import { formatTimeShort } from '@/helpers';

const speedSliderMarks = [
  {
    value: 1,
    label: 'x1',
  },
  {
    value: 16,
    label: 'x16'
  }
];

interface ITopBarProps {
  onToggleSideMenu: () => void;
}

const TopBar = observer((props: ITopBarProps) => {
  const {
    onToggleSideMenu,
  } = props;
  const theme = useTheme();
  const gameStateManager = React.useContext(stateContext);
  const [newSpeed, setNewSpeed] = React.useState<number>(1);

  if (!gameStateManager) {
    return null;
  }

  const formattedTime = formatTimeShort(gameStateManager.globalState.time);

  const handleChangeSpeed = (event: Event, value: number | number[]) => {
    setNewSpeed(value as number);
  };

  const handleApplySpeed = () => {
    gameStateManager.globalState.changeSpeed(newSpeed);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            onClick={onToggleSideMenu}
            size="large"
            edge="start"
            sx={{ marginRight: 1 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="body1"
            noWrap
            component="div"
          >
            Passed time: {formattedTime}
          </Typography>

          <Box sx={{ width: 200, ml: 6 }}>
            <Slider
              aria-label="Bonus time speed"
              step={1}
              min={1}
              max={16}
              marks={speedSliderMarks}
              color="secondary"
              value={newSpeed}
              onChange={handleChangeSpeed}
              onChangeCommitted={handleApplySpeed}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
});

export default TopBar;