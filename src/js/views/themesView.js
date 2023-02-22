import View from './View';

class ThemesView extends View {
  #body = document.querySelector('body');
  #detailsTitle = document.querySelector('.details__title');
  #cflexTitle = document.querySelector('.cflex__title');
  #country = document.querySelectorAll('.country');
  #countryTool = document.querySelectorAll('.country-tool');
  #footer = document.querySelector('footer');
  #footerText = document.querySelector('.footer__text');
  #footerTextLink = document.querySelectorAll('.footer__link');
  #hero = document.querySelector('.hero');
  #heroTitle = document.querySelector('.hero__title');
  #heroDescription = document.querySelector('.hero__description');
  #search = document.querySelector('.search');
  #searchInput = document.querySelector('.search__input');
  #searchIcon = document.querySelector('.search__icon');
  #toolbarIcon = document.querySelectorAll('.toolbar__icon');
  #details = document.querySelector('.details');
  #detailsListItem = document.querySelectorAll('.details__list-item');
  #dayIcon = document.querySelector('.toolbar__theme--day-icon');
  #nightIcon = document.querySelector('.toolbar__theme--night-icon');
  #badRequestText = document.querySelector('.cflex__bad-request');
  #notFoundText = document.querySelector('.cflex__not-found');

  setNightMode() {
    document.documentElement.style.setProperty('color-scheme', 'dark');

    this.#dayIcon.classList.add('disabled');
    this.#nightIcon.classList.remove('disabled');

    this.#country = document.querySelectorAll('.country');

    this.#body.classList.add('body--dark');
    this.#detailsTitle.classList.add('details__title--dark');
    this.#cflexTitle.classList.add('cflex__title--dark');
    this.#country.forEach(item => item.classList.add('country--dark'));
    this.#countryTool.forEach(item => item.classList.add('country-tool--dark'));
    this.#footer.classList.add('footer--dark');
    this.#footerText.classList.add('footer__text--dark');
    this.#footerTextLink.forEach(item => item.classList.add('footer__link--dark'));
    this.#hero.classList.add('hero--dark');
    this.#heroTitle.classList.add('hero__title--dark');
    this.#heroDescription.classList.add('hero__description--dark');
    this.#search.classList.add('search--dark');
    this.#searchInput.classList.add('search__input--dark');
    this.#searchIcon.classList.add('search__icon--dark');
    this.#badRequestText.classList.add('cflex__bad-request--dark');
    this.#notFoundText.classList.add('cflex__not-found--dark');
    this.#toolbarIcon.forEach(item => item.classList.add('toolbar__icon--dark'));
    this.#details.classList.add('details--dark');
    this.#detailsListItem.forEach(item => item.classList.add('details__list-item--dark'));
  }

  setDayMode() {
    document.documentElement.style.setProperty('color-scheme', 'light');

    this.#dayIcon.classList.remove('disabled');
    this.#nightIcon.classList.add('disabled');

    this.#country = document.querySelectorAll('.country');

    this.#body.classList.remove('body--dark');
    this.#detailsTitle.classList.remove('details__title--dark');
    this.#cflexTitle.classList.remove('cflex__title--dark');
    this.#country.forEach(item => item.classList.remove('country--dark'));
    this.#countryTool.forEach(item => item.classList.remove('country-tool--dark'));
    this.#footer.classList.remove('footer--dark');
    this.#footerText.classList.remove('footer__text--dark');
    this.#footerTextLink.forEach(itm => itm.classList.remove('footer__link--dark'));
    this.#hero.classList.remove('hero--dark');
    this.#heroTitle.classList.remove('hero__title--dark');
    this.#heroDescription.classList.remove('hero__description--dark');
    this.#search.classList.remove('search--dark');
    this.#searchInput.classList.remove('search__input--dark');
    this.#searchIcon.classList.remove('search__icon--dark');
    this.#badRequestText.classList.remove('cflex__bad-request--dark');
    this.#notFoundText.classList.remove('cflex__not-found--dark');
    this.#toolbarIcon.forEach(item => item.classList.remove('toolbar__icon--dark'));
    this.#details.classList.remove('details--dark');
    this.#detailsListItem.forEach(item =>
      item.classList.remove('details__list-item--dark'),
    );
  }
}

export default new ThemesView();
