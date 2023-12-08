import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MenuPages } from '@state/common';
import { SubMenuItem } from './types';

interface ISideMenuProps {
  items: SubMenuItem[];
  selectedMenuPage: MenuPages;
  onSelectMenuPage: (menuPage: MenuPages) => void;
}

export default function SideSubMenu(props: ISideMenuProps) {
  const {
    items,
    selectedMenuPage,
    onSelectMenuPage,
  } = props;
  const { t } = useTranslation();

  const handleSelectMenuPage = (menuPage: MenuPages) => () => {
    onSelectMenuPage(menuPage);
  };
  
  return (
    <List>
      {items.map(item => (
        <ListItem key={item.value} disablePadding>
          <ListItemButton
            selected={selectedMenuPage === item.value}
            onClick={handleSelectMenuPage(item.value)}
          >
            <ListItemIcon>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={t(`pages.${item.value}`, { ns: 'ui' })} />
          </ListItemButton>
        </ListItem>  
      ))}
    </List>
  );
}
