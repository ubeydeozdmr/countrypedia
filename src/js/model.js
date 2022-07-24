import { API_ROUTE } from './config';

export const state = {
  status: undefined,
  countries: undefined,
  currentCountry: undefined,
  savedCountries: undefined,
  savedHashs: undefined,
};

export const getData = async function (keyword) {
  try {
    const res = await fetch(API_ROUTE + keyword);
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
