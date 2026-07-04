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

  #formatList(data, fallback = 'No data') {
    if (!data?.length) return fallback;
    return data.join(', ');
  }

  #formatBoolean(data) {
    if (data === undefined || data === null) return 'No data';
    return data ? 'Yes' : 'No';
  }

  #formatTitleCase(data) {
    if (!data) return 'No data';
    return data.toString()[0].toUpperCase() + data.toString().slice(1);
  }

  #formatCurrencies(data) {
    if (!data?.length) return 'No data';
    return data.map(cur => `${cur.name} (${cur.symbol || '?'})`).join(', ');
  }

  #formatLanguages(data) {
    if (!data?.length) return 'No data';
    return data.map(lang => lang.name || lang).join(', ');
  }

  #formatDialingCodes(data) {
    if (!data?.length) return 'No data';
    return data.map(code => `+${code}`).join(', ');
  }

  #formatPopulation(data) {
    if (!data) return 'No data';
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  #renderImage(element, src, alt) {
    const content = src
      ? `<img src="${src}" alt="${alt}" class="details-img" />`
      : '<p class="details-text">No data</p>';

    insert(element, content);
  }

  #setMapLink(element, href) {
    if (href) element.setAttribute('href', href);
    else element.removeAttribute('href');
  }

  render(data) {
    this.#body.style.overflowY = 'hidden';
    this.#details.style.display = 'grid';

    this.#renderImage(this.#detailsFlag, data.flag, `${data.name} flag`);
    this.#renderImage(this.#detailsCoatOfArms, data.coatOfArms, `${data.name} arms`);
    insert(this.#detailsAltSpellings, this.#formatList(data.altSpellings));
    insert(this.#detailsBorders, this.#formatList(data.borders, 'No borders'));
    insert(this.#detailsCapital, data.capital || 'No data');
    insert(this.#detailsCarDirection, this.#formatTitleCase(data.carDirection));
    insert(this.#detailsContinents, this.#formatList(data.continents));
    insert(this.#detailsCurrencies, this.#formatCurrencies(data.currencies));
    insert(this.#detailsIdd, this.#formatDialingCodes(data.dialingCodes));
    insert(this.#detailsIndependent, this.#formatBoolean(data.independent));
    insert(this.#detailsLandlocked, this.#formatBoolean(data.landlocked));
    insert(this.#detailsLanguages, this.#formatLanguages(data.languages));
    insert(this.#detailsLocation, this.#formatList(data.location));
    insert(this.#detailsPopulation, this.#formatPopulation(data.population));
    insert(this.#detailsRegion, `${data.region || 'No data'} / ${data.subregion || '?'}`);
    insert(this.#detailsStartOfWeek, this.#formatTitleCase(data.startOfWeek));
    insert(this.#detailsTimezones, this.#formatList(data.timezones));
    insert(this.#detailsTld, this.#formatList(data.topLevelDomain));
    insert(this.#detailsUnMember, this.#formatBoolean(data.unMember));
    this.#setMapLink(this.#detailsMapsGoogle, data.maps.google);
    this.#setMapLink(this.#detailsMapsOpenSt, data.maps.openStreetMaps);
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
