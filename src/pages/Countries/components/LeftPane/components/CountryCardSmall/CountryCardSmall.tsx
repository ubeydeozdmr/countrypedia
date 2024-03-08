import React from 'react';
import {
  Box,
  Card,
  Heading,
  IconButton,
  // Text,
  useColorMode,
} from '@chakra-ui/react';
import { CountryType } from '../../../../../../types/Country';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import { useQuery } from '../../../../../../hooks/useQuery';
import useSaveCountries from '../../../../../../hooks/useSaveCountries';

interface CountryProps {
  country: CountryType;
}

export default function CountryCardSmall(
  props: CountryProps,
): React.ReactElement {
  const { country } = props;

  const { colorMode } = useColorMode();
  const { saveCountry, isCountrySaved, deleteSavedCountry } =
    useSaveCountries();
  const query = useQuery();
  const isDark = colorMode === 'dark';
  const isSelectedCountry = query.get('code') === country.cca2;

  function toggleFavorite() {
    if (isCountrySaved(country.cca3)) {
      deleteSavedCountry(country.cca3);
    } else {
      saveCountry(country.cca3);
    }
  }

  return (
    <Card
      key={country.cca3}
      px={4}
      py={2}
      my={4}
      boxShadow="base"
      display="flex"
      flexDirection="row"
      alignItems="center"
      borderRadius="md"
      border="2px solid transparent"
      borderColor={
        isSelectedCountry ? (isDark ? 'blue.300' : 'blue.600') : 'transparent'
      }
      transition="all 0.2s ease"
      _hover={{
        backgroundColor: isDark ? 'gray.600' : 'gray.100',
      }}
    >
      <Box
        w={12}
        h={8}
        borderRadius="md"
        backgroundImage={`url(${country.flags.png})`}
        backgroundSize="cover"
        backgroundPosition="center"
      ></Box>
      {/* <Image
          src={country.flags.png}
          alt={country.flags.alt || country.name.common}
          w="100%"
          h="100%"
          borderRadius="md"
        /> */}
      {/* </Box> */}
      <Heading as="p" ml={4} fontSize="lg" fontWeight="medium">
        {country.name.common}
      </Heading>
      {/* <Text ml="auto" fontSize="lg" fontWeight="medium">
        {country.capital}
      </Text> */}
      <IconButton
        aria-label="More info"
        icon={isCountrySaved(country.cca3) ? <HiHeart /> : <HiOutlineHeart />}
        colorScheme="blue"
        variant="ghost"
        size="sm"
        ml="auto"
        onClick={toggleFavorite}
      />
    </Card>
  );
}
