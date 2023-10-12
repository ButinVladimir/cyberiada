import React from 'react';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { StateContext } from '@components/StateContext'
import { GlobalState } from '@/state/gameState';
import { formatTimeShort } from '@helpers';
import { useRemoteState } from '@hooks';
import { Events } from '@/state/common';

interface ITopBarProps {
  onToggleMenu: () => void;
}

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

export function TopBar(props: ITopBarProps) {
  const {
    onToggleMenu,
  } = props;
  const gameStateManager = React.useContext(StateContext);
  const globalState = useRemoteState<GlobalState>('globalState');
  const [hasInited, setHasInited] = React.useState<boolean>(false);
  const [newSpeed, setNewSpeed] = React.useState<number>(1);

  React.useEffect(() => {
    if (globalState && !hasInited) {
      setNewSpeed(globalState.speed);
      setHasInited(true);
    }
  }, [globalState, hasInited]);

  if (!globalState) {
    return null;
  }

  const formattedTime = formatTimeShort(globalState.time);

  const handleChangeSpeed = (event: Event, value: number | number[]) => {
    setNewSpeed(value as number);
  };

  const handleApplySpeed = () => {
    gameStateManager?.changeSpeed(newSpeed);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="Toggle menu"
          color="inherit"
          onClick={onToggleMenu}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="body1"
          noWrap
          component="div"
          sx={{ ml: 4 }}
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
    </AppBar>
  )
}