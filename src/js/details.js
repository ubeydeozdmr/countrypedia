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
const detailsLanguages = document.querySelector('.details-languages');
const detailsLocation = document.querySelector('.details-location');
const detailsMapsGoogle = document.querySelector('.details-map-link--google');
const detailsMapsOpenSt = document.querySelector('.details-map-link--openst');
const detailsPopulation = document.querySelector('.details-population');
const detailsRegion = document.querySelector('.details-region');
const detailsStartOfWeek = document.querySelector('.details-start-of-week');
const detailsTimezones = document.querySelector('.details-timezones');
const detailsTld = document.querySelector('.details-top-level-domain');
const detailsUnMember = document.querySelector('.details-un-member');

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
    detailsLanguages,
    detailsLocation,
    detailsPopulation,
    detailsRegion,
    detailsStartOfWeek,
    detailsTimezones,
    detailsTld,
    detailsUnMember,
  ].forEach(domItem => itemCleaner(domItem));

  details.style.display = 'none';
  document.querySelector('body').style.overflowY = 'auto';
});

const insertData = (element, action) =>
  element.insertAdjacentHTML('beforeend', action);

const itemCleaner = parentItem => {
  while (parentItem.hasChildNodes())
    parentItem.removeChild(parentItem.firstChild);
};

export const renderDetailsContent = function (data) {
  const flag = `<img src="${data.flags.svg}" alt="${data.demonyms.eng.m} flag" class="details-img" />`;
  const arms = `<img src="${data.coatOfArms.svg}" alt="${data.demonyms.eng.m} arms" class="details-img" />`;

  insertData(detailsFlag, flag);

  insertData(
    detailsAltSpellings,
    data.altSpellings.toString().replaceAll(',', ', ')
  );

  insertData(
    detailsBorders,
    data.borders ? data.borders.toString().replaceAll(',', ', ') : 'No borders'
  );

  insertData(detailsCapital, data.capital.toString().replaceAll(',', ', '));

  insertData(
    detailsCarDirection,
    data.car.side.toString()[0].toUpperCase() + data.car.side.slice(1)
  );

  insertData(detailsCoatOfArms, arms);

  insertData(
    detailsContinents,
    data.continents.toString().replaceAll(',', ', ')
  );

  for (const [_, value] of Object.entries(data.currencies)) {
    let currencies = '';
    currencies += `${value.name} (${value.symbol}), `;
    insertData(detailsCurrencies, currencies);
  }

  insertData(detailsIdd, data.idd.root);

  insertData(detailsIndependent, data.independent ? 'Yes' : 'No');

  insertData(detailsLandlocked, data.landlocked ? 'Yes' : 'No');

  for (const [_, value] of Object.entries(data.languages)) {
    let languages = '';
    languages += `${value}, `;
    insertData(detailsLanguages, languages);
  }

  insertData(detailsLocation, data.latlng.toString().replace(',', ', '));

  detailsMapsGoogle.setAttribute('href', data.maps.googleMaps);
  detailsMapsOpenSt.setAttribute('href', data.maps.openStreetMaps);

  insertData(
    detailsPopulation,
    data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  );

  insertData(detailsRegion, `${data.region} / ${data.subregion}`);

  insertData(
    detailsStartOfWeek,
    data.startOfWeek.toString()[0].toUpperCase() +
      data.startOfWeek.toString().slice(1)
  );

  insertData(detailsTimezones, data.timezones.toString().replaceAll(',', ', '));

  insertData(detailsTld, data.tld);

  insertData(detailsUnMember, data.unMember ? 'Yes' : 'No');
};
