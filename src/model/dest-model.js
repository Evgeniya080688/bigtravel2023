import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class DestinationsModel extends Observable {
  //#destinations = destinations;

  #destinationsApiService = null;
  #destinations = [];

  constructor(destinationsApiService) {
    super();
    this.#destinationsApiService = destinationsApiService;
    //this.#destinationsApiService.destinations.then((dest) => console.log(dest));
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const destinationsAll = await this.#destinationsApiService.destinations;
      this.#destinations = destinationsAll;
      console.log(this.#destinations);
    } catch(err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  };

  set destinations(update) {
    this.#destinations = update;
  }

  getDestinationsList = () => {};

}
