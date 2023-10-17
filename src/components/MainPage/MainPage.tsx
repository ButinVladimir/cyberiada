import React from 'react';
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline';
import { MenuPages } from '@state/common';
import TopBar from './TopBar';
import SideMenu from './SideMenu';

export default function MainPage() {
  const [sideMenuOpened, setSideMenuOpened] = React.useState<boolean>(true);
  const [selectedMenuPage, setSelectedMenuPage] = React.useState<MenuPages>(MenuPages.Crew);

  const handleSelectMenuPage = (menuPage: MenuPages) => {
    setSelectedMenuPage(menuPage);
  };

  const handleToggleSideMenu = () => {
    setSideMenuOpened(prevValue => !prevValue);
  };

  return (
    <>
      <Container
        component="main"
        sx={{
          paddingTop: 10,
        }}
      >
      <CssBaseline />
      <TopBar
        onToggleSideMenu={handleToggleSideMenu}
      />
      <SideMenu
        opened={sideMenuOpened}
        selectedMenuPage={selectedMenuPage}
        onSelectMenuPage={handleSelectMenuPage}
      />

        Content
      </Container>
    </>
  );
}