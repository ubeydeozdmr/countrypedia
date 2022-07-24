import { getData, state } from './model';
import countriesView from './views/countriesView';
import detailsView from './views/detailsView';
import themesView from './views/themesView';
import View from './views/View';

const viewObj = new View();

const bookmark = document.querySelector('.toolbar__saved');
const addBookmark = document.querySelector('.details__save-icon');
const toggler = document.querySelector('.toolbar__theme');
const search = document.querySelector('.search__button');
const input = document.querySelector('.search__input');
const showAll = document.querySelector('.cflex__show-all');
const detailsExit = document.querySelector('.details__exit');
const flexTitle = document.querySelector('.cflex__title');

const saveIcon = document.querySelector('.details__save-icon .save');
const unsaveIcon = document.querySelector('.details__save-icon .unsave');

bookmark.addEventListener('click', function () {
  // console.log(state.savedCountries);
  // console.log(state.savedHashs);
  countriesView.render(state.savedCountries);
  flexTitle.textContent = `List of countries you saved`;
  countriesView.renderShowAll(input);
  listCardHandler();
});

addBookmark.addEventListener('click', function () {
  if (state.savedHashs.find(cca3 => cca3 === location.hash.slice(1))) {
    saveIcon.classList.remove('disabled');
    unsaveIcon.classList.add('disabled');
    state.savedHashs = state.savedHashs.filter(
      cca3 => cca3 !== location.hash.slice(1)
    );
    state.savedCountries = state.savedCountries.filter(
      countryObj => countryObj.cca3 !== location.hash.slice(1)
    );
  } else {
    saveIcon.classList.add('disabled');
    unsaveIcon.classList.remove('disabled');
    state.savedHashs.push(location.hash.slice(1));
    state.savedCountries.push(state.currentCountry);
  }

  // console.log(state.savedHashs);
  // console.log(location.hash.slice(1));

  // console.log(state.savedCountries);
  localStorage.setItem('savedCountries', JSON.stringify(state.savedCountries));
  localStorage.setItem('savedHashs', JSON.stringify(state.savedHashs));
  console.log(localStorage.getItem('savedCountries'));
  console.log(localStorage.getItem('savedHashs'));
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

search.addEventListener('click', async function () {
  // 1) Check for input value is empty or not
  if (input.value === '') return;

  // 2) If not empty, render spinner before fetch operation
  viewObj.renderSpinner('main');

  // 3) Fetch data from API
  const data = await getData(`name/${input.value}`);

  // 4) Render list of countries if data has been received
  if (data) countriesView.render(data);
  else viewObj.renderError(404);
  flexTitle.textContent = `Countries matching your search "${input.value}"`;

  // 5) Render Show All button to be able to view all countries without having to refresh the page
  countriesView.renderShowAll(input);

  listCardHandler();

  viewObj.hideFocus();
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

showAll.addEventListener('click', function () {
  countriesView.hideShowAll();
  document.querySelector('.cflex__title').textContent = 'List of All Countries';
  init();
});

window.addEventListener('hashchange', async function (e) {
  // console.log(e.newURL);
  // console.log(detailsView.isDetailsOpened);
  // if (e.newURL.slice(-1) !== '/' && detailsView.isDetailsOpened) {
  //   detailsView.hideAlt();
  // }
  if (e.newURL.slice(-1) === '/' || e.newURL.slice(-1) === '#') {
    detailsView.hide();
  } else {
    // const data = await getData(`alpha/${e.newURL.slice(-3)}`);
    // if (data) detailsView.render(data);
  }
});

detailsExit.addEventListener('click', () => detailsView.hide());

const listCardHandler = function () {
  try {
    document.querySelectorAll('.country').forEach(item =>
      item.addEventListener('click', async function (e) {
        detailsView.renderPre();
        viewObj.renderSpinner('details');
        const id = e.target.closest('hover').getAttribute('cca3');
        const data = await getData(`alpha/${id}`);
        [state.currentCountry] = data;
        // console.log(state.currentCountry);
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

const init = async function () {
  try {
    let data;
    if (
      localStorage.getItem('savedCountries') &&
      localStorage.getItem('savedHashs')
    ) {
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

    if (data) countriesView.render(data);
    else viewObj.renderError(state.status);

    listCardHandler();
  } catch (err) {
    console.log(err);
  }
};
init();
