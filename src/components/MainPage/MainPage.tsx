import React from 'react';
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline';
import { MenuPages } from '@state/common';
import TopBar from './TopBar';
import SideMenu from './SideMenu';
import { SIDE_MENU_WIDTH } from './constants';

export default function MainPage() {
  const [selectedMenuPage, setSelectedMenuPage] = React.useState<MenuPages>(MenuPages.Crew);

  const handleSelectMenuPage = (menuPage: MenuPages) => {
    setSelectedMenuPage(menuPage);
  };

  return (
    <>
      <CssBaseline />
      <TopBar />
      <SideMenu
        selectedMenuPage={selectedMenuPage}
        onSelectMenuPage={handleSelectMenuPage}
      />
      <Container
        component="main"
        maxWidth={false}
        sx={{
          marginLeft: `${SIDE_MENU_WIDTH}px`,
          width: `calc(100% - ${SIDE_MENU_WIDTH}px)`,
          paddingTop: 2,
        }}
      >
        Content
      </Container>
    </>
  );
}