import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { MenuPages } from '@state/common';

export interface SubMenuItem {
  icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">> & { muiName: string; };
  text: string;
  value: MenuPages;
}

export interface MenuItem {
  divider?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItems {
  items: MenuItem[];
}