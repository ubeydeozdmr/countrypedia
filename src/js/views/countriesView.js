import { clear, insert } from '../helpers';
import View from './View';

class CountriesView extends View {
  #listCards = document.querySelector('.countries');
  #showAll = document.querySelector('.cflex__show-all');
  #showRandom = document.querySelector('.cflex__show-random');
  #title = document.querySelector('.cflex__title');

  render(data, title) {
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

      insert(this.#listCards, cardContent);

      document.querySelector(
        `article hover:nth-child(${i}) .country .country__flag`
      ).style.backgroundImage = `url(${item.flags.svg})`;
    });
    this.spinnerMain.style.display = 'none';
    this.#title.textContent = title;
  }

  /**
   * @param {Node} input An input which comes from input variable in controller.
   */
  renderShowAll(input) {
    this.#showAll.classList.remove('disabled');
    this.#showRandom.classList.add('disabled');
    input.value = '';
  }

  hideShowAll() {
    this.#showAll.classList.add('disabled');
    this.#showRandom.classList.remove('disabled');
    this.renderSpinner();
  }
}

export default new CountriesView();
