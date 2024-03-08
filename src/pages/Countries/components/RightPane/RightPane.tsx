import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  // IconButton,
  Image,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CountryType } from '../../../../types/Country';
import CountryInformationCard from './components/CountryInformationCard';
// import { HiOutlineHeart } from 'react-icons/hi2';

interface RightPaneProps {
  data: CountryType[];
  code: string | null;
}

export default function RightPane(props: RightPaneProps): React.ReactElement {
  const { data, code } = props;
  const [countryData, setCountryData] = useState<CountryType | null>(null);

  // useEffect(() => {
  //   if (code) {
  //     fetch(`https://restcountries.com/v3.1/alpha/${code}`)
  //       .then((response) => response.json())
  //       .then((data) => setCountryData(data[0]));
  //   }
  // }, [code]);

  useEffect(() => {
    if (code) {
      const country = data.find((country) => country.cca2 === code);
      setCountryData(country || null);
    }
  }, [code, data]);

  if (!code) {
    return <Box w="70%">Select a country to view details</Box>;
  }

  if (!countryData) {
    return <Box w="70%">Loading...</Box>;
  }

  return (
    // <Box w="70%" p={4} overflowY="auto" h="calc(100dvh - 100px)">
    <Box w="70%" p={4}>
      {countryData && (
        <Flex flexDirection="row">
          <Flex
            direction="column"
            alignItems="flex-start"
            w="50%"
            overflowY="auto"
            h="calc(100dvh - (100px + 1rem))"
            pr={4}
          >
            <CountryInformationCard
              title="Capital"
              data={countryData.capital}
            />
            <CountryInformationCard
              title="Area"
              data={[`${countryData.area.toLocaleString()} km²`]}
            />
            <CountryInformationCard
              title="Population"
              data={[countryData.population.toLocaleString()]}
            />
            <CountryInformationCard
              title="Region"
              data={[countryData.region]}
            />
            <CountryInformationCard
              title="Subregion"
              data={[countryData.subregion]}
            />
            <CountryInformationCard
              title="Top Level Domain"
              data={countryData.tld}
            />
            <CountryInformationCard
              title="Calling Code"
              data={
                code.toLowerCase() === 'us'
                  ? ['+1']
                  : [
                      `${(countryData.idd && countryData.idd?.root) || ''}` +
                        `${
                          (countryData.idd && countryData.idd?.suffixes) || ''
                        }`,
                    ]
              }
            />
            <CountryInformationCard
              title="Continent"
              data={countryData.continents}
            />
            {/* <CountryInformationCard
              title="Status"
              data={[countryData.status]}
            /> */}
            <CountryInformationCard
              title="UN Member"
              data={[`${countryData.unMember ? 'Yes' : 'No'}`]}
            />
            <CountryInformationCard
              title="Landlocked"
              data={[`${countryData.landlocked ? 'Yes' : 'No'}`]}
            />
            {/* <CountryInformationCard
              title="Google Maps"
              data={[countryData.maps.googleMaps]}
            /> */}
            {/* <CountryInformationCard
              title="Open Street Maps"
              data={[countryData.maps.openStreetMaps]}
            /> */}
            <CountryInformationCard
              title="FIFA Code"
              data={[countryData.fifa]}
            />
            <CountryInformationCard
              title="Car"
              data={[countryData.car.side, countryData.car.signs.join(', ')]}
            />
            <CountryInformationCard
              title="Languages"
              data={
                (countryData.languages &&
                  Object.values(countryData.languages)) ||
                []
              }
            />
            <CountryInformationCard
              title="Timezones"
              data={countryData.timezones}
            />
            <CountryInformationCard
              title="Borders"
              data={countryData.borders}
            />
            <CountryInformationCard
              title="Currencies"
              data={countryData.currencies.map(
                (currency) => `${currency.name} (${currency.symbol})`,
              )}
            />
            <CountryInformationCard
              title="Latitude and Longitude"
              data={countryData.latlng}
            />
            <CountryInformationCard
              title="Demonym"
              data={[countryData.demonyms.eng.m]}
            />
          </Flex>
          <Flex
            flexDirection="column"
            alignItems="center"
            w="50%"
            overflowY="auto"
            h="calc(100dvh - (100px + 1rem))"
            pr={4}
          >
            <Box>
              <Heading as="h2" size="lg" textAlign="center">
                {countryData.name.common}
              </Heading>
            </Box>
            <Box>
              <Heading as="h3" size="md" textAlign="center">
                {countryData.name.official}
              </Heading>
            </Box>
            <ButtonGroup mt={2}>
              <Button
                as="a"
                href={countryData.maps.googleMaps}
                target="_blank"
                rel="noreferrer"
              >
                Google Maps
              </Button>
              <Button
                as="a"
                href={countryData.maps.openStreetMaps}
                target="_blank"
                rel="noreferrer"
              >
                Open Street Maps
              </Button>
              {/* <IconButton
                aria-label="More info"
                icon={<HiOutlineHeart />}
                colorScheme="blue"
                // variant="ghost"
                // size="sm"
              /> */}
            </ButtonGroup>
            <Image
              src={countryData.flags.svg}
              alt={countryData.flags.alt || countryData.name.common}
              w="50%"
              borderRadius="md"
              mt={4}
              title={countryData.flags.alt || countryData.name.common}
            />
            <Image
              src={countryData.coatOfArms.svg}
              alt={countryData.demonyms.eng.m + ' coat of arms'}
              w="50%"
              mt={4}
              title={countryData.demonyms.eng.m + ' coat of arms'}
            />
          </Flex>
        </Flex>
      )}
    </Box>
  );
}
