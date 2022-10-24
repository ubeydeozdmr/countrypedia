import { clear } from './helpers';

import {
  getAllCountries,
  getCountry,
  getLocalData,
  getSearchResults,
  state,
  urlSwitcher,
} from './model';

import countriesView from './views/countriesView';
import detailsView from './views/detailsView';
import themesView from './views/themesView';
import View from './views/View';

const viewObj = new View();

const addBookmark = document.querySelector('.details__save-icon');
const toggler = document.querySelector('.toolbar__theme');
const search = document.querySelector('.search__button');
const input = document.querySelector('.search__input');
const detailsButton = document.querySelector('.details__title-button--details');
const mapButton = document.querySelector('.details__title-button--map');
const switchButton = document.querySelector('.slider.round');
const switchCheckButton = document.querySelector('.switch input[type="checkbox"]');
const searchby = document.querySelector('#searchby');
const saveSwitch = document.querySelector('.country-tool__switch input[type="checkbox"]');
const countryToolSaved = document.querySelector('.country-tool--saved');

window.addEventListener('click', e => {
  if (e.target === document.querySelector('.popup')) {
    switchCheckButton.checked = false;
    window.location.hash = state.cache.url.old;
  }
});

document.querySelector('#searchby').addEventListener('change', function () {
  switch (this.value) {
    case 'name':
      input.placeholder = 'Search by country name (eg: Germany)';
      break;
    case 'code':
      input.placeholder = 'Search by country code (eg: per)';
      break;
    case 'codelist':
      input.placeholder = 'Search by country code list (eg: per,usa,ind)';
      break;
    case 'capital':
      input.placeholder = 'Search by capital city (eg: Jakarta)';
      break;
    case 'currency':
      input.placeholder = 'Search by currency (eg: euro)';
      break;
    case 'demonym':
      input.placeholder = 'Search by demonym (eg: french)';
      break;
    case 'lang':
      input.placeholder = 'Search by language (eg: english)';
      break;
    case 'region':
      input.placeholder = 'Search by region (eg: africa)';
      break;
    case 'subregion':
      input.placeholder = 'Search by subregion (eg: caribbean)';
      break;
    case 'translation':
      input.placeholder = 'Search by country name (eg: Turkki)';
      break;
    default:
      input.placeholder = 'Search by country name';
      break;
  }
});

countryToolSaved.addEventListener('click', function () {
  if (window.location.hash === '#home') {
    countryToolSaved.setAttribute('href', '#saved');
    saveSwitch.checked = true;
  } else {
    countryToolSaved.setAttribute('href', '#home');
    saveSwitch.checked = false;
  }
});

const bookmarkHandler = function () {
  try {
    // 1) Check if data is invalid or there is no data
    if (!state.cache.countries) return viewObj.renderError(state.cache.status);

    // 2) Render saved countries
    countriesView.render(
      state.cache.countries.filter(country => state.data.saved.includes(country.cca3)),
      state.data.theme,
      'Saved Countries'
    );

    // 3) Add event listeners to all countries
    listCardHandler();
  } catch (err) {
    console.error(err);
  }
};

addBookmark.addEventListener('click', function () {
  try {
    // 1) Check if data is invalid or there is no data
    if (!state.cache.countries) return viewObj.renderError(state.cache.status);

    // 2) Check if country is already saved
    if (state.data.saved.includes(state.cache.currentCountry[0].cca3)) {
      // 2.1) Remove country from saved
      state.data.saved = state.data.saved.filter(
        cca3 => cca3 !== state.cache.country.cca3
      );

      // 2.2) Remove country from saved countries
      viewObj.removeBookmark();

      // 2.3) Add event listeners to all countries
      listCardHandler();
    } else {
      // 3) Add country to saved
      state.data.saved.push(state.cache.currentCountry[0].cca3);

      viewObj.addBookmark();

      // 3.1) Add event listeners to all countries
      listCardHandler();
    }

    // 4) Save data to local storage
    localStorage.setItem('data', JSON.stringify(state.data));
  } catch (err) {
    console.error(err);
  }
});

toggler.addEventListener('click', function () {
  if (state.data.theme === 'light') {
    state.data.theme = 'dark';
    themesView.setNightMode();
  } else {
    state.data.theme = 'light';
    themesView.setDayMode();
  }

  localStorage.setItem('data', JSON.stringify(state.data));
});

const searchTrimHandler = function (untrimmedString) {
  let trimmedString = decodeURI(untrimmedString);
  const arrayTemp = trimmedString.split(',');
  const arrayTemp2 = [];
  arrayTemp.forEach(item => {
    arrayTemp2.push(item.trim());
  });
  trimmedString = encodeURI(arrayTemp2.join(','));
  return trimmedString;
};

const searchHandler = async function () {
  // 1) Check for input value is empty or not
  if (!window.location.hash.split('?query=')[1]) return;
  state.cache.penultimateSearch = state.cache.lastSearch;
  state.cache.lastSearch = window.location.hash.split('?query=')[1];

  // 2) If not empty, render spinner before fetch operation
  viewObj.renderSpinner('main');

  if (searchby.options.selectedIndex === 2)
    state.cache.lastSearch = searchTrimHandler(state.cache.lastSearch);

  saveSwitch.checked = false;

  // 3) Fetch data from API
  if (state.cache.lastSearch !== state.cache.penultimateSearch)
    await getSearchResults(state.cache.lastSearch, searchby.options.selectedIndex);

  if (state.cache.status !== 200) {
    // NOTE: WORKAROUND - it will be moved to view later
    document.querySelector(
      '.cflex__title'
    ).textContent = `Couldn't find any results for "${state.cache.lastSearch}"`;
    return viewObj.renderError(state.cache.status);
  }

  // 4) Render list of countries if data has been received
  countriesView.render(
    state.cache.filteredCountries,
    state.data.theme,
    `Countries matching your search "${decodeURI(state.cache.lastSearch)}"`
  );

  // 5) Render Show All button to be able to view all countries without having to refresh the page
  countriesView.renderShowAll(input);

  listCardHandler();

  viewObj.hideFocus();
};

