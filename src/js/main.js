'use strict';

import { setDayMode, setNightMode } from './themes';

const listCards = document.querySelector('.list-cards');
const details = document.querySelector('.details');
const detailsExit = document.querySelector('.details-exit');
const detailsFlag = document.querySelector('.details-flag');
const detailsAltSpellings = document.querySelector('.details-alt-spellings');
const detailsBorders = document.querySelector('.details-borders');
const detailsCapital = document.querySelector('.details-capital');
const detailsCarDirection = document.querySelector('.details-car-direction');
const detailsCoatOfArms = document.querySelector('.details-coat-of-arms');
const detailsContinents = document.querySelector('.details-continents');
const detailsCurrencies = document.querySelector('.details-currencies');
const detailsIdd = document.querySelector('.details-idd');
const detailsIndependent = document.querySelector('.details-independent');
const detailsLandlocked = document.querySelector('.details-landlocked');
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
      <hover cca2="${item.cca2}">
        <div class="list-card">
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

    listCards.insertAdjacentHTML('afterbegin', cardContent);
  });

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
  details.style.display = 'flex';
  // details.style.display = 'grid';
  scroll(0, 0);
  data = data[0];
  const flag = `<img src="${data.flags.svg}" alt="${data.demonyms.eng.m} flag" style="width: 12rem; margin-top: 0.4rem; border-radius: 1rem" />`;
  detailsFlag.insertAdjacentHTML('beforeend', flag);
  detailsAltSpellings.insertAdjacentHTML(
    'beforeend',
    data.altSpellings.toString().replaceAll(',', ', ')
  );
  detailsBorders.insertAdjacentHTML(
    'beforeend',
    data.borders ? data.borders.toString().replaceAll(',', ', ') : 'No borders'
  );
  detailsCapital.insertAdjacentHTML(
    'beforeend',
    data.capital.toString().replaceAll(',', ', ')
  );
  detailsCarDirection.insertAdjacentHTML(
    'beforeend',
    data.car.side.toString()[0].toUpperCase() + data.car.side.slice(1)
  );
  const arms = `<img src="${data.coatOfArms.svg}" alt="${data.demonyms.eng.m} arms" style="width: 12rem; margin-top: 0.4rem"; border-radius: 1rem>`;
  detailsCoatOfArms.insertAdjacentHTML('beforeend', arms);
  detailsContinents.insertAdjacentHTML(
    'beforeend',
    data.continents.toString().replaceAll(',', ', ')
  );
  const cur = data.currencies;
  detailsCurrencies.insertAdjacentHTML(
    'beforeend',
    `${cur[Object.keys(cur)[0]].name} (${cur[Object.keys(cur)[0]].symbol})`
  );
  detailsIdd.insertAdjacentHTML('beforeend', data.idd.root);
  detailsIndependent.insertAdjacentHTML(
    'beforeend',
    data.independent ? 'Yes' : 'No'
  );
  detailsLandlocked.insertAdjacentHTML(
    'beforeend',
    data.landlocked ? 'Yes' : 'No'
  );
};

search.addEventListener('click', async function () {
  if (input.value !== '') {
    const data = await getData(`name/${input.value}`);
    renderCountries(data);
    document.querySelector('.show-all').style.display = 'block';
  }
});

goBack.addEventListener('click', function () {
  document.querySelector('.show-all').style.display = 'none';
  input.value = '';
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

detailsExit.addEventListener('click', () => {
  detailsFlag.removeChild(detailsFlag.lastChild);
  detailsCoatOfArms.removeChild(detailsCoatOfArms.lastChild);
  [
    detailsAltSpellings,
    detailsBorders,
    detailsCapital,
    detailsCarDirection,
    detailsContinents,
    detailsCurrencies,
    detailsIdd,
    detailsIndependent,
    detailsLandlocked,
  ].forEach(domItem => {
    while (domItem.hasChildNodes()) {
      domItem.removeChild(domItem.firstChild);
    }
  });

  details.style.display = 'none';
});

const init = async function () {
  const data = await getData('all');
  renderCountries(data);
  let _docHeight =
    document.height !== undefined
      ? document.height
      : document.body.offsetHeight;
  details.style.height = _docHeight + 'px';
};

init();
