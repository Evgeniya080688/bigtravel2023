import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {beautyDate} from '../utils/point.js';
import {getRandomInteger,capitalizeFirstLetter} from '../utils/common.js';
import {offersByType}  from '../mock/offers-by-type.js';
import {destinations} from '../mock/destinations.js';
import {TYPES_TRANSPORT} from '../const.js';
import flatpickr from 'flatpickr';
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate.js';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/plugins/confirmDate/confirmDate.css';

const BLANK_POINT = {
  basePrice: getRandomInteger(500,10000),
  dateFrom: '2019-07-10T20:45:56.845Z',
  dateTo: '2019-07-12T22:55:13.375Z',
  destination: {
    description: '',
    name: '',
    pictures: []
  },
  id: 0,
  isFavorite: false,
  offers: [getRandomInteger(0, 5),getRandomInteger(0, 5),getRandomInteger(0, 5)],
  type:  TYPES_TRANSPORT[0]
};

const createPointEditDateFromTemplate = (dateFrom) => (
  `<label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${beautyDate(dateFrom)}">
         `
);

const createPointEditDateToTemplate = (dateTo) => (
  `<label class="visually-hidden" for="event-start-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-start-time" value="${beautyDate(dateTo)}">
         `
);

const createOffers = (type, offers) => {
  const pointTypeOffer = offersByType.find((item) => item.type === type);
  let offersSelected = '';
  pointTypeOffer.offers
    .map((offer) => {
      const checked = offers.includes(offer.id) ? 'checked': '';
      offersSelected += `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${checked}>
              <label class="event__offer-label" for="event-offer-${offer.id}">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`;
    });
  return offersSelected;
};

const createPictures = (destination) => {
  let picturesListElement = '';
  //const found =  destinations.find((item) => item.name === destination.name);
  const picturesArray = destination.pictures;
  picturesArray.forEach((picture) => {
    picturesListElement += `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
  });
  return picturesListElement ;
};

const getPictures = (destinationName) => {
  const found =  destinations.find((item) => item.name === destinationName);
  return found.pictures;
};

const getDescripton = (destinationName) => {
  const found =  destinations.find((item) => item.name === destinationName);
  return found.description;
};

const createTypes = (types, currentType) => {
  let typesList = '';
  types.forEach((type) => {
    const checked = (currentType === type) ? 'checked': '';
    typesList +=`<div class="event__type-item">
                <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checked}>
                <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
              </div>`;
  });
  return typesList;
};

const createDestinations = (destinationsAll) => {
  let destList = '';
  destinationsAll.forEach((dest) => {
    destList += `<option value="${dest.name}"></option>`;
  });
  return destList;
};

const createEditFormTemplate = (point) => {
  const {basePrice, dateFrom, dateTo, destination, type, offers} = point;

  const dateTemplateFrom = createPointEditDateFromTemplate(dateFrom);
  const dateTemplateTo = createPointEditDateToTemplate(dateTo);
  const offersTemplate = createOffers(type, offers);
  const picturesTemplate = createPictures(destination);

  return (
    `
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createTypes(TYPES_TRANSPORT, type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinations(destinations)};
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          ${dateTemplateFrom}
          &mdash;
          ${dateTemplateTo}
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersTemplate}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${picturesTemplate}
            </div>
          </div>
        </section>
      </section>
    </form>
    `
  );
};

export default class EditFormView extends AbstractStatefulView {
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(point = BLANK_POINT) {
    super();
    this._state = EditFormView.parsePointToState(point);
    this.#setInnerHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  get template() {
    return createEditFormTemplate(this._state);
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более не нужный календарь
  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom= null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo= null;
    }
  };

  #typeToggleHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      type: evt.target.value,
      offers: ''
    });
    this.updateElement({
      type: evt.target.value,
      offers: ''
    });

  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value === '') {
      return;
    }
    this._setState({
      destination: {
        name: evt.target.value,
        pictures: getPictures(evt.target.value),
        description: getDescripton(evt.target.value),
      },
    });
    this.updateElement({
      destination: {
        name: evt.target.value,
        pictures: getPictures(evt.target.value),
        description: getDescripton(evt.target.value),
      },
    });
  };

  reset = (point) => {
    this.updateElement(
      EditFormView.parsePointToState(point),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditFormView.parseStateToPoint(this._state));
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    console.log(evt.target.value);
    this._setState({
      price: evt.target.value,
    });
    this.updateElement({
      price: evt.target.value,
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepickerFrom = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        plugins: [new confirmDatePlugin({})],
        dateFormat: 'd/m/y/ H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler, // На событие flatpickr передаём наш колбэк
      },
    );
  };

  #setDatepickerTo = () => {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        plugins: [new confirmDatePlugin({})],
        dateFormat: 'd/m/y/ H:i:s',
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler, // На событие flatpickr передаём наш колбэк
      },
    );
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick(this._state);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeToggleHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('input', this.#destinationInputHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);
  };

  static parsePointToState = (point) => ({...point });

  static parseStateToPoint = (state) => {
    const point = {...state};

    return point;
  };
}
