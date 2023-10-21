import React from 'react';
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline';
import { MenuPages } from '@state/common';
import TopBar from './components/TopBar';
import SideMenu from './components/SideMenu';
import CrewEditor from '@components/CrewEditor';

export default function MainPage() {
  const [sideMenuOpened, setSideMenuOpened] = React.useState<boolean>(true);
  const [selectedMenuPage, setSelectedMenuPage] = React.useState<MenuPages>(MenuPages.CrewEditor);

  const handleSelectMenuPage = (menuPage: MenuPages) => {
    setSelectedMenuPage(menuPage);
  };

  const handleToggleSideMenu = () => {
    setSideMenuOpened(prevValue => !prevValue);
  };

  const renderMainComponent = (): JSX.Element | null => {
    switch (selectedMenuPage) {
      case MenuPages.CrewEditor:
        return <CrewEditor />;
      default: 
        return null;
    }
  };

  return (
    <>
      <CssBaseline />
      <Container
        component="main"
        sx={{
          paddingTop: 10,
        }}
      >
        <TopBar
          onToggleSideMenu={handleToggleSideMenu}
        />

        <SideMenu
          opened={sideMenuOpened}
          selectedMenuPage={selectedMenuPage}
          onSelectMenuPage={handleSelectMenuPage}
        />

        { renderMainComponent() }

      </Container>
    </>
  );
}