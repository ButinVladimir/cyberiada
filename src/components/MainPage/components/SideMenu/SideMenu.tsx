import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import SideSubMenu from './SideSubMenu';
import { MenuPages } from '@state/common';
import { SIDE_MENU_WIDTH, MENUS } from './constants';

interface ISideMenuProps {
  opened: boolean;
  selectedMenuPage: MenuPages;
  onSelectMenuPage: (menuPage: MenuPages) => void;
}

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