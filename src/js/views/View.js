import { clear } from '../helpers';

export default class View {
  theme;

  spinner = document.querySelector('.loader-container');
  popup = document.querySelector('.popup');
  overlay = document.querySelector('.overlay');
  errorMessage = document.querySelector('.error-message');

  // STATUS METHODS

  renderSpinner() {
    this.spinner.style.display = 'flex';
  }

  /**
   * @param {string} errorMessage Error message which will be shown as popup.
   */
  renderError(errorMessage) {
    clear(this.errorMessage);
    this.errorMessage.insertAdjacentHTML('beforeend', errorMessage);
    this.popup.style.display = 'block';
    this.overlay.style.display = 'block';
    this.spinner.style.display = 'none';
  }

  dismissError() {
    this.popup.style.display = 'none';
    this.overlay.style.display = 'none';
  }
}
