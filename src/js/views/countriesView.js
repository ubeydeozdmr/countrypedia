import { clear, insert } from '../helpers';
import View from './View';

class CountriesView extends View {
  #listCards = document.querySelector('.countries');
  #toolSearchBy = document.querySelector('.country-tool--search-by');
  #toolSort = document.querySelector('.country-tool--sort');
  #toolRandom = document.querySelector('.country-tool--random');
  #toolSaved = document.querySelector('.country-tool--saved');
  #toolShowAll = document.querySelector('.country-tool--show-all');
  #title = document.querySelector('.cflex__title');

  render(data, theme, title) {
    clear(this.#listCards);
    this.notFound.classList.add('disabled');

    data.forEach((item, index) => {
      const cardContent = `
        <hover cca3="${item.cca3}" tabindex="${index + 10}">
          <a class="country country--${theme}" href="#country?cca3=${item.cca3}">
            <div class="country__flag"></div>
            <div class="country__name">${item.name.common}</div>
          </a>
        </hover>
`;

      insert(this.#listCards, cardContent);

      document.querySelector(
        `article hover:nth-child(${index + 1}) .country .country__flag`,
      ).style.backgroundImage = `url(${item.flags.svg})`;
    });
    this.spinnerMain.style.display = 'none';
    this.#title.textContent = title;
  }

  /**
   * @param {Node} input An input which comes from input variable in controller.
   */
  renderShowAll(input) {
    this.#toolSearchBy.classList.add('disabled');
    this.#toolSort.classList.add('disabled');
    this.#toolRandom.classList.add('disabled');
    this.#toolSaved.classList.add('disabled');
    this.#toolShowAll.classList.remove('disabled');
    if (input) input.value = '';
  }

  hideShowAll() {
    this.#toolSearchBy.classList.remove('disabled');
    this.#toolSort.classList.remove('disabled');
    this.#toolRandom.classList.remove('disabled');
    this.#toolSaved.classList.remove('disabled');
    this.#toolShowAll.classList.add('disabled');
    this.renderSpinner();
  }
}

export default new CountriesView();
