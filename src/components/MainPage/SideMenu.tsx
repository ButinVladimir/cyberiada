import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import PersonIcon from '@mui/icons-material/Person';
import SideSubMenu from './SideSubMenu';
import { MenuPages } from '@state/common';
import { MenuItems } from './types';
import { SIDE_MENU_WIDTH } from './constants';

interface ISideMenuProps {
  selectedMenuPage: MenuPages;
  onSelectMenuPage: (menuPage: MenuPages) => void;
}

const Menus: MenuItems = {
  items: [
    {
      items: [
        {
          icon: PersonIcon,
          text: 'Crew',
          value: MenuPages.Crew,
        },
        {
          icon: PersonIcon,
          text: 'Crew editor',
          value: MenuPages.CrewEditor,
        },    
      ],

    },
    {
      divider: true,
    }
  ]
};

export default function SideMenu(props: ISideMenuProps) {
  const {
    selectedMenuPage,
    onSelectMenuPage,
  } = props;

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        width: SIDE_MENU_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDE_MENU_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Divider />
      {Menus.items.map(menuItem => menuItem.divider
        ? <Divider />
        : (
          <SideSubMenu
            items={menuItem.items!}
            selectedMenuPage={selectedMenuPage}
            onSelectMenuPage={onSelectMenuPage}
        />)
      )}
    </Drawer>
  );
}