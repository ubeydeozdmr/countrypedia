// import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import React from 'react';
import {
  HiBookmark,
  HiCog6Tooth,
  HiInformationCircle,
  // HiHome,
  HiMap,
  HiMiniChartPie,
  // HiMoon,
  HiPuzzlePiece,
  HiSquares2X2,
  HiUser,
  // HiSun,
} from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar(): React.ReactElement {
  const { colorMode } = useColorMode();

  const { pathname } = useLocation();

  const isCountries =
    pathname === '/' ||
    pathname === '/?code=' ||
    pathname === '/countries' ||
    pathname === '/countries/' ||
    pathname === '/countries/?code=';

  const isMap = pathname === '/map' || pathname === '/map/';

  return (
    <Flex
      flexDirection={{ base: 'row', md: 'column' }}
      p={2}
      direction="column"
      gap={2}
      alignItems="center"
      // justifyContent={{ base: 'space-between', md: 'flex-start' }}
      justifyContent="space-between"
      h="calc(100vh - 100px)"
    >
      <Flex flexDirection="column" gap={2}>
        <Link to="/countries">
          <Box>
            <Tooltip label="Countries" aria-label="Countries">
              <IconButton
                aria-label="Home"
                // icon={<HiHome />}
                icon={<HiSquares2X2 />}
                size="lg"
                colorScheme={isCountries ? 'blue' : 'gray'}
                variant={
                  colorMode === 'light' || isCountries ? 'solid' : 'ghost'
                }
              />
            </Tooltip>
          </Box>
        </Link>
        <Link to="/map">
          <Box>
            <Tooltip label="Map" aria-label="Map">
              <IconButton
                aria-label="Map"
                icon={<HiMap />}
                size="lg"
                colorScheme={isMap ? 'blue' : 'gray'}
                variant={colorMode === 'light' || isMap ? 'solid' : 'ghost'}
              />
            </Tooltip>
          </Box>
        </Link>
        <Link to="/collections">
          <Box>
            <Tooltip label="Collections" aria-label="Collections">
              <IconButton
                aria-label="Collections"
                icon={<HiBookmark />}
                size="lg"
                variant={colorMode === 'light' ? 'solid' : 'ghost'}
              />
            </Tooltip>
          </Box>
        </Link>
        <Link to="/games">
          <Box>
            <Tooltip label="Games" aria-label="Games">
              <IconButton
                aria-label="Games"
                icon={<HiPuzzlePiece />}
                size="lg"
                variant={colorMode === 'light' ? 'solid' : 'ghost'}
              />
            </Tooltip>
          </Box>
        </Link>
        <Link to="/stats">
          <Box>
            <Tooltip label="Stats" aria-label="Stats">
              <IconButton
                aria-label="Stats"
                icon={<HiMiniChartPie />}
                size="lg"
                variant={colorMode === 'light' ? 'solid' : 'ghost'}
              />
            </Tooltip>
          </Box>
        </Link>
      </Flex>
      <Flex flexDirection="column" gap={2}>
        {/* <Box>
          <Tooltip label="Profile" aria-label="Profile">
            <IconButton
              aria-label="Theme Toggle"
              icon={colorMode === 'light' ? <HiMoon /> : <HiSun />}
              size="lg"
              onClick={toggleColorMode}
              variant={colorMode === 'light' ? 'solid' : 'ghost'}
            />
          </Tooltip>
        </Box> */}
        <Link to="/profile">
          <Box>
            <Tooltip label="Profile" aria-label="Profile">
              <IconButton
                aria-label="Profile"
                icon={<HiUser />}
                size="lg"
                variant={colorMode === 'light' ? 'solid' : 'ghost'}
              />
            </Tooltip>
          </Box>
        </Link>
        <Link to="/about">
          <Box>
            <Tooltip label="About" aria-label="About">
              <IconButton
                aria-label="About"
                icon={<HiInformationCircle />}
                size="lg"
                variant={colorMode === 'light' ? 'solid' : 'ghost'}
              />
            </Tooltip>
          </Box>
        </Link>
        <Link to="/settings">
          <Box>
            <Tooltip label="Settings" aria-label="Settings">
              <IconButton
                aria-label="Settings"
                icon={<HiCog6Tooth />} // HiAdjustments
                size="lg"
                variant={colorMode === 'light' ? 'solid' : 'ghost'}
              />
            </Tooltip>
          </Box>
        </Link>
      </Flex>
    </Flex>
  );
}
