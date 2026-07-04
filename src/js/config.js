export const API_BASE_URL = 'https://countries.dev';

export const API_ENDPOINTS = {
  countries: 'countries',
  name: 'name',
  alpha: 'alpha',
};

export const COUNTRY_LIST_FIELDS = [
  'name',
  'alpha2Code',
  'alpha3Code',
  'flag',
  'flags',
].join(',');

// prettier-ignore
export const ERROR_NOT_FOUND = "&#9888 We couldn't find what you're looking for. Try another query.";
// prettier-ignore
export const ERROR_BAD_REQUEST = "&#9888 We had a problem trying to pull the required data. Please try again."
