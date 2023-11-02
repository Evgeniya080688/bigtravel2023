import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoTemplate = (totalPrice, pathName, dates) =>
  `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${pathName}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>
  `;

export default class InfoTripView extends AbstractView {
  #totalPrice = 0;
  #pathName = '';
  #dates = '';

  constructor(totalPrice, pathName, dates) {
    super();
    this.#totalPrice += totalPrice;
    this.#pathName = pathName;
    this.#dates = dates;
  }

  get template() {
    return createTripInfoTemplate(this.#totalPrice, this.#pathName, this.#dates);
  }

}
