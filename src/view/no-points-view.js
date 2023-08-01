import {createElement} from '../render.js';

const createListTemplate = () => (
  `<p class="trip-events__msg">Click New Event to create your first point</p>`
);

export default class NoListView {
  #element = null;
  get template() {
    return createListTemplate();
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


