export const API_BASE_URL = 'https://countries.dev';

export const API_ENDPOINTS = {
  all: 'countries',
  alpha: 'alpha',
  capital: 'capital',
  currency: 'currency',
  demonym: 'demonym',
  language: 'lang',
  name: 'name',
  region: 'region',
  subregion: 'subregion',
};

export const API_OVERVIEW_FIELDS = ['name', 'alpha3Code', 'flags'].join(',');

// prettier-ignore
export const ERROR_NOT_FOUND = "&#9888 We couldn't find what you're looking for. Try another query.";
// prettier-ignore
export const ERROR_BAD_REQUEST = "&#9888 We had a problem trying to pull the required data. Please try again."
