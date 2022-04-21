/**
 * @class View
 * @description Visual representation of the model.
 * @author Ubeyde Emir Özdemir
 */
class View {
  // #theme = 'day';
  theme;

  #body = document.querySelector('body');
  #listCards = document.querySelector('.list-cards');
  #spinner = document.querySelector('.loader-container');
  #showAll = document.querySelector('.show-all');
  #showAllTextKeyword = document.querySelector('.show-all-text-keyword');

  /**
   * @param {Node} parentItem
   * @description Delete all content of parent item which entered as parameter.
   */
  #clear(parentItem) {
    while (parentItem.hasChildNodes())
      parentItem.removeChild(parentItem.firstChild);
  }

  // render() {
  //   if (!localStorage.getItem('theme')) {
  //     localStorage.setItem('theme', 'day');
  //     this.#theme = localStorage.getItem('theme');
  //   } else {
  //     this.#theme = localStorage.getItem('theme');
  //     this.#theme === 'day' ? setDayMode() : setNightMode();
  //   }
  // }

  /**
   * @param {Array<Object>} data Data of all countries or search results
   */
  renderCountries(data) {
    this.#clear(this.#listCards);

    data.forEach(item => {
      const cardContent = `
        <hover cca3="${item.cca3}">
          <div class="list-card list-card--${this.theme}">
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

      this.#listCards.insertAdjacentHTML('beforeend', cardContent);
    });
    this.#spinner.style.display = 'none';
  }

  renderSpinner() {
    this.#spinner.style.display = 'flex';
  }

  /**
   * @param {Node} input An input which comes from input variable in controller.
   */
  renderShowAll(input) {
    this.#showAll.style.display = 'block';
    this.#clear(this.#showAllTextKeyword);
    this.#showAllTextKeyword.insertAdjacentHTML('beforeend', input.value);
    input.value = '';
  }

  /**
   * @param {Node} input An input which comes from input variable in controller.
   */
  hideShowAll(input) {
    this.#showAll.style.display = 'none';
    input.value = '';
    this.renderSpinner();
  }

  #popup = document.querySelector('.popup');
  #overlay = document.querySelector('.overlay');
  #errorMessage = document.querySelector('.error-message');

  renderError(errorMessage) {
    this.#clear(this.#errorMessage);
    this.#errorMessage.insertAdjacentHTML('beforeend', errorMessage);
    this.#popup.style.display = 'block';
    this.#overlay.style.display = 'block';
    this.#spinner.style.display = 'none';
  }

  dismissError() {
    this.#popup.style.display = 'none';
    this.#overlay.style.display = 'none';
  }

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

  #insertData = (element, action) =>
    element.insertAdjacentHTML('beforeend', action);

  renderDetails(data) {
    this.#body.style.overflowY = 'hidden';
    this.#details.style.display = 'grid';
    data = data[0];

    const flag = `<img src="${data.flags.svg}" alt="${data.demonyms.eng.m} flag" class="details-img" />`;
    const arms = `<img src="${data.coatOfArms.svg}" alt="${data.demonyms.eng.m} arms" class="details-img" />`;

    this.#insertData(this.#detailsFlag, flag);
    this.#insertData(this.#detailsAltSpellings, data.altSpellings.join(', '));
    // prettier-ignore
    this.#insertData(this.#detailsBorders, data.borders ? data.borders.join(', ') : 'No borders');
    this.#insertData(this.#detailsCapital, data.capital.join(', '));
    // prettier-ignore
    this.#insertData(this.#detailsCarDirection, data.car.side.toString()[0].toUpperCase() + data.car.side.slice(1));
    this.#insertData(this.#detailsCoatOfArms, arms);
    this.#insertData(this.#detailsContinents, data.continents.join(', '));
    this.#insertData(this.#detailsIdd, data.idd.root);
    this.#insertData(this.#detailsIndependent, data.independent ? 'Yes' : 'No');
    this.#insertData(this.#detailsLandlocked, data.landlocked ? 'Yes' : 'No');
    this.#insertData(this.#detailsLocation, data.latlng.join(', '));
    // prettier-ignore
    this.#insertData(this.#detailsPopulation, data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
    this.#insertData(this.#detailsRegion, `${data.region} / ${data.subregion}`);
    // prettier-ignore
    this.#insertData(this.#detailsStartOfWeek, data.startOfWeek[0].toUpperCase() + data.startOfWeek.toString().slice(1));
    this.#insertData(this.#detailsTimezones, data.timezones.join(', '));
    this.#insertData(this.#detailsTld, data.tld.join(', '));
    this.#insertData(this.#detailsUnMember, data.unMember ? 'Yes' : 'No');
    this.#detailsMapsGoogle.setAttribute('href', data.maps.googleMaps);
    this.#detailsMapsOpenSt.setAttribute('href', data.maps.openStreetMaps);

    Object.values(data.currencies).forEach(cur => {
      let currencies = '';
      currencies += `${cur.name} (${cur.symbol}), `;
      this.#insertData(this.#detailsCurrencies, currencies);
    });

    Object.values(data.languages).forEach(lang => {
      let languages = '';
      languages += `${lang}, `;
      this.#insertData(this.#detailsLanguages, languages);
    });
  }

  hideDetails() {
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
    ].forEach(domItem => this.#clear(domItem));

    this.#details.style.display = 'none';
    this.#body.style.overflowY = 'auto';
  }

  #toolbarIcons = document.querySelector('.toolbar-icons');
  #themeIcon = document.querySelector('.night-mode svg path');
  #githubIcon = document.querySelector('.github svg');
  #hero = document.querySelector('.hero');
  #heroTitle = document.querySelector('.hero-title');
  #heroDescription = document.querySelector('.hero-description');
  #search = document.querySelector('.search');
  #searchInput = document.querySelector('.search input');
  #searchBtn = document.querySelector('.search-btn');
  #showAllText = document.querySelector('.show-all-text');
  #showAllTextClick = document.querySelector('.show-all-text-click');
  #detailsExitIcon = document.querySelector('.details-exit-icon');
  #detailsTitlePrimary = document.querySelector('.details-title-primary');
  #detailsTitleSecond = document.querySelectorAll('.details-title-secondary');
  #detailsText = document.querySelectorAll('.details-text');
  #detailsMapLink = document.querySelectorAll('.details-map-link');
  #listCard = document.querySelectorAll('.list-card');
  #popupCloseBtn = document.querySelector('.btn--close-popup');
  #footer = document.querySelector('footer');
  #footerGitHubLink = document.querySelector('.footer-link--github');
  #footerApiRefLink = document.querySelector('.footer-link--apiref');
  #betaTag = document.querySelector('.hero-title span');

  setNightMode() {
    // Redefining #listCard item
    this.#listCard = document.querySelectorAll('.list-card');

    // prettier-ignore
    this.#themeIcon.setAttribute('d', 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z');
    this.#body.style.backgroundColor = '#111111';
    this.#toolbarIcons.style.color = '#cccccc';
    this.#githubIcon.style.fill = '#cccccc';
    this.#hero.style.backgroundColor = '#333333';
    this.#heroTitle.style.color = '#eeeeee';
    this.#heroDescription.style.color = '#cccccc';
    this.#search.style.backgroundColor = '#333333';
    this.#searchInput.style.backgroundColor = '#333333';
    this.#searchInput.style.color = '#eeeeee';
    this.#searchBtn.style.backgroundColor = '#222222';
    this.#searchBtn.style.color = '#eeeeee';
    this.#showAll.style.backgroundColor = '#333333';
    this.#showAllText.style.color = '#eeeeee';
    this.#showAllTextClick.style.color = 'lightblue';
    this.#footerGitHubLink.style.color = 'lightblue';
    this.#footerApiRefLink.style.color = 'lightblue';
    this.#details.style.backgroundColor = 'rgba(18, 18, 18, 0.96)';
    this.#detailsExitIcon.style.color = '#cccccc';
    this.#detailsTitlePrimary.style.color = '#cccccc';
    this.#popup.style.backgroundColor = '#111111';
    this.#popupCloseBtn.style.color = '#eeeeee';
    this.#betaTag.style.color = '#333333';
    this.#betaTag.style.backgroundColor = '#cccccc';
    this.#detailsTitleSecond.forEach(item => (item.style.color = '#dddddd'));
    this.#detailsText.forEach(item => (item.style.color = '#eeeeee'));
    this.#detailsMapLink.forEach(item => {
      item.style.backgroundColor = '#333333';
      item.style.color = '#eeeeee';
    });
    this.#listCard.forEach(item => {
      item.classList.remove('.list-card--day');
      item.classList.add('.list-card--night');
    });
    this.#listCard.forEach(item => {
      item.style.backgroundColor = '#333333';
      item.style.color = '#eeeeee';
    });
    this.#footer.style.color = '#cccccc';
    this.#footer.style.backgroundColor = '#333333';
  }

  setDayMode() {
    // Redefining #listCard item
    this.#listCard = document.querySelectorAll('.list-card');

    // prettier-ignore
    this.#themeIcon.setAttribute('d', 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
    this.#body.style.backgroundColor = '#ffffff';
    this.#toolbarIcons.style.color = '#555555';
    this.#githubIcon.style.fill = '#555555';
    this.#hero.style.backgroundColor = '#eeeeee';
    this.#heroTitle.style.color = '#333333';
    this.#heroDescription.style.color = '#555555';
    this.#search.style.backgroundColor = '#ffffff';
    this.#searchInput.style.backgroundColor = '#ffffff';
    this.#searchInput.style.color = '#000000';
    this.#searchBtn.style.backgroundColor = '#eeeeee';
    this.#searchBtn.style.color = '#333333';
    this.#showAll.style.backgroundColor = '#ffffff';
    this.#showAllText.style.color = '#000000';
    this.#showAllTextClick.style.color = 'blue';
    this.#footerGitHubLink.style.color = 'blue';
    this.#footerApiRefLink.style.color = 'blue';
    this.#details.style.backgroundColor = 'rgba(255, 255, 255, 0.96)';
    this.#detailsExitIcon.style.color = '#333333';
    this.#detailsTitlePrimary.style.color = '#333333';
    this.#popup.style.backgroundColor = '#eeeeee';
    this.#popupCloseBtn.style.color = '#333333';
    this.#betaTag.style.color = '#ffffff';
    this.#betaTag.style.backgroundColor = '#555555';
    this.#detailsTitleSecond.forEach(item => (item.style.color = '#444444'));
    this.#detailsText.forEach(item => (item.style.color = '#555555'));
    this.#detailsMapLink.forEach(item => {
      item.style.backgroundColor = '#ffffff';
      item.style.color = '#000000';
    });
    this.#listCard.forEach(item => {
      item.style.backgroundColor = '#ffffff';
      item.style.color = '#000000';
    });
    this.#footer.style.color = '#333333';
    this.#footer.style.backgroundColor = '#eeeeee';
  }
}

export default new View();
