import { Box, Flex, Heading, IconButton, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import '@fontsource-variable/plus-jakarta-sans';
// import { HiMoon, HiSun } from 'react-icons/hi2';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Header(): React.ReactElement {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      alignItems="center"
      h="100%"
      justifyContent="space-between"
    >
      <Link to="/">
        <Heading
          as="h1"
          size="xl"
          ml="75px"
          // mb={2}
          // p={4}
          px={4}
          py={1}
          fontWeight="900"
          letterSpacing="-1px"
        >
          Countrypedia
        </Heading>
        <Heading
          as="h2"
          size="md"
          ml="75px"
          // mb={2}
          // p={4}
          px={4}
          py={1}
          fontWeight="400"
          letterSpacing="-.8px"
        >
          {/* A simple country information app */}
          Development Preview for Version 3
        </Heading>
      </Link>
      <Box>
        <IconButton
          aria-label="Theme Toggle"
          // icon={colorMode === 'light' ? <HiMoon /> : <HiSun />}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          size="lg"
          onClick={toggleColorMode}
          mr={4}
          variant={colorMode === 'light' ? 'solid' : 'ghost'}
        />
      </Box>
    </Flex>
  );
}
