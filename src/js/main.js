'use strict';

import { setDayMode, setNightMode } from './themes';

const listCards = document.querySelector('.list-cards');
const input = document.querySelector('.search-input');
const search = document.querySelector('.search-btn');
const toggler = document.querySelector('.night-mode');
const goBack = document.querySelector('.show-all-text span');

let isDarkModeActive = false;

const getData = async function (keyword) {
  const res = await fetch(`https://restcountries.com/v3.1/${keyword}`);
  const data = await res.json();
  // console.log(data);
  // console.log(data[0]);
  return data;
};

const renderCountries = function (data) {
  while (listCards.hasChildNodes()) {
    listCards.removeChild(listCards.firstChild);
  }

  data.forEach(item => {
    const cardContent = `
      <div class="list-card">
        <div class="list-card-img">
          <img src="${item.flags.svg}" alt="${item.name.common} flag">
        </div>
        <div class="list-card-text">
          <p>${item.name.common}</p>
        </div>
        <div class="list-card-save-icon"></div>
      </div>
      `;

    listCards.insertAdjacentHTML('afterbegin', cardContent);
  });
};

search.addEventListener('click', async function () {
  if (input.value !== '') {
    const data = await getData(`name/${input.value}`);
    renderCountries(data);
    document.querySelector('.show-all').style.display = 'block';
    console.log(goBack);
  }
});

goBack.addEventListener('click', function () {
  document.querySelector('.show-all').style.display = 'none';
  init();
});

input.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    search.click();
  }
});

toggler.addEventListener('click', function () {
  if (!isDarkModeActive) {
    isDarkModeActive = true;
    setNightMode();
  } else {
    isDarkModeActive = false;
    setDayMode();
  }
});

const init = async function () {
  const data = await getData('all');
  renderCountries(data);
};

init();
