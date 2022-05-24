import { clear, insert } from '../helpers';
import View from './View';

class DetailsView extends View {
  body = document.querySelector('body');
  details = document.querySelector('.popup');
  #detailsFlag = document.querySelector('.details__flag');
  #detailsAltSpellings = document.querySelector('.details__list--alt-spelling span');
  #detailsBorders = document.querySelector('.details__list--borders span');
  #detailsCapital = document.querySelector('.details__list--capital span');
  #detailsCarDirection = document.querySelector('.details__list--cdd span');
  #detailsCoatOfArms = document.querySelector('.details__arms');
  #detailsContinents = document.querySelector('.details__list--continents span');
  #detailsCurrencies = document.querySelector('.details__list--currencies span');
  #detailsDialingCode = document.querySelector('.details__list--dialing-code span');
  #detailsIndependent = document.querySelector('.details__list--independent span');
  #detailsLandlocked = document.querySelector('.details__list--landlocked span');
  #detailsLanguages = document.querySelector('.details__list--languages span');
  #detailsLocation = document.querySelector('.details__list--location span');
  #detailsMapsGoogle = document.querySelector('.details__map-button--googlemaps');
  // #detailsMapsOpenSt = document.querySelector('.details-map-link--openst');
  #detailsPopulation = document.querySelector('.details__list--population span');
  #detailsRegion = document.querySelector('.details__list--region span');
  #detailsStartOfWeek = document.querySelector('.details__list--start-of-week span');
  #detailsTimezones = document.querySelector('.details__list--timezones span');
  #detailsTld = document.querySelector('.details__list--tld span');
  #detailsUnMember = document.querySelector('.details__list--un-member span');

  render(data) {
    this.isDetailsOpened = true;
    document.querySelector('nav.search').style.zIndex = '8';

    this.body.style.overflowY = 'hidden';
    this.details.classList.remove('hidden');
    // this.details.style.visibility = 'visible';
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
    insert(this.#detailsDialingCode, data.idd.root || 'No data');
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
    // this.#detailsMapsOpenSt.setAttribute('href', data.maps.openStreetMaps);

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
      this.#detailsDialingCode,
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

    // this.#details.style.visibility = 'hidden';
    this.details.classList.add('hidden');
    this.body.style.overflowY = 'auto';
    this.isDetailsOpened = false;
  }
}

export default new DetailsView();
