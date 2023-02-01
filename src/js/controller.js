import { ERROR_BAD_REQUEST, ERROR_NOT_FOUND } from './config';
import { getData, state } from './model';
import countriesView from './views/countriesView';
import detailsView from './views/detailsView';
import themesView from './views/themesView';
import View from './views/View';

const statusView = new View();

const toggler = document.querySelector('.night-mode');
const search = document.querySelector('.search-btn');
const input = document.querySelector('.search-input');
const showAllTextClick = document.querySelector('.show-all-text-click');
const detailsExit = document.querySelector('.details-exit');
const btnClosePopup = document.querySelector('.btn--close-popup');

toggler.addEventListener('click', function () {
  if (View.theme === 'day') {
    View.theme = 'night';
    localStorage.setItem('theme-v1', 'night');
    themesView.setNightMode();
  } else {
    View.theme = 'day';
    localStorage.setItem('theme-v1', 'day');
    themesView.setDayMode();
  }
});

search.addEventListener('click', async function () {
  if (input.value === '') return;
  // !
  statusView.renderSpinner();
  const data = await getData(`name/${input.value}`);
  if (data) countriesView.render(data);
  else statusView.renderError(errorHandler());
  countriesView.renderShowAll(input);
  listCardHandler();
  View.theme === 'day' ? themesView.setDayMode() : themesView.setNightMode();
});

input.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) search.click();
});

showAllTextClick.addEventListener('click', function () {
  countriesView.hideShowAll(input);
  init();
});

detailsExit.addEventListener('click', () => detailsView.hide());

btnClosePopup.addEventListener('click', () => statusView.dismissError());

const errorHandler = function () {
  switch (state.status) {
    case 404:
      return ERROR_NOT_FOUND;
    default:
      return ERROR_BAD_REQUEST;
  }
};

const listCardHandler = function () {
  try {
    View.theme === 'day' ? themesView.setDayMode() : themesView.setNightMode();
    document.querySelectorAll('.list-card').forEach((item) =>
      item.addEventListener('click', async function (e) {
        const id = e.target.closest('hover').getAttribute('cca3');
        const data = await getData(`alpha/${id}`);
        if (data) detailsView.render(data);
        else statusView.renderError(errorHandler());
      })
    );
  } catch (err) {
    console.log(err);
  }
};

const init = async function () {
  let data;

  if (!localStorage.getItem('theme-v1')) {
    localStorage.setItem('theme-v1', 'day');
    View.theme = localStorage.getItem('theme-v1');
  } else {
    View.theme = localStorage.getItem('theme-v1');
    View.theme === 'day' ? themesView.setDayMode() : themesView.setNightMode();
  }

  state.countries ? (data = state.countries) : (data = await getData('all'));

  if (data) countriesView.render(data);
  else statusView.renderError(errorHandler());

  listCardHandler();
};
init();
