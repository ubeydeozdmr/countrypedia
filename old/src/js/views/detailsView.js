import { clear, insert } from '../helpers';
import View from './View';

class DetailsView extends View {
  #body = document.querySelector('body');
  #details = document.querySelector('.details');
  #detailsFlag = document.querySelector('.details-flag');
  #detailsAltSpellings = document.querySelector('.details-alt-spellings');
  #detailsBorders = document.querySelector('.details-borders');
  #detailsCapital = document.querySelector('.details-capital');
  #detailsCarDirection = document.querySelector('.details-car-direction');
  #detailsCoatOfArms = document.querySelector('.details-coat-of-arms');
  #detailsContinents = document.querySelector('.details-continents');
  #detailsCurrencies = document.querySelector('.details-currencies');
  #detailsIdd = document.querySelector('.details-idd');
  #detailsIndependent = document.querySelector('.details-independent');
  #detailsLandlocked = document.querySelector('.details-landlocked');
  #detailsLanguages = document.querySelector('.details-languages');
  #detailsLocation = document.querySelector('.details-location');
  #detailsMapsGoogle = document.querySelector('.details-map-link--google');
  #detailsMapsOpenSt = document.querySelector('.details-map-link--openst');
  #detailsPopulation = document.querySelector('.details-population');
  #detailsRegion = document.querySelector('.details-region');
  #detailsStartOfWeek = document.querySelector('.details-start-of-week');
  #detailsTimezones = document.querySelector('.details-timezones');
  #detailsTld = document.querySelector('.details-top-level-domain');
  #detailsUnMember = document.querySelector('.details-un-member');

  render(data) {
    this.#body.style.overflowY = 'hidden';
    this.#details.style.display = 'grid';
    data = data[0];

    const flag = `<img src="${data.flags.svg}" alt="${data.demonyms?.eng?.m} flag" class="details-img" />`;
    const arms = `<img src="${data.coatOfArms.svg}" alt="${data.demonyms?.eng?.m} arms" class="details-img" />`;

    insert(this.#detailsFlag, flag);
    insert(this.#detailsAltSpellings, data.altSpellings.join(', '));
    // prettier-ignore
    insert(this.#detailsBorders, data.borders ? data.borders.join(', ') : 'No borders');
    insert(this.#detailsCapital, data.capital?.join(', ') || 'No data');
    // prettier-ignore
    insert(this.#detailsCarDirection, data.car.side.toString()[0].toUpperCase() + data.car.side.slice(1));
    insert(this.#detailsCoatOfArms, arms);
    insert(this.#detailsContinents, data.continents.join(', '));
    insert(this.#detailsIdd, data.idd.root || 'No data');
    insert(this.#detailsIndependent, data.independent ? 'Yes' : 'No');
    insert(this.#detailsLandlocked, data.landlocked ? 'Yes' : 'No');
    insert(this.#detailsLocation, data.latlng.join(', '));
    // prettier-ignore
    insert(this.#detailsPopulation, data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
    insert(this.#detailsRegion, `${data.region} / ${data.subregion || '?'}`);
    // prettier-ignore
    insert(this.#detailsStartOfWeek, data.startOfWeek[0].toUpperCase() + data.startOfWeek.toString().slice(1));
    insert(this.#detailsTimezones, data.timezones.join(', '));
    insert(this.#detailsTld, data.tld.join(', '));
    insert(this.#detailsUnMember, data.unMember ? 'Yes' : 'No');
    this.#detailsMapsGoogle.setAttribute('href', data.maps.googleMaps);
    this.#detailsMapsOpenSt.setAttribute('href', data.maps.openStreetMaps);

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

    insert(this.#detailsCurrencies, currencies.slice(0, currencies.length - 2));
    insert(this.#detailsLanguages, languages.slice(0, languages.length - 2));
  }

  hide() {
    this.#detailsFlag.removeChild(this.#detailsFlag.lastChild);
    this.#detailsCoatOfArms.removeChild(this.#detailsCoatOfArms.lastChild);
    [
      this.#detailsAltSpellings,
      this.#detailsBorders,
      this.#detailsCapital,
      this.#detailsCarDirection,
      this.#detailsContinents,
      this.#detailsCurrencies,
      this.#detailsIdd,
      this.#detailsIndependent,
      this.#detailsLandlocked,
      this.#detailsLanguages,
      this.#detailsLocation,
      this.#detailsPopulation,
      this.#detailsRegion,
      this.#detailsStartOfWeek,
      this.#detailsTimezones,
      this.#detailsTld,
      this.#detailsUnMember,
    ].forEach(domItem => clear(domItem));

    this.#details.style.display = 'none';
    this.#body.style.overflowY = 'auto';
  }
}

export default new DetailsView();
