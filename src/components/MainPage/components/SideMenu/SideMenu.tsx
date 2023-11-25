import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import SideSubMenu from './SideSubMenu';
import { MenuPages } from '@state/common';
import { MenuItems } from './types';
import { SIDE_MENU_WIDTH } from './constants';

interface ISideMenuProps {
  opened: boolean;
  selectedMenuPage: MenuPages;
  onSelectMenuPage: (menuPage: MenuPages) => void;
}

const MENUS: MenuItems = [
  {
    key: 0,
    items: [
      {
        icon: PersonIcon,
        value: MenuPages.Crew,
      },
      {
        icon: PersonIcon,
        value: MenuPages.CrewEditor,
      },    
    ],
  },
  {
    key: 1,
    divider: true,
  },
  {
    key: 2,
    items: [
      {
        icon: WorkIcon,
        value: MenuPages.Jobs,
      },
    ],
  },
];

export default function SideMenu(props: ISideMenuProps) {
  const {
    opened,
    selectedMenuPage,
    onSelectMenuPage,
  } = props;

  return (
    <Drawer
      anchor="left"
      open={opened}
      variant="persistent"
      sx={{
        width: SIDE_MENU_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDE_MENU_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar variant="dense" />
      <Divider />
      {MENUS.map(menuItem => menuItem.divider
        ? <Divider key={menuItem.key} />
        : (
          <SideSubMenu
            key={menuItem.key}
            items={menuItem.items!}
            selectedMenuPage={selectedMenuPage}
            onSelectMenuPage={onSelectMenuPage}
        />)
      )}
    </Drawer>
  );
}