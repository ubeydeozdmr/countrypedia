import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid, GridItem, useColorMode } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function RootLayout(): React.ReactElement {
  const { colorMode } = useColorMode();

  const isDark = colorMode === 'dark';

  return (
    <Grid
      templateAreas={`"header header" "sidebar main"`}
      gridTemplateRows="100px calc(100vh - 100px)"
      gridTemplateColumns="75px calc(100vw - 75px)"
      overflow="hidden"
    >
      <GridItem
        gridArea="header"
        backgroundColor={isDark ? 'gray.900' : 'gray.100'}
      >
        <Header />
      </GridItem>
      <GridItem
        gridArea="sidebar"
        backgroundColor={isDark ? 'gray.900' : 'gray.100'}
      >
        <Sidebar />
      </GridItem>
      <GridItem gridArea="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
}
