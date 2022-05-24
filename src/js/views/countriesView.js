import { clear } from '../helpers';
import View from './View';

class CountriesView extends View {
  #listCards = document.querySelector('.countries');
  #showAll = document.querySelector('.cflex__show-all');

  render(data) {
    let i = 0;
    clear(this.#listCards);
    this.noResult.classList.add('disabled');

    data.forEach(item => {
      const cardContent = `
        <hover cca3="${item.cca3}" tabindex="${i + 10}">
          <a class="country country--${View.theme}" href="#${item.cca3}">
            <div class="country__flag"></div>
            <div class="country__name">${item.name.common}</div>
          </a>
        </hover>
`;
      i++;

      this.#listCards.insertAdjacentHTML('beforeend', cardContent);

      document.querySelector(
        `article hover:nth-child(${i}) .country .country__flag`
      ).style.backgroundImage = `url(${item.flags.svg})`;
    });
    this.spinner.style.display = 'none';
    // this.theme === 'light' ? themesView.setDayMode() : themesView.setNightMode();
  }

  /**
   * @param {Node} input An input which comes from input variable in controller.
   */
  renderShowAll(input) {
    this.#showAll.classList.remove('hidden');
    input.value = '';
  }

  /**
   * @param {Node} input An input which comes from input variable in controller.
   */
  hideShowAll() {
    this.#showAll.classList.add('hidden');
    this.renderSpinner();
  }
}

export default new CountriesView();
