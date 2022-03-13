'use strict';

const listCards = document.querySelector('.list-cards');
const listCardImg = document.querySelector('.list-card-img');
const input = document.querySelector('#search');
const search = document.querySelector('#submit-search');
const toolbar = document.querySelector('.toolbar');
const toggler = document.querySelector('.night-mode');
const togglerIcon = document.querySelector('.night-mode svg path');
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
    goBack.addEventListener('click', function () {
      document.querySelector('.show-all').style.display = 'none';
      init();
    });
  }
});

const setNightMode = function () {
  togglerIcon.setAttribute(
    'd',
    'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  );
  isDarkModeActive = true;
  document.querySelector('body').style.backgroundColor = '#111111';
  document.querySelector('.toolbar-icons').style.color = '#cccccc';
  document.querySelector('.hero').style.backgroundColor = '#333333';
  document.querySelector('.hero-title').style.color = '#eeeeee';
  document.querySelector('.hero-description').style.color = '#cccccc';
  document.querySelector('.search button').style.backgroundColor = '#333333';
  document.querySelector('.search button').style.color = '#eeeeee';
};

const setDayMode = function () {
  togglerIcon.setAttribute(
    'd',
    'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
  );
  isDarkModeActive = false;
  document.querySelector('body').style.backgroundColor = '#ffffff';
  document.querySelector('.toolbar-icons').style.color = '#555555';
  document.querySelector('.hero').style.backgroundColor = '#eeeeee';
  document.querySelector('.hero-title').style.color = '#333333';
  document.querySelector('.hero-description').style.color = '#555555';
  document.querySelector('.search button').style.backgroundColor = '#eeeeee';
  document.querySelector('.search button').style.color = '#333333';
};

input.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    search.click();
  }
});

toggler.addEventListener('click', function () {
  isDarkModeActive === false ? setNightMode() : setDayMode();
});

const init = async function () {
  const data = await getData('all');
  renderCountries(data);
};

init();
