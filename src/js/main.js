'use strict';

import { setDayMode, setNightMode } from './themes';
import { renderDetailsContent } from './details';

const listCards = document.querySelector('.list-cards');
const details = document.querySelector('.details');
const input = document.querySelector('.search-input');
const search = document.querySelector('.search-btn');
const showAllTextKeyword = document.querySelector('.show-all-text-keyword');
const toggler = document.querySelector('.night-mode');
const goBack = document.querySelector('.show-all-text-click');

const getData = async function (keyword) {
  const res = await fetch(`https://restcountries.com/v3.1/${keyword}`);
  const data = await res.json();
  // console.log(data);
  // console.log(data[0]);
  return data;
};

const renderCountries = function (data) {
  itemCleaner(listCards);

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
  renderDetailsContent(data);
};

search.addEventListener('click', async function () {
  if (input.value !== '') {
    const data = await getData(`name/${input.value}`);
    renderCountries(data);
    document.querySelector('.show-all').style.display = 'block';
    itemCleaner(showAllTextKeyword);
    showAllTextKeyword.insertAdjacentHTML('beforeend', input.value);
    input.value = '';
    let theme = localStorage.getItem('theme');
    theme === 'day' ? setDayMode() : setNightMode();
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
  let theme = localStorage.getItem('theme');
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
  const data = await getData('all');
  renderCountries(data);
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'day');
  } else {
    let theme = localStorage.getItem('theme');
    theme === 'day' ? setDayMode() : setNightMode();
  }
  let _docHeight =
    document.height !== undefined
      ? document.height
      : document.body.offsetHeight;
  details.style.height = _docHeight + 'px';
};

init();

const itemCleaner = parentItem => {
  while (parentItem.hasChildNodes())
    parentItem.removeChild(parentItem.firstChild);
};
