import { ERROR_BAD_REQUEST, ERROR_NOT_FOUND } from './config';
import { getData } from './model';
import view from './view';

const toggler = document.querySelector('.night-mode');
const search = document.querySelector('.search-btn');
const input = document.querySelector('.search-input');
const showAllTextClick = document.querySelector('.show-all-text-click');
const detailsExit = document.querySelector('.details-exit');
const btnClosePopup = document.querySelector('.btn--close-popup');

toggler.addEventListener('click', function () {
  if (view.theme === 'day') {
    view.theme = 'night';
    localStorage.setItem('theme', 'night');
    view.setNightMode();
  } else {
    view.theme = 'day';
    localStorage.setItem('theme', 'day');
    view.setDayMode();
  }
});

search.addEventListener('click', async function () {
  if (input.value === '') return;
  view.renderSpinner();
  const data = await getData(`name/${input.value}`);
  if (data) view.renderCountries(data);
  else view.renderError(ERROR_NOT_FOUND);
  view.renderShowAll(input);
  listCardHandler();
  view.theme === 'day' ? view.setDayMode() : view.setNightMode();
});

input.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) search.click();
});

showAllTextClick.addEventListener('click', function () {
  view.hideShowAll(input);
  init();
});

detailsExit.addEventListener('click', () => view.hideDetails());

btnClosePopup.addEventListener('click', () => view.dismissError());

const listCardHandler = function () {
  try {
    document.querySelectorAll('.list-card').forEach(item =>
      item.addEventListener('click', async function (e) {
        const id = e.target.closest('hover').getAttribute('cca3');
        const data = await getData(`alpha/${id}`);
        if (data) view.renderDetails(data);
        else view.renderError(ERROR_BAD_REQUEST);
      })
    );
  } catch (err) {
    console.log(err);
  }
};

const init = async function () {
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'day');
    view.theme = localStorage.getItem('theme');
  } else {
    view.theme = localStorage.getItem('theme');
    view.theme === 'day' ? view.setDayMode() : view.setNightMode();
  }
  const data = await getData('all');
  if (data) view.renderCountries(data);
  else view.renderError(ERROR_BAD_REQUEST);
  listCardHandler();
};
init();
