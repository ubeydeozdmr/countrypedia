import { CountryType, OldCountryType } from '../../../types/Country';

export const formatData = (data: OldCountryType[]): CountryType[] => {
  return data
    .slice()
    .sort((a: OldCountryType, b: OldCountryType) =>
      a.name.common.localeCompare(b.name.common),
    )
    .map((country: OldCountryType) => {
      if (!country.currencies) {
        return {
          ...country,
          currencies: [],
        };
      }
      const currencies = Object.entries(country.currencies).map(
        ([code, info]) => ({
          code,
          ...info,
        }),
      );

      return {
        ...country,
        currencies,
      };
    });
};
