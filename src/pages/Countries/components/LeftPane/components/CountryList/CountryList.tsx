import { Box } from '@chakra-ui/react';
import React from 'react';
import { CountryType } from '../../../../../../types/Country';
import { Link } from 'react-router-dom';
import CountryCardSmall from '../CountryCardSmall/CountryCardSmall';

interface CountryListProps {
  filteredData: CountryType[];
}

export default function CountryList(
  props: CountryListProps,
): React.ReactElement {
  const { filteredData } = props;

  return (
    <Box mt={4}>
      {filteredData.map((country: CountryType) => (
        <Link to={`/countries/?code=${country.cca2}`} key={country.cca2}>
          <CountryCardSmall key={country.cca2} country={country} />
        </Link>
      ))}
    </Box>
  );
}
