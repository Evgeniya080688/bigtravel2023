import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createNoPointsTemplate = (filterType) => {
  const noTaskTextValue = NoPointsTextType[filterType];
  console.log(filterType);

  return (
    `<p class="trip-events__msg">${noTaskTextValue}</p>
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
