import { clear, insert } from '../helpers';
import View from './View';

class DetailsView extends View {
  body = document.querySelector('body');
  details = document.querySelector('.popup');
  osmap = document.querySelector('.details__map-button--openstreetmap');
  gmaps = document.querySelector('.details__map-button--googlemaps');
  saveIcon = document.querySelector('.details__save-icon .save');
  unsaveIcon = document.querySelector('.details__save-icon .unsave');
  detailsButton = document.querySelector('.details__title-button--details');
  mapButton = document.querySelector('.details__title-button--map');

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

  renderPre() {
    this.#buttonHoverHandler('#eeeeee', 'transparent', 'none');
    this.isDetailsOpened = true;
    document.querySelector('nav.search').style.zIndex = '8';
    this.renderSpinner('details');

    this.body.style.overflowY = 'hidden';
    this.details.classList.remove('hidden');
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

    let currencies = '';
    let languages = '';

    if (data.currencies)
      Object.values(data.currencies).forEach(cur => {
        currencies += `${cur.name} (${cur.symbol || '?'}), `;
      });
    else currencies = 'No data  ';

    if (data.languages)
      Object.values(data.languages).forEach(lang => {
        languages += `${lang}, `;
      });
    else languages = 'No data  ';

    const markup = `
    <div class="details__flag">
      <img src="${data.flags.svg}" alt="${
      data.demonyms?.eng?.m
    } flag" class="details-img" />
    </div>
    <div class="details__arms">
      ${
        data.coatOfArms.svg
          ? `<img src=${data.coatOfArms.svg} alt=${data.demonyms?.eng?.m}></img>`
          : 'No arms'
      }
    </div>
    <div class="details__list">
      <div class="details__list-item details__list-item--${theme}">
        <p>Alt Spellings:</p>
        <span>${data.name.common + ', ' + data.altSpellings.join(', ')}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Borders:</p>
        <span>${data.borders ? data.borders.join(', ') : 'No borders'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Capital:</p>
        <span>${data.capital?.join(', ') || 'No data'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Car Driving Direction:</p>
        <span>${data.car.side.toString()[0].toUpperCase() + data.car.side.slice(1)}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Continents:</p>
        <span>${data.continents.join(', ')}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Currencies:</p>
        <span>${currencies.slice(0, currencies.length - 2)}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Direct Dialing Code:</p>
        <span>${
          data.cca3 === 'USA'
            ? '+1'
            : data.cca3 === 'ATA' || data.cca3 === 'HMD'
            ? 'No data'
            : data.idd.root + data.idd.suffixes[0]
        }</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>GINI${data.gini ? `(${Object.keys(data.gini)[0]})` : ''}:</p>
        <span>${data.gini ? Object.values(data.gini)[0] : 'No data'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Independent:</p>
        <span>${data.independent ? 'Yes' : 'No'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Landlocked:</p>
        <span>${data.landlocked ? 'Yes' : 'No'}</span>
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
        <span>${data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Region:</p>
        <span>${data.region} / ${data.subregion || '?'}</span>
      </div>
      <div class="details__list-item details__list-item--${theme}">
        <p>Start of Week:</p>
        <span>${
          data.startOfWeek[0].toUpperCase() + data.startOfWeek.toString().slice(1)
        }</span>
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
        <p>United Nations Member:</p>
        <span>${data.unMember ? 'Yes' : 'No'}</span>
      </div>
    </div>
`;

    this.spinnerDetails.style.display = 'none';
    insert(document.querySelector('.details__content'), markup);
    this.osmap.setAttribute('href', data.maps.openStreetMaps);
    this.gmaps.setAttribute('href', data.maps.googleMaps);
  }

  renderMap(data) {
    data = data[0];
    this.#buttonHoverHandler('transparent', '#eeeeee', 'flex');
    const markup = `<div id="map" class="map"></div>`;
    insert(document.querySelector('.details__content'), markup);

    var map = L.map('map').setView([data.latlng[0], data.latlng[1]], 5);
    var marker = L.marker([
      data.capitalInfo.latlng ? data.capitalInfo.latlng[0] : data.latlng[0],
      data.capitalInfo.latlng ? data.capitalInfo.latlng[1] : data.latlng[1],
    ]).addTo(map);
    marker.bindPopup(
      `<b style="font-size:1.6rem">${data.name.common}</b><p style="font-size:1rem">${
        data?.capital || 'No capital'
      }</p>`,
      { closeButton: false }
    ); /*.openPopup();*/
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 650;
    map.getPane('labels').style.pointerEvents = 'none';

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png',
      {
        attribution: '©OpenStreetMap, ©CartoDB',
      }
    ).addTo(map);

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png',
      {
        attribution: '©OpenStreetMap, ©CartoDB',
        pane: 'labels',
      }
    ).addTo(map);
  }

  hide() {
    clear(document.querySelector('.details__content'));
    this.details.classList.add('hidden');
    this.body.style.overflowY = 'auto';
    this.isDetailsOpened = false;
  }
}

export default new DetailsView();
