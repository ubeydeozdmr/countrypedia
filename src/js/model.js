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
  } catch (err) {
    console.error(err);
  }
};

export const getSearchResults = async function (query) {
  try {
    // NOTE: I'm working on different ways to search for countries here,
    // I haven't released this feature yet. I'm still working on it.
    // If you want to try the feature now, try typing these ones into Countrypedia's search bar:
    // #CURRENCY#euro
    // #CAPITAL#paris
    // #DEMONYM#french
    // #LANG#french
    // #REGION#europe
    // #SUBREGION#western europe
    // #TRANSLATION#french
    // #CODE#fra
    // #NAME#france
    const splittedQuery = query.split('#');

    let res;
    if (splittedQuery.length > 1)
      switch (splittedQuery[1]) {
        case 'NAME':
          res = await fetch(API_ROUTE_NAME + splittedQuery[2]);
          break;
        case 'CODE':
          res = await fetch(API_ROUTE_CODE + splittedQuery[2]);
          break;
        case 'CODELIST':
          res = await fetch(API_ROUTE_CODELIST + splittedQuery[2]);
          break;
        case 'CAPITAL':
          res = await fetch(API_ROUTE_CAPITAL + splittedQuery[2]);
          break;
        case 'CURRENCY':
          res = await fetch(API_ROUTE_CURRENCY + splittedQuery[2]);
          break;
        case 'DEMONYM':
          res = await fetch(API_ROUTE_DEMONYM + splittedQuery[2]);
          break;
        case 'LANG':
          res = await fetch(API_ROUTE_LANG + splittedQuery[2]);
          break;
        case 'REGION':
          res = await fetch(API_ROUTE_REGION + splittedQuery[2]);
          break;
        case 'SUBREGION':
          res = await fetch(API_ROUTE_SUBREGION + splittedQuery[2]);
          break;
        case 'TRANSLATION':
          res = await fetch(API_ROUTE_TRANSLATION + splittedQuery[2]);
          break;
        default:
          res = await fetch(API_ROUTE_NAME + splittedQuery[2]);
          break;
      }
    else res = await fetch(API_ROUTE_NAME + query);

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
