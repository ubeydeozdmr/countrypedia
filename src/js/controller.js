import { clear } from './helpers';
import { getData, state } from './model';
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

const bookmarkHandler = function () {
  if (state.savedCountries.length === 0) {
    viewObj.renderError('No saved countries');
    return;
  }
  countriesView.render(state.savedCountries, 'Saved Countries');
  countriesView.renderShowAll();
  listCardHandler();
};

addBookmark.addEventListener('click', function () {
  if (state.savedHashs.find(cca3 => cca3 === location.hash.slice(1))) {
    removeBookmark();
    state.savedHashs = state.savedHashs.filter(cca3 => cca3 !== location.hash.slice(1));
    state.savedCountries = state.savedCountries.filter(
      countryObj => countryObj.cca3 !== location.hash.slice(1)
    );
  } else {
    addBookmark();
    state.savedHashs.push(location.hash.slice(1));
    state.savedCountries.push(state.currentCountry);
  }

  localStorage.setItem('savedCountries', JSON.stringify(state.savedCountries));
  localStorage.setItem('savedHashs', JSON.stringify(state.savedHashs));
});

toggler.addEventListener('click', function () {
  if (View.theme === 'light') {
    View.theme = 'dark';
    localStorage.setItem('theme', 'dark');
    themesView.setNightMode();
  } else {
    View.theme = 'light';
    localStorage.setItem('theme', 'light');
    themesView.setDayMode();
  }
});

const searchHandler = async function () {
  // 1) Check for input value is empty or not
  if (input.value === '') return;
  // state.lastSearch = input.value;

  // 2) If not empty, render spinner before fetch operation
  viewObj.renderSpinner('main');

  // 3) Fetch data from API
  const data = await getData(`name/${input.value}`);

  // 4) Render list of countries if data has been received
  if (data) countriesView.render(data, `Countries matching your search "${input.value}"`);
  else viewObj.renderError(404);

  // 5) Render Show All button to be able to view all countries without having to refresh the page
  countriesView.renderShowAll(input);

  listCardHandler();

  viewObj.hideFocus();
};

search.addEventListener('click', async function () {
  // // 1) Check for input value is empty or not
  // if (input.value === '') return;
  // // 2) If not empty, render spinner before fetch operation
  // viewObj.renderSpinner('main');
  // // 3) Fetch data from API
  // const data = await getData(`name/${input.value}`);
  // // 4) Render list of countries if data has been received
  // if (data) countriesView.render(data, `Countries matching your search "${input.value}"`);
  // else viewObj.renderError(404);
  // // 5) Render Show All button to be able to view all countries without having to refresh the page
  // countriesView.renderShowAll(input);
  // listCardHandler();
  // viewObj.hideFocus();
});

input.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) search.click();
});

input.addEventListener('focus', function () {
  viewObj.renderFocus();
});

input.addEventListener('focusout', function () {
  viewObj.hideFocus();
});

const randomCountryHandler = function () {
  const random = Math.floor(Math.random() * state.countries.length);
  const randomCountry = [state.countries[random]];
  [state.currentCountry] = randomCountry;
  if (randomCountry) {
    detailsView.renderPre();
    detailsView.render(
      randomCountry,
      !!state.savedHashs.find(cca3 => cca3 === location.hash.slice(1))
    );
  } else viewObj.renderError(state.status);
};

const showAllHandler = function () {
  countriesView.hideShowAll();
  init();
};

window.addEventListener('hashchange', async function (e) {
  console.log(e);
  console.log(window.location.hash);

  switch (window.location.hash) {
    case '':
      if (e.oldURL.includes('#saved')) showAllHandler();
      if (e.oldURL.includes('#search')) showAllHandler();
      detailsView.hide();
      break;
    case '#search':
      searchHandler();
      break;
    case '#random':
      randomCountryHandler();
      break;
    case '#saved':
      bookmarkHandler();
    default:
      break;
  }
});

const listCardHandler = function () {
  try {
    document.querySelectorAll('.country').forEach(item =>
      item.addEventListener('click', async function (e) {
        detailsView.renderPre();
        viewObj.renderSpinner('details');
        const id = e.target.closest('hover').getAttribute('cca3');
        const data = await getData(`alpha/${id}`);
        [state.currentCountry] = data;
        if (data)
          detailsView.render(
            data,
            !!state.savedHashs.find(cca3 => cca3 === location.hash.slice(1))
          );
        else viewObj.renderError(state.status);
      })
    );
  } catch (err) {
    console.log(err);
  }
};

detailsButton.addEventListener('click', function () {
  clear(document.querySelector('.details__content'));
  const data = [state.currentCountry];
  if (data)
    detailsView.render(
      data,
      !!state.savedHashs.find(cca3 => cca3 === location.hash.slice(1))
    );
  else viewObj.renderError(state.status);
});

mapButton.addEventListener('click', function () {
  clear(document.querySelector('.details__content'));
  detailsView.renderMap(state.currentCountry);
});

const init = async function () {
  try {
    let data;
    if (localStorage.getItem('savedCountries') && localStorage.getItem('savedHashs')) {
      state.savedCountries = JSON.parse(localStorage.getItem('savedCountries'));
      state.savedHashs = JSON.parse(localStorage.getItem('savedHashs'));
    } else {
      state.savedCountries = [];
      state.savedHashs = [];
    }

    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
      View.theme = localStorage.getItem('theme');
    } else {
      View.theme = localStorage.getItem('theme');
      View.theme === 'light' ? themesView.setDayMode() : themesView.setNightMode();
    }

    state.countries ? (data = state.countries) : (data = await getData('all'));

    if (data) countriesView.render(data, `List of All Countries`);
    else viewObj.renderError(state.status);

    listCardHandler();
  } catch (err) {
    console.log(err);
  }
};
init();
