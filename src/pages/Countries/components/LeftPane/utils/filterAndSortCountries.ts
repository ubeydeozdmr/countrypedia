import { CountryType } from '../../../../../types/Country';

interface Filters {
  showOnlyFavourites: boolean;
  savedCountries: string[];
}

export const filterAndSortCountries = (
  data: CountryType[],
  searchQuery: string,
  filters?: Partial<Filters>,
) => {
  return data
    .slice()
    .sort((a, b) => {
      if (searchQuery === '') {
        return a.name.common.localeCompare(b.name.common);
      }

      const nameA = a.name.common.toLowerCase();
      const nameB = b.name.common.toLowerCase();

      if (nameA.startsWith(searchQuery) && !nameB.startsWith(searchQuery)) {
        return -1;
      } else if (
        !nameA.startsWith(searchQuery) &&
        nameB.startsWith(searchQuery)
      ) {
        return 1;
      } else {
        return nameA.localeCompare(nameB);
      }
    })
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((country) => {
      if (
        filters?.showOnlyFavourites &&
        filters.savedCountries &&
        filters.savedCountries.length > 0
      ) {
        return filters.savedCountries.includes(country.cca3);
      }
      return true;
    });
};
