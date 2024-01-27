import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import { MenuPages } from '@state/common';
import { MenuItems } from './types';

export const SIDE_MENU_WIDTH = 300;

export const MENUS: MenuItems = [
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
        value: MenuPages.SideJobs,
      },
    ],
  },
  {
    key: 3,
    divider: true,
  },
  {
    key: 4,
    items: [
      {
        icon: SettingsIcon,
        value: MenuPages.Settings,
      }
    ],
  }
];
