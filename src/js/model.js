import { API_BASE_URL, API_ENDPOINTS, COUNTRY_LIST_FIELDS } from './config';

export const state = {
  status: undefined,
  countries: undefined,
};

const formatCountry = function (country) {
  return {
    altSpellings: country.altSpellings || [],
    area: country.area,
    borders: country.borders || [],
    capital: country.capital || '',
    cioc: country.cioc || '',
    code: country.alpha3Code || country.alpha2Code || country.numericCode,
    codes: {
      alpha2: country.alpha2Code || '',
      alpha3: country.alpha3Code || '',
      numeric: country.numericCode || '',
    },
    currencies: country.currencies || [],
    demonym: country.demonym || '',
    dialingCodes: country.callingCodes || [],
    flag: country.flags?.svg || country.flag || country.flags?.png || '',
    flagEmoji: country.flag || '',
    gini: country.gini,
    independent: country.independent,
    languages: country.languages || [],
    location: country.latlng || [],
    maps: {
      google: country.maps?.googleMaps || '',
      openStreetMaps: country.maps?.openStreetMaps || '',
    },
    name: country.name || country.nativeName || 'Unknown country',
    nativeName: country.nativeName || '',
    population: country.population,
    populationDensity: country.populationDensity,
    regionalBlocs: country.regionalBlocs || [],
    region: country.region || '',
    subregion: country.subregion || '',
    timezones: country.timezones || [],
    topLevelDomain: country.topLevelDomain || [],
  };
};

const normalizeResponse = function (data) {
  if (Array.isArray(data)) return data.map(formatCountry);
  return formatCountry(data);
};

const buildUrl = function (endpoint, params = {}) {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url;
};

const getData = async function (endpoint, params) {
  try {
    const res = await fetch(buildUrl(endpoint, params));
    state.status = res.status;
    if (!res.ok) return;
    const data = await res.json();
    return normalizeResponse(data);
  } catch (err) {
    console.error(err);
    state.status = err.message;
  }
};

export const getAllCountries = async function () {
  if (state.countries) return state.countries;

  state.countries = await getData(API_ENDPOINTS.countries, {
    fields: COUNTRY_LIST_FIELDS,
  });

  return state.countries;
};

export const getCountriesByName = async function (name) {
  return await getData(`${API_ENDPOINTS.name}/${encodeURIComponent(name)}`, {
    fields: COUNTRY_LIST_FIELDS,
  });
};

export const getCountryByCode = async function (code) {
  return await getData(`${API_ENDPOINTS.alpha}/${encodeURIComponent(code)}`, {
    full: true,
  });
};
