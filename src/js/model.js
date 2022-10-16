import { API_ROUTE_ALL, API_ROUTE_CODE, API_ROUTE_NAME } from './config';

export const state = {
  data: null,
  cache: {
    status: null,
    countries: null,
    currentCountry: null,
    filteredCountries: null,
    lastSearch: null,
    url: {
      old: null,
      new: null,
    },
  },
};

export const urlSwitcher = function (hash) {
  state.cache.url.old = state.cache.url.new;
  state.cache.url.new = hash;
};

const initData = function () {
  try {
    state.data = {
      version: 1,
      theme: 'light',
      saved: [],
    };
    localStorage.setItem('data', JSON.stringify(state.data));
  } catch (err) {
    console.error(err);
  }
};

export const getLocalData = function () {
  if (localStorage.getItem('data')) {
    const checkObj = JSON.parse(localStorage.getItem('data'));
    switch (checkObj.version) {
      case 1:
        state.data = checkObj;
        break;
      default:
        localStorage.clear();
        initData();
        break;
    }
  } else initData();
};

export const getAllCountries = async function () {
  try {
    const res = await fetch(API_ROUTE_ALL);
    state.cache.status = res.status;
    if (!res.ok) return;
    state.cache.countries = await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const getCountry = async function (cca3) {
  try {
    const res = await fetch(API_ROUTE_CODE + cca3);
    state.cache.status = res.status;
    if (!res.ok) return;
    state.cache.currentCountry = await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const getSearchResults = async function (query) {
  try {
    const res = await fetch(API_ROUTE_NAME + query);
    state.cache.status = res.status;
    if (!res.ok) return;
    state.cache.filteredCountries = await res.json();
  } catch (err) {
    console.error(err);
  }
};
