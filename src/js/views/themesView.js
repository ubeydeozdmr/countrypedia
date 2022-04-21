import View from './View';

class ThemesView extends View {
  #body = document.querySelector('body');
  #toolbarIcons = document.querySelector('.toolbar-icons');
  #themeIcon = document.querySelector('.night-mode svg path');
  #githubIcon = document.querySelector('.github svg');
  #hero = document.querySelector('.hero');
  #heroTitle = document.querySelector('.hero-title');
  #heroDescription = document.querySelector('.hero-description');
  #search = document.querySelector('.search');
  #searchInput = document.querySelector('.search input');
  #searchBtn = document.querySelector('.search-btn');
  #showAll = document.querySelector('.show-all');
  #showAllText = document.querySelector('.show-all-text');
  #showAllTextClick = document.querySelector('.show-all-text-click');
  #details = document.querySelector('.details');
  #detailsExitIcon = document.querySelector('.details-exit-icon');
  #detailsTitlePrimary = document.querySelector('.details-title-primary');
  #detailsTitleSecond = document.querySelectorAll('.details-title-secondary');
  #detailsText = document.querySelectorAll('.details-text');
  #detailsMapLink = document.querySelectorAll('.details-map-link');
  #listCard = document.querySelectorAll('.list-card');
  #popup = document.querySelector('.popup');
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

export default new ThemesView();
