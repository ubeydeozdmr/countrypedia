import {
  API_ROUTE_ALL,
  API_ROUTE_CAPITAL,
  API_ROUTE_CODE,
  API_ROUTE_CODELIST,
  API_ROUTE_CURRENCY,
  API_ROUTE_DEMONYM,
  API_ROUTE_LANG,
  API_ROUTE_NAME,
  API_ROUTE_REGION,
  API_ROUTE_SUBREGION,
  API_ROUTE_TRANSLATION,
} from './config';

export const state = {
  data: null,
  cache: {
    status: null,
    countries: null,
    currentCountry: null,
    filteredCountries: null,
    lastSearch: null,
    penultimateSearch: null,
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
    if (cca3 === 'BRN') state.cache.currentCountry.shift(); // BRN (Brunei) is special case

    if (
      state.cache.currentCountry[0].borders &&
      state.cache.currentCountry[0].borders.length > 0
    ) {
      const res2 = await fetch(
        API_ROUTE_CODELIST + state.cache.currentCountry[0].borders.join(',')
      );
      if (!res2.ok) return;
      const arrayTemp = await res2.json();
      const arrayTemp2 = [];
      arrayTemp.forEach(item => {
        arrayTemp2.push(item.name.common);
      });
      arrayTemp2.sort();
      state.cache.currentCountry[0].borders = arrayTemp2;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getSearchResults = async function (query, selectedIndex) {
  try {
    let res;
    switch (selectedIndex) {
      case 0:
        res = await fetch(API_ROUTE_NAME + query);
        break;
      case 1:
        res = await fetch(API_ROUTE_CODE + query);
        break;
      case 2:
        res = await fetch(API_ROUTE_CODELIST + query);
        break;
      case 3:
        res = await fetch(API_ROUTE_CAPITAL + query);
        break;
      case 4:
        res = await fetch(API_ROUTE_CURRENCY + query);
        break;
      case 5:
        res = await fetch(API_ROUTE_DEMONYM + query);
        break;
      case 6:
        res = await fetch(API_ROUTE_LANG + query);
        break;
      case 7:
        res = await fetch(API_ROUTE_REGION + query);
        break;
      case 8:
        res = await fetch(API_ROUTE_SUBREGION + query);
        break;
      case 9:
        res = await fetch(API_ROUTE_TRANSLATION + query);
        break;
      default:
        res = await fetch(API_ROUTE_NAME + query);
        break;
    }

    state.cache.status = res.status;
    if (!res.ok) return;
    state.cache.filteredCountries = await res.json();

    // const res = await fetch(API_ROUTE_NAME + query);
    // state.cache.status = res.status;
    // if (!res.ok) return;
    // state.cache.filteredCountries = await res.json();
  } catch (err) {
    console.error(err);
  }
};
