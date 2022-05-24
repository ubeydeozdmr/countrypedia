import { clear } from '../helpers';

export default class View {
  theme;
  isDetailsOpened = false;

  spinner = document.querySelector('.loader-container');
  popup = document.querySelector('.popup');
  overlay = document.querySelector('.overlay');
  noResult = document.querySelector('.cflex__no-result');
  errorMessage = document.querySelector('.error-message');

  // STATUS METHODS

  renderSpinner() {
    this.spinner.style.display = 'flex';
  }

  /**
   * @param {string} errorMessage Error message which will be shown as popup.
   */
  renderError() {
    clear(document.querySelector('.countries'));
    this.noResult.classList.remove('disabled');
    // clear(this.errorMessage);
    // this.errorMessage.insertAdjacentHTML('beforeend', errorMessage);
    // this.popup.style.display = 'block';
    // this.overlay.style.display = 'block';
    this.spinner.style.display = 'none';
  }

  dismissError() {
    // this.popup.style.display = 'none';
    // this.overlay.style.display = 'none';
  }

  renderFocus() {
    document.querySelector('nav.search').style.zIndex = '15';
    document.querySelector('.focus').classList.remove('hidden');
  }

  hideFocus() {
    document.querySelector('nav.search').style.zIndex = '8';
    document.querySelector('.focus').classList.add('hidden');
  }
}
