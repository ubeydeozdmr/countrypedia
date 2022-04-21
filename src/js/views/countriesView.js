import { clear } from '../helpers';
import View from './View';

class CountriesView extends View {
  #listCards = document.querySelector('.list-cards');
  #showAll = document.querySelector('.show-all');
  #showAllTextKeyword = document.querySelector('.show-all-text-keyword');

  render(data) {
    clear(this.#listCards);

    data.forEach(item => {
      const cardContent = `
        <hover cca3="${item.cca3}">
          <div class="list-card list-card--${this.theme}">
            <div class="list-card-img-frame">
              <img class="list-card-img" src="${item.flags.svg}" alt="${item.name.common} flag">
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
    this.spinner.style.display = 'none';
  }

  /**
   * @param {Node} input An input which comes from input variable in controller.
   */
  renderShowAll(input) {
    this.#showAll.style.display = 'block';
    clear(this.#showAllTextKeyword);
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
}

export default new CountriesView();