input.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) search.click();
});

input.addEventListener('focus', function () {
  viewObj.renderFocus();
});

input.addEventListener('focusout', function () {
  viewObj.hideFocus();
});

search.addEventListener('click', function () {
  window.location.hash =
    '#search?query=' + document.querySelector('.search__input').value.trim();
});

document.querySelector('.details__exit').addEventListener('click', function () {
  switchCheckButton.checked = false;
  window.location.hash = state.cache.url.old;
});

const randomCountryHandler = function () {
  try {
    // 1) Render spinner before operation
    detailsView.renderPre();

    // 1) Get random number
    const random = Math.floor(Math.random() * state.cache.countries.length);

    // 2) Get random country from random number
    state.cache.currentCountry = [state.cache.countries[random]];

    // 3) Check if country exists
    if (!state.cache.currentCountry) return viewObj.renderError(state.cache.status);

    // 4) Render country details
    detailsView.render(
      state.cache.currentCountry,
      !!state.data.saved.find(cca3 => cca3 === location.hash.slice(-3)),
      state.data.theme
    );
  } catch (err) {
    console.error(err);
  }
};

const listCardHandler = function () {
  try {
    document.querySelectorAll('.country').forEach(item =>
      item.addEventListener('click', async function (event) {
        // 1) Render spinner and countrycard before fetch operation
        detailsView.renderPre();

        // 2) Get id of the country
        const id = event.target.closest('hover').getAttribute('cca3');

        // 3) Fetch data from API
        await getCountry(id);

        // 4) Check if data has been received or not
        if (!state.cache.currentCountry) return viewObj.renderError(state.cache.status);

        // 5) Render countrycard if data has been received
        detailsView.render(
          state.cache.currentCountry,
          !!state.data.saved.find(cca3 => cca3 === location.hash.slice(-3)),
          state.data.theme
        );
      })
    );
  } catch (err) {
    console.error(err);
  }
};

switchButton.addEventListener('click', function () {
  clear(document.querySelector('.details__content'));
  // Check switchCheckButton checked attribute
  if (switchCheckButton.checked) {
    if (state.cache.currentCountry)
      detailsView.render(
        state.cache.currentCountry,
        !!state.data.saved.find(cca3 => cca3 === location.hash.slice(-3)),
        state.data.theme
      );
    else viewObj.renderError(state.cache.status);
  } else detailsView.renderMap(state.cache.currentCountry);
});

detailsButton.addEventListener('click', function () {
  clear(document.querySelector('.details__content'));
  if (state.cache.currentCountry)
    detailsView.render(
      state.cache.currentCountry,
      !!state.data.saved.find(cca3 => cca3 === location.hash.slice(-3)),
      state.data.theme
    );
  else viewObj.renderError(state.cache.status);
});

mapButton.addEventListener('click', function () {
  clear(document.querySelector('.details__content'));
  detailsView.renderMap(state.cache.currentCountry);
});

window.addEventListener('hashchange', async function (event) {
  urlSwitcher(window.location.hash);

  if (window.location.hash.includes('#search')) {
    detailsView.hide();
    searchHandler();
  }

  switch (window.location.hash) {
    case '' || '#home':
      state.cache.lastSearch = null;
      if (
        event.oldURL.includes('#saved') ||
        event.oldURL.includes('#search') ||
        event.oldURL.includes('#country')
      )
        showAllHandler();

      detailsView.hide();
      break;
    case '#random':
      randomCountryHandler();
      break;
    case '#saved':
      detailsView.hide();
      // countriesView.renderShowAll();
      bookmarkHandler();
      break;
    default:
      break;
  }
});

const showAllHandler = function () {
  try {
    // 1) Render spinner and hide countrycard
    countriesView.hideShowAll();

    // 2) Switch to home page
    urlSwitcher('#home');

    // 3) Check if fetched data is invalid or there is no data
    if (!state.cache.countries) return viewObj.renderError(state.cache.status);

    // 4) Render all countries if data is valid
    countriesView.render(
      state.cache.countries,
      state.data.theme,
      'List of All Countries'
    );

    // 5) Add event listeners to all countries
    listCardHandler();
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  try {
    // 1) Initialization of URL
    window.location.hash = '#home';
    state.cache.url.new = window.location.hash;

    // 2) Get data from local storage
    getLocalData();

    // 3) Set theme
    state.data.theme === 'light' ? themesView.setDayMode() : themesView.setNightMode();

    // 4) Get data from API
    await getAllCountries();

    // 5) Check if fetched data is invalid or there is no data
    if (!state.cache.countries) return viewObj.renderError(state.cache.status);

    // 6) Render all countries if data is valid
    countriesView.render(
      state.cache.countries,
      state.data.theme,
      'List of All Countries'
    );

    // 7) Add event listeners to all countries
    listCardHandler();
  } catch (err) {
    console.error(err);
  }
})();
