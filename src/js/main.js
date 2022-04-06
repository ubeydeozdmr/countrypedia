'use strict';

import { setDayMode, setNightMode } from './themes';
import { renderDetailsContent, renderDetailsError } from './details';

const body = document.querySelector('body');
const spinner = document.querySelector('.loader-container');
const listCards = document.querySelector('.list-cards');
const details = document.querySelector('.details');
const input = document.querySelector('.search-input');
const search = document.querySelector('.search-btn');
const showAllTextKeyword = document.querySelector('.show-all-text-keyword');
const toggler = document.querySelector('.night-mode');
const showAllTextClick = document.querySelector('.show-all-text-click');

let theme;

const getData = async function (keyword) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/${keyword}`);
    if (!res || !res.ok) throw new Error();
    const data = await res.json();
    // console.log(data);
    // console.log(data[0]);
    return data;
  } catch (err) {
    const markup = `
      <h2 class="error-message">
        We had a problem trying to pull the required data. Please try again.
      </h2>
    `;
    spinner.insertAdjacentHTML('beforebegin', markup);
    spinner.style.display = 'none';
  }
};

const renderCountries = function (data) {
  itemCleaner(listCards);

  data.forEach(item => {
    const cardContent = `
      <hover cca2="${item.cca2}">
        <div class="list-card list-card--${theme}">
          <div class="list-card-img">
            <img src="${item.flags.svg}" alt="${item.name.common} flag">
          </div>
          <div class="list-card-text">
            <p>${item.name.common}</p>
          </div>
          <div class="list-card-save-icon"></div>
        </div>
      </hover>
    `;

    listCards.insertAdjacentHTML('beforeend', cardContent);
  });
  spinner.style.display = 'none';

  const listCard = document.querySelectorAll('.list-card');
  listCard.forEach(item =>
    item.addEventListener('click', async function (e) {
      const id = e.target.closest('hover').getAttribute('cca2');
      const data = await getData(`alpha/${id}`);
      renderDetails(data);
    })
  );
};

const renderDetails = function (data) {
  body.style.overflowY = 'hidden';
  details.style.display = 'grid';
  data = data[0];
  renderDetailsContent(data);
};

search.addEventListener('click', async function () {
  if (input.value !== '') {
    spinner.style.display = 'flex';
    const data = await getData(`name/${input.value}`);
    renderCountries(data);
    spinner.style.display = 'none';
    document.querySelector('.show-all').style.display = 'block';
    itemCleaner(showAllTextKeyword);
    showAllTextKeyword.insertAdjacentHTML('beforeend', input.value);
    input.value = '';
    theme === 'day' ? setDayMode() : setNightMode();
  }
});

showAllTextClick.addEventListener('click', function () {
  document.querySelector('.show-all').style.display = 'none';
  input.value = '';
  spinner.style.display = 'flex';
  init();
});

input.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    search.click();
  }
});

toggler.addEventListener('click', function () {
  if (theme === 'day') {
    theme = 'night';
    localStorage.setItem('theme', 'night');
    setNightMode();
  } else {
    theme = 'day';
    localStorage.setItem('theme', 'day');
    setDayMode();
  }
});

const init = async function () {
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'day');
    theme = localStorage.getItem('theme');
  } else {
    theme = localStorage.getItem('theme');
    theme === 'day' ? setDayMode() : setNightMode();
  }
  const data = await getData('all');
  if (data) renderCountries(data);
};

init();

const itemCleaner = parentItem => {
  while (parentItem.hasChildNodes())
    parentItem.removeChild(parentItem.firstChild);
};
