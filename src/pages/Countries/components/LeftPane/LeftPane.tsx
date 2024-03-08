import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { CountryType } from '../../../../types/Country';
import { filterAndSortCountries } from './utils/filterAndSortCountries';
import CountryList from './components/CountryList/CountryList';
import SearchInput from './components/SearchInput/SearchInput';
import FilteringPanel from './components/FilteringPanel/FilteringPanel';
import useSaveCountries from '../../../../hooks/useSaveCountries';
// import MemoizedCountryList from './components/CountryList/CountryList';

interface LeftPaneProps {
  data: CountryType[];
}

export default function LeftPane(props: LeftPaneProps): React.ReactElement {
  const { data } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteringPanelOpen, setFilteringPanelOpen] = useState(false);
  const [showOnlyFavourites, setShowOnlyFavourites] = useState(false);
  const { getSavedCountries } = useSaveCountries();
  const savedCountries = getSavedCountries();

  function searchInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function filteringPanelOpenHandler() {
    setFilteringPanelOpen((prev: boolean) => !prev);
  }

  function showOnlyFavouritesHandler(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setShowOnlyFavourites(event.target.checked);
  }

  const filteredData = filterAndSortCountries(data, searchQuery, {
    showOnlyFavourites,
    savedCountries,
  });

  return (
    <Box w="30%" p={4} overflowY="auto" h="calc(100dvh - 100px)">
      <SearchInput
        searchInputHandler={searchInputHandler}
        filteringPanelOpenHandler={filteringPanelOpenHandler}
      />
      {filteringPanelOpen && (
        <FilteringPanel
          showOnlyFavourites={showOnlyFavourites}
          showOnlyFavouritesHandler={showOnlyFavouritesHandler}
        />
      )}
      <CountryList filteredData={filteredData} />
    </Box>
  );
}
