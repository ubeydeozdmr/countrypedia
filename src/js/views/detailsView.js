import { clear, insert } from '../helpers';
import View from './View';

class DetailsView extends View {
  body = document.querySelector('body');
  details = document.querySelector('.popup');
  detailsContent = document.querySelector('.details__content');
  osmap = document.querySelector('.details__map-button--openstreetmap');
  gmaps = document.querySelector('.details__map-button--googlemaps');
  saveIcon = document.querySelector('.details__save-icon .save');
  unsaveIcon = document.querySelector('.details__save-icon .unsave');
  detailsButton = document.querySelector('.details__title-button--details');
  mapButton = document.querySelector('.details__title-button--map');
  switchCheckButton = document.querySelector('.switch input[type="checkbox"]');
  detailsErrorMsgBox = document.querySelector('details__bad-request');
  detailsErrorMsg = document.querySelector('details__bad-request error-message');

  #buttonHoverHandler(detailsButton, mapButton, display) {
    this.detailsButton.style.backgroundColor = detailsButton;
    this.mapButton.style.backgroundColor = mapButton;
    [this.detailsButton, this.mapButton].forEach(el => {
      el.addEventListener('mouseover', () => {
        el.style.backgroundColor = '#dddddd';
      });
    });
    this.detailsButton.addEventListener('mouseleave', () => {
      this.detailsButton.style.backgroundColor = detailsButton;
    });
    this.mapButton.addEventListener('mouseleave', () => {
      this.mapButton.style.backgroundColor = mapButton;
    });
    document.querySelector('.details__buttonbar').style.display = display;
  }

  renderError() {
    this.spinnerDetails.style.display = 'none';
    const errorMessage = `
      <div></div>
      <div></div>
      <p class="error-message">
        We've encountered an error. Please try again later.
      </p>
    `;
    insert(this.detailsContent, errorMessage);
  }

  renderPre() {
    this.#buttonHoverHandler('#eeeeee', 'transparent', 'none');
    this.isDetailsOpened = true;
    document.querySelector('nav.search').style.zIndex = '8';
    this.renderSpinner('details');

    this.body.style.overflowY = 'hidden';
    this.details.classList.remove('hidden');
  }

  #formatNumber(data) {
    if (data === undefined || data === null) return 'No data';
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  #formatArea(data) {
    if (data === undefined || data === null) return 'No data';
    return `${this.#formatNumber(data)} km2`;
  }

  #formatDensity(data) {
    if (data === undefined || data === null) return 'No data';
    return `${data} people / km2`;
  }

  #formatCodes(data) {
    return [
      data.cca2 && `Alpha-2: ${data.cca2}`,
      data.cca3 && `Alpha-3: ${data.cca3}`,
      data.numericCode && `Numeric: ${data.numericCode}`,
    ]
      .filter(Boolean)
      .join(', ');
  }

  #formatRegionalBlocs(data) {
    if (!data?.length) return 'No data';
    return data
      .map(bloc => `${bloc.name}${bloc.acronym ? ` (${bloc.acronym})` : ''}`)
      .join(', ');
  }

  render(data, isSaved, theme) {
    this.#buttonHoverHandler('#eeeeee', 'transparent', 'none');
    data = data[0];

    if (isSaved) {
      this.saveIcon.classList.add('disabled');
      this.unsaveIcon.classList.remove('disabled');
    } else {
      this.saveIcon.classList.remove('disabled');
      this.unsaveIcon.classList.add('disabled');
    }

    const currencyValues = Object.values(data.currencies || {});
    const languageValues = Object.values(data.languages || {});
    let currencies = '';
    let languages = '';

    if (currencyValues.length > 0)
      currencyValues.forEach(cur => {
        currencies += `${cur.name} (${cur.symbol || '?'}), `;
      });
    else currencies = 'No data  ';

    if (languageValues.length > 0)
      languageValues.forEach(lang => {
        languages += `${lang}, `;
      });
    else languages = 'No data  ';

    const markup = `
    <div class="details__flag">
      <img src="${data.flags.svg}" alt="${
      data.flags.alt || data.demonyms?.eng?.m + ' flag'
    }" />
    </div>
    <div class="details__list">
      <div class="details__list-item details__list-item--${theme}">
        <p>Alt Spellings:</p>
        <span>${data.name.common + ', ' + data.altSpellings.join(', ')}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Area:</p>
        <span>${this.#formatArea(data.area)}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Borders:</p>
        <span>${data.borders?.length ? data.borders.join(', ') : 'No borders'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Capital:</p>
        <span>${data.capital?.join(', ') || 'No data'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Country Codes:</p>
        <span>${this.#formatCodes(data) || 'No data'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Currencies:</p>
        <span>${currencies.slice(0, currencies.length - 2)}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Demonym:</p>
        <span>${data.demonym || 'No data'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Direct Dialing Code:</p>
        <span>${data.idd.suffixes?.length ? data.idd.suffixes.map(code => `${data.idd.root}${code}`).join(', ') : 'No data'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Flag Emoji:</p>
        <span>${data.flag || 'No data'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>GINI:</p>
        <span>${data.gini ?? 'No data'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Independent:</p>
        <span>${data.independent ? 'Yes' : 'No'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Native Name:</p>
        <span>${data.nativeName || 'No data'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Languages:</p>
        <span>${languages.slice(0, languages.length - 2)}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Location:</p>
        <span>${data.latlng.join(', ')}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Population:</p>
        <span>${this.#formatNumber(data.population)}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Population Density:</p>
        <span>${this.#formatDensity(data.populationDensity)}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Region:</p>
        <span>${data.region} / ${data.subregion || '?'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Regional Blocs:</p>
        <span>${this.#formatRegionalBlocs(data.regionalBlocs)}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Timezones:</p>
        <span>${data.timezones.join(', ')}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Top Level Domain:</p>
        <span>${data.tld?.join(', ') || 'No data'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Olympic Code:</p>
        <span>${data.cioc || 'No data'}</span>
      </div>
    </div>
`;

    this.spinnerDetails.style.display = 'none';
    insert(this.detailsContent, markup);
    this.osmap.setAttribute('href', data.maps.openStreetMaps);
    this.gmaps.setAttribute('href', data.maps.googleMaps);
  }

  renderMap(data) {
    data = data[0];
    this.#buttonHoverHandler('transparent', '#eeeeee', 'flex');
    const markup = `<div id="map" class="map"></div>`;
    insert(document.querySelector('.details__content'), markup);

    const map = L.map('map').setView([data.latlng[0], data.latlng[1]], 5);
    const marker = L.marker([
      data.capitalInfo.latlng ? data.capitalInfo.latlng[0] : data.latlng[0],
      data.capitalInfo.latlng ? data.capitalInfo.latlng[1] : data.latlng[1],
    ]).addTo(map);
    marker.bindPopup(
      `<b style="font-size:1.6rem">${data.name.common}</b><p style="font-size:1rem">${
        data?.capital || 'No capital'
      }</p>`,
      { closeButton: true },
    ); /*.openPopup();*/
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 650;
    map.getPane('labels').style.pointerEvents = 'none';

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
      attribution:
        '<a target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/copyright">©OpenStreetMap</a>, <a target="_blank" rel="noopener noreferrer" href="https://github.com/CartoDB/cartodb/blob/master/LICENSE">©CartoDB</a>',
    }).addTo(map);
  }

  hide() {
    clear(document.querySelector('.details__content'));
    this.details.classList.add('hidden');
    this.body.style.overflowY = 'auto';
    this.isDetailsOpened = false;
    this.switchCheckButton.checked = false;
  }
}

export default new DetailsView();
