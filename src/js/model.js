import {
  API_BASE_URL,
  API_ENDPOINTS,
  API_OVERVIEW_FIELDS,
} from './config';

export const state = {
  data: null,
  cache: {
    status: null,
    currentCountry: null,
    countries: null,
    countriesAlphabetical: null,
    filteredCountries: null,
    filteredCountriesAlphabetical: null,
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

const buildUrl = function (endpoint, params = {}) {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url;
};

const fetchJson = async function (endpoint, params) {
  const res = await fetch(buildUrl(endpoint, params));
  state.cache.status = res.status;
  if (!res.ok) return null;
  return await res.json();
};

const formatCountry = function (country) {
  const commonName = country.name || country.nativeName || 'Unknown country';
  const alpha3Code = country.alpha3Code || country.cca3 || country.cioc || '';
  const alpha2Code = country.alpha2Code || country.cca2 || '';
  const callingCodes = country.callingCodes || [];

  return {
    area: country.area,
    altSpellings: country.altSpellings || [],
    borders: country.borders || [],
    capital: country.capital ? [country.capital] : [],
    capitalInfo: {
      latlng: country.capitalInfo?.latlng || country.latlng || null,
    },
    cca2: alpha2Code,
    cca3: alpha3Code,
    cioc: country.cioc || '',
    currencies: (country.currencies || []).reduce((currencies, cur) => {
      currencies[cur.code || cur.name] = cur;
      return currencies;
    }, {}),
    demonym: country.demonym || '',
    demonyms: {
      eng: {
        f: country.demonym || '',
        m: country.demonym || '',
      },
    },
    flag: country.flag || '',
    flags: {
      alt: `${commonName} flag`,
      png: country.flags?.png || '',
      svg: country.flags?.svg || country.flag || country.flags?.png || '',
    },
    gini: country.gini,
    idd: {
      root: '+',
      suffixes: callingCodes,
    },
    independent: country.independent,
    languages: (country.languages || []).reduce((languages, lang) => {
      languages[lang.iso639_1 || lang.iso639_2 || lang.name] = lang.name;
      return languages;
    }, {}),
    latlng: country.latlng || [],
    maps: {
      googleMaps: country.maps?.googleMaps || '',
      openStreetMaps: country.maps?.openStreetMaps || '',
    },
    name: {
      common: commonName,
      official: commonName,
      nativeName: country.nativeName || '',
    },
    nativeName: country.nativeName || '',
    numericCode: country.numericCode || '',
    population: country.population,
    populationDensity: country.populationDensity,
    region: country.region || '',
    regionalBlocs: country.regionalBlocs || [],
    subregion: country.subregion || '',
    timezones: country.timezones || [],
    tld: country.topLevelDomain || [],
    translations: country.translations || {},
  };
};

const formatCountries = function (countries) {
  if (!countries) return null;
  return Array.isArray(countries)
    ? countries.map(formatCountry)
    : [formatCountry(countries)];
};

const sortCountries = function (countries) {
  countries.sort((a, b) => {
    if (a.name.common < b.name.common) return -1;
    if (a.name.common > b.name.common) return 1;
    return 0;
  });
};

const cacheCountries = function (countries, cacheKey, alphabeticalCacheKey) {
  state.cache[cacheKey] = countries;
  state.cache[alphabeticalCacheKey] = [...countries];
  sortCountries(state.cache[alphabeticalCacheKey]);
};

const fetchCountries = async function (endpoint, params) {
  return formatCountries(await fetchJson(endpoint, params));
};

const getCountriesByCodes = async function (codes) {
  const codeList = decodeURI(codes)
    .split(',')
    .map(code => code.trim())
    .filter(Boolean);

  const countries = await Promise.all(
    codeList.map(async code => {
      const data = await fetchJson(`${API_ENDPOINTS.alpha}/${encodeURIComponent(code)}`, {
        full: true,
      });
      return data ? formatCountry(data) : null;
    }),
  );

  const filteredCountries = countries.filter(Boolean);
  state.cache.status = filteredCountries.length > 0 ? 200 : 404;
  return filteredCountries.length > 0 ? filteredCountries : null;
};

const findCountriesByLanguage = async function (query) {
  await getAllCountries();
  if (!state.cache.countries) return null;
  const normalizedQuery = decodeURI(query).toLowerCase();
  const countries = state.cache.countries.filter(country =>
    Object.entries(country.languages).some(
      ([code, name]) =>
        code.toLowerCase() === normalizedQuery ||
        name.toLowerCase() === normalizedQuery,
    ),
  );

  state.cache.status = countries.length > 0 ? 200 : 404;
  return countries.length > 0 ? countries : null;
};

const findCountriesByCurrency = async function (query) {
  await getAllCountries();
  if (!state.cache.countries) return null;
  const normalizedQuery = decodeURI(query).toLowerCase();
  const countries = state.cache.countries.filter(country =>
    Object.values(country.currencies).some(
      cur =>
        cur.code?.toLowerCase() === normalizedQuery ||
        cur.name?.toLowerCase() === normalizedQuery,
    ),
  );

  state.cache.status = countries.length > 0 ? 200 : 404;
  return countries.length > 0 ? countries : null;
};

const findCountriesByTranslation = async function (query) {
  await getAllCountries();
  if (!state.cache.countries) return null;
  const normalizedQuery = decodeURI(query).toLowerCase();
  const countries = state.cache.countries.filter(country =>
    Object.values(country.translations).some(translation =>
      translation.toLowerCase().includes(normalizedQuery),
    ),
  );

  state.cache.status = countries.length > 0 ? 200 : 404;
  return countries.length > 0 ? countries : null;
};

const initData = function () {
  try {
    state.data = {
      version: 2,
      theme: 'light',
      sort: 'random',
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
      case 2:
        state.data = checkObj;
        break;
      case 1:
        state.data = checkObj;
        state.data.sort = 'random';
        state.data.version = 2;
        localStorage.setItem('data', JSON.stringify(state.data));
        break;
      default:
        localStorage.clear();
        initData();
        break;
    }
  } else initData();
};

export const getAllCountriesOverview = async function () {
  try {
    const countries = await fetchCountries(API_ENDPOINTS.all, {
      fields: API_OVERVIEW_FIELDS,
    });

    if (!countries) return;
    cacheCountries(countries, 'countries', 'countriesAlphabetical');
  } catch (err) {
    console.error(err);
  }
};

export const getAllCountries = async function () {
  try {
    const countries = await fetchCountries(API_ENDPOINTS.all, {
      full: true,
    });

    if (!countries) return;
    cacheCountries(countries, 'countries', 'countriesAlphabetical');
  } catch (err) {
    console.error(err);
  }
};

export const getCountry = async function (cca3) {
  try {
    state.cache.currentCountry = null;
    state.cache.currentCountry = await fetchCountries(
      `${API_ENDPOINTS.alpha}/${encodeURIComponent(cca3)}`,
      { full: true },
    );

    if (state.cache.currentCountry?.[0].borders?.length > 0) {
      const borderCountries = await getCountriesByCodes(
        state.cache.currentCountry[0].borders.join(','),
      );
      if (!borderCountries) return;
      const borderNames = borderCountries.map(item => item.name.common);
      borderNames.sort();
      state.cache.currentCountry[0].borders = borderNames;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getSearchResults = async function (query, selectedIndex) {
  try {
    let countries;
    switch (selectedIndex) {
      case 1:
        countries = await fetchCountries(
          `${API_ENDPOINTS.name}/${encodeURIComponent(decodeURI(query))}`,
        );
        break;
      case 2:
        countries = await fetchCountries(
          `${API_ENDPOINTS.alpha}/${encodeURIComponent(decodeURI(query))}`,
          { full: true },
        );
        break;
      case 3:
        countries = await getCountriesByCodes(query);
        break;
      case 4:
        countries = await fetchCountries(
          `${API_ENDPOINTS.capital}/${encodeURIComponent(decodeURI(query))}`,
        );
        break;
      case 5:
        countries = await fetchCountries(
          `${API_ENDPOINTS.currency}/${encodeURIComponent(decodeURI(query))}`,
        );
        if (!countries) countries = await findCountriesByCurrency(query);
        break;
      case 6:
        countries = await fetchCountries(
          `${API_ENDPOINTS.demonym}/${encodeURIComponent(decodeURI(query))}`,
        );
        break;
      case 7:
        countries = await fetchCountries(
          `${API_ENDPOINTS.language}/${encodeURIComponent(decodeURI(query))}`,
        );
        if (!countries) countries = await findCountriesByLanguage(query);
        break;
      case 8:
        countries = await fetchCountries(
          `${API_ENDPOINTS.region}/${encodeURIComponent(decodeURI(query))}`,
        );
        break;
      case 9:
        countries = await fetchCountries(
          `${API_ENDPOINTS.subregion}/${encodeURIComponent(decodeURI(query))}`,
        );
        break;
      case 10:
        countries = await findCountriesByTranslation(query);
        break;
      default:
        countries = await fetchCountries(
          `${API_ENDPOINTS.name}/${encodeURIComponent(decodeURI(query))}`,
        );
        break;
    }

    if (!countries) return;
    cacheCountries(
      countries,
      'filteredCountries',
      'filteredCountriesAlphabetical',
    );
  } catch (err) {
    console.error(err);
  }
};
