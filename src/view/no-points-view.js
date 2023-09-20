import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'Click New Event to create your first point',
};

const createNoPointsTemplate = (filterType) => {
  const noTaskTextValue = NoPointsTextType[filterType];

  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>
    `);
};

export default class NoListView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsTemplate(this.#filterType);
  }
}
