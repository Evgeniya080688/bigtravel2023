import Observable from '../framework/observable.js';
import {offersByType} from '../mock/offers-by-type.js';

export default class OffersModel extends Observable {
  #offers = offersByType;

  get offers() {
    return this.#offers;
  }

  set offers(update) {
    this.#offers = update;
  }
}
