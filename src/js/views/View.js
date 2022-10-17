import { clear } from '../helpers';

export default class View {
  theme;
  isDetailsOpened = false;

  spinnerMain = document.querySelector('.loader-container--main');
  spinnerDetails = document.querySelector('.loader-container--details');
  popup = document.querySelector('.popup');
  overlay = document.querySelector('.overlay');
  notFound = document.querySelector('.cflex__not-found');
  badRequest = document.querySelector('.cflex__bad-request');
  errorMessage = document.querySelector('.error-message');
  saveIcon = document.querySelector('.details__save-icon .save');
  unsaveIcon = document.querySelector('.details__save-icon .unsave');

  // STATUS METHODS

  renderSpinner(place) {
    switch (place) {
      case 'main':
        this.spinnerMain.style.display = 'flex';
      case 'details':
        this.spinnerDetails.style.display = 'flex';
    }
  }

  /**
   * @param {Number} statusCode Status code of error
   * @description Error message which will be shown as text.
   */
  renderError(statusCode) {
    clear(document.querySelector('.countries'));
    switch (statusCode) {
      case 404:
        this.notFound.classList.remove('disabled');
        break;
      default:
        this.badRequest.classList.remove('disabled');
        break;
    }
    this.spinnerMain.style.display = 'none';
  }

  /**
   * @description Implement blur effect to search bar when focused.
   */
  renderFocus() {
    document.querySelector('nav.search').style.zIndex = '15';
    document.querySelector('.focus').classList.remove('hidden');
  }

  /**
   * @description Undo blur effect from search bar when not focused anymore.
   */
  hideFocus() {
    document.querySelector('nav.search').style.zIndex = '8';
    document.querySelector('.focus').classList.add('hidden');
  }

  addBookmark() {
    this.saveIcon.classList.add('disabled');
    this.unsaveIcon.classList.remove('disabled');
  }

  removeBookmark() {
    this.saveIcon.classList.remove('disabled');
    this.unsaveIcon.classList.add('disabled');
  }
}
