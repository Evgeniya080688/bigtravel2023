import Observable from '../framework/observable.js';
import {offersByType} from '../mock/offers-by-type.js';
import {UpdateType} from '../const';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #offers = [];

  constructor(offersApiService) {
    super();
    this.#offersApiService = offersApiService;
    //this.#offersApiService.offers.then((dest) => console.log(dest));
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      const offersAll = await this.#offersApiService.offers;
      this.#offers = offersAll;
    } catch(err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  };

  set offers(update) {
    this.#offers = update;
  }

  getByType = (type) => this.#offers.find((item) => item.type === type);

}
