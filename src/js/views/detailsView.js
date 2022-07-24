import { clear, insert } from '../helpers';
import View from './View';

class DetailsView extends View {
  body = document.querySelector('body');
  details = document.querySelector('.popup');
  osmap = document.querySelector('.details__map-button--openstreetmap');
  gmaps = document.querySelector('.details__map-button--googlemaps');
  saveIcon = document.querySelector('.details__save-icon .save');
  unsaveIcon = document.querySelector('.details__save-icon .unsave');

  renderPre() {
    this.isDetailsOpened = true;
    document.querySelector('nav.search').style.zIndex = '8';

    this.body.style.overflowY = 'hidden';
    this.details.classList.remove('hidden');
  }

  render(data, isSaved) {
    data = data[0];

    if (isSaved) {
      this.saveIcon.classList.add('disabled');
      this.unsaveIcon.classList.remove('disabled');
    } else {
      this.saveIcon.classList.remove('disabled');
      this.unsaveIcon.classList.add('disabled');
    }
    isSaved;

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
      <img src="${data.coatOfArms.svg}" alt="${
      data.demonyms?.eng?.m
    } arms" class="details-img" />
    </div>
    <div class="details__list">
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Alt Spellings:</p>
        <span>${data.altSpellings.join(', ')}</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Borders:</p>
        <span>${data.borders ? data.borders.join(', ') : 'No borders'}</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Capital:</p>
        <span>${data.capital?.join(', ') || 'No data'}</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Car Driving Direction:</p>
        <span>${
          data.car.side.toString()[0].toUpperCase() + data.car.side.slice(1)
        }</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Continents:</p>
        <span>${data.continents.join(', ')}</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Currencies:</p>
        <span>${currencies.slice(0, currencies.length - 2)}</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Direct Dialing Code:</p>
        <span>${
          data.cca3 === 'USA'
            ? '+1'
            : data.cca3 === 'ATA'
            ? 'No data'
            : data.idd.root + data.idd.suffixes[0]
        }</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Independent:</p>
        <span>${data.independent ? 'Yes' : 'No'}</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Landlocked:</p>
        <span>${data.landlocked ? 'Yes' : 'No'}</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Languages:</p>
        <span>${languages.slice(0, languages.length - 2)}</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Location:</p>
        <span>${data.latlng.join(', ')}</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Population:</p>
        <span>${data.population
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Region:</p>
        <span>${data.region} / ${data.subregion || '?'}</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Start of Week:</p>
        <span>${
          data.startOfWeek[0].toUpperCase() + data.startOfWeek.toString().slice(1)
        }</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Timezones:</p>
        <span>${data.timezones.join(', ')}</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
        <p>Top Level Domain:</p>
        <span>${data.tld.join(', ')}</span>
      </div>
      <div class="details__list-item details__list-item--${View.theme}">
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

  hide() {
    clear(document.querySelector('.details__content'));
    this.details.classList.add('hidden');
    this.body.style.overflowY = 'auto';
    this.isDetailsOpened = false;
  }
}

export default new DetailsView();
