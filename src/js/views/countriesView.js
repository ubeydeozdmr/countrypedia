import { clear, insert } from '../helpers';
import View from './View';

class CountriesView extends View {
  #listCards = document.querySelector('.countries');
  #showAll = document.querySelector('.cflex__show-all');
  #toolRandom = document.querySelector('.country-tool--random');
  #toolSaved = document.querySelector('.country-tool--saved');
  #toolShowAll = document.querySelector('.country-tool--show-all');
  // #showRandom = document.querySelector('.cflex__show-random');
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
        `article hover:nth-child(${index + 1}) .country .country__flag`
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
    this.#toolRandom.classList.add('disabled');
    this.#toolSaved.classList.add('disabled');
    this.#toolShowAll.classList.remove('disabled');
    // this.#showRandom.classList.add('disabled');
    if (input) input.value = '';
  }

  hideShowAll() {
    this.#showAll.classList.add('disabled');
    this.#toolRandom.classList.remove('disabled');
    this.#toolSaved.classList.remove('disabled');
    this.#toolShowAll.classList.add('disabled');
    // this.#showRandom.classList.remove('disabled');
    this.renderSpinner();
  }
}

export default new CountriesView();
