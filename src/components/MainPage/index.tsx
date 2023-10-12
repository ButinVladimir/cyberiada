import React from 'react';
import Container from '@mui/material/Container'
import { TopBar } from '@components/TopBar';

export function MainPage() {
  const [showMenu, setShowMenu] = React.useState<boolean>(true);

  const handleToggleMenu = () => {
    setShowMenu(prevValue => !prevValue);
  };

  return (
    <>
      <TopBar onToggleMenu={handleToggleMenu} />
      <Container maxWidth="xl">
        Blablabla
      </Container>
    </>
  );
}