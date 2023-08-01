import {createElement} from '../render.js';
import {humanizeDueDate, getHour, getMinutes, duration} from '../utils.js';
import {offersByType} from '../mock/offers-by-type.js';

const createPointTemplate = (point) => {
  const {basePrice, dateFrom, dateTo, destination, type, offers, isFavorite} = point;

  const createOffers = (offersList) => {
    let offersGet = '';
    const pointTypeOffer = offersByType.find((item) => item.type === type).offers;
    const selectedOffers = pointTypeOffer.filter(
      (offer) => {
        if (offersList.includes(offer.id)) {return offer;}
      });

    selectedOffers
      .map((offer) => {
        offersGet += `<li className="event__offer">
          <span className="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span className="event__offer-price">${offer.price}</span>
        </li>`;
      });
    return offersGet;
  };
  const favorite = isFavorite
    ? '--active'
    : '';
  const dateStart = dateFrom !== null
    ? humanizeDueDate(dateFrom)
    : '';
  const dateEnd = dateTo !== null
    ? humanizeDueDate(dateTo)
    : '';
  const hourStart = dateFrom !== null
    ? getHour(dateFrom)
    :'';
  const minutesStart = dateFrom !== null
    ? getMinutes(dateFrom)
    :'';
  const hourEnd = dateTo !== null
    ? getHour(dateTo)
    :'';
  const minutesEnd = dateTo !== null
    ? getMinutes(dateTo)
    :'';

  return (
    `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateStart}">${dateStart}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${hourStart}:${minutesStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${hourEnd}:${minutesEnd}</time>
          </p>
          <p class="event__duration">${duration(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffers(offers)}
        </ul>
        <button class="event__favorite-btn event__favorite-btn${favorite}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
    `
  );
};

export default class PointView {
  #element = null;
  #point = null;
  constructor(point) {
    this.#point = point;
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}


