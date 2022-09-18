import { API_ROUTE } from './config';

export const state = {
  status: undefined,
  countries: undefined,
  currentCountry: undefined,
  savedCountries: undefined,
  savedHashs: undefined,
  coordinateY: undefined,
  lastSearch: undefined,
};

/**
 * @param {string} route A keyword which will be added to API_ROUTE static string
 * @returns fetched data array
 */
export const getData = async function (route) {
  try {
    const res = await fetch(API_ROUTE + route);
    state.status = res.status;
    if (!res.ok) return;
    const data = await res.json();
    if (!state.countries) state.countries = data;
    return data;
  } catch (err) {
    console.error(err);
    state.status = err.message;
    console.log(state.status); // Failed to fetch
  }
};
