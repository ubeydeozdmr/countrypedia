import { clear, insert } from '../helpers';
import View from './View';

class DetailsView extends View {
  #body = document.querySelector('body');
  #details = document.querySelector('.details');
  #detailsFlag = document.querySelector('.details-flag');
  #detailsAltSpellings = document.querySelector('.details-alt-spellings');
  #detailsArea = document.querySelector('.details-area');
  #detailsBorders = document.querySelector('.details-borders');
  #detailsCapital = document.querySelector('.details-capital');
  #detailsCioc = document.querySelector('.details-cioc');
  #detailsCodes = document.querySelector('.details-codes');
  #detailsCurrencies = document.querySelector('.details-currencies');
  #detailsDemonym = document.querySelector('.details-demonym');
  #detailsFlagEmoji = document.querySelector('.details-flag-emoji');
  #detailsGini = document.querySelector('.details-gini');
  #detailsIdd = document.querySelector('.details-idd');
  #detailsIndependent = document.querySelector('.details-independent');
  #detailsLanguages = document.querySelector('.details-languages');
  #detailsLocation = document.querySelector('.details-location');
  #detailsMapsGoogle = document.querySelector('.details-map-link--google');
  #detailsMapsOpenSt = document.querySelector('.details-map-link--openst');
  #detailsNativeName = document.querySelector('.details-native-name');
  #detailsPopulation = document.querySelector('.details-population');
  #detailsPopulationDensity = document.querySelector('.details-population-density');
  #detailsRegion = document.querySelector('.details-region');
  #detailsRegionalBlocs = document.querySelector('.details-regional-blocs');
  #detailsTimezones = document.querySelector('.details-timezones');
  #detailsTld = document.querySelector('.details-top-level-domain');

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

  #formatNumber(data) {
    if (data === undefined || data === null) return 'No data';
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  #formatArea(data) {
    if (data === undefined || data === null) return 'No data';
    return `${this.#formatNumber(data)} sq km`;
  }

  #formatDensity(data) {
    if (data === undefined || data === null) return 'No data';
    return `${data} people / sq km`;
  }

  #formatGini(data) {
    if (data === undefined || data === null) return 'No data';
    return data.toString();
  }

  #formatCodes(data) {
    const codes = [
      data.alpha2 && `Alpha-2: ${data.alpha2}`,
      data.alpha3 && `Alpha-3: ${data.alpha3}`,
      data.numeric && `Numeric: ${data.numeric}`,
    ].filter(Boolean);

    return this.#formatList(codes);
  }

  #formatRegionalBlocs(data) {
    if (!data?.length) return 'No data';
    return data
      .map(bloc => `${bloc.name}${bloc.acronym ? ` (${bloc.acronym})` : ''}`)
      .join(', ');
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
    insert(this.#detailsAltSpellings, this.#formatList(data.altSpellings));
    insert(this.#detailsArea, this.#formatArea(data.area));
    insert(this.#detailsBorders, this.#formatList(data.borders, 'No borders'));
    insert(this.#detailsCapital, data.capital || 'No data');
    insert(this.#detailsCioc, data.cioc || 'No data');
    insert(this.#detailsCodes, this.#formatCodes(data.codes));
    insert(this.#detailsCurrencies, this.#formatCurrencies(data.currencies));
    insert(this.#detailsDemonym, data.demonym || 'No data');
    insert(this.#detailsFlagEmoji, data.flagEmoji || 'No data');
    insert(this.#detailsGini, this.#formatGini(data.gini));
    insert(this.#detailsIdd, this.#formatDialingCodes(data.dialingCodes));
    insert(this.#detailsIndependent, this.#formatBoolean(data.independent));
    insert(this.#detailsLanguages, this.#formatLanguages(data.languages));
    insert(this.#detailsLocation, this.#formatList(data.location));
    insert(this.#detailsNativeName, data.nativeName || 'No data');
    insert(this.#detailsPopulation, this.#formatNumber(data.population));
    insert(
      this.#detailsPopulationDensity,
      this.#formatDensity(data.populationDensity)
    );
    insert(this.#detailsRegion, `${data.region || 'No data'} / ${data.subregion || '?'}`);
    insert(this.#detailsRegionalBlocs, this.#formatRegionalBlocs(data.regionalBlocs));
    insert(this.#detailsTimezones, this.#formatList(data.timezones));
    insert(this.#detailsTld, this.#formatList(data.topLevelDomain));
    this.#setMapLink(this.#detailsMapsGoogle, data.maps.google);
    this.#setMapLink(this.#detailsMapsOpenSt, data.maps.openStreetMaps);
  }

  hide() {
    this.#detailsFlag.removeChild(this.#detailsFlag.lastChild);
    [
      this.#detailsAltSpellings,
      this.#detailsArea,
      this.#detailsBorders,
      this.#detailsCapital,
      this.#detailsCioc,
      this.#detailsCodes,
      this.#detailsCurrencies,
      this.#detailsDemonym,
      this.#detailsFlagEmoji,
      this.#detailsGini,
      this.#detailsIdd,
      this.#detailsIndependent,
      this.#detailsLanguages,
      this.#detailsLocation,
      this.#detailsNativeName,
      this.#detailsPopulation,
      this.#detailsPopulationDensity,
      this.#detailsRegion,
      this.#detailsRegionalBlocs,
      this.#detailsTimezones,
      this.#detailsTld,
    ].forEach(domItem => clear(domItem));

    this.#details.style.display = 'none';
    this.#body.style.overflowY = 'auto';
  }
}

export default new DetailsView();
