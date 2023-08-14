import AbstractView from '../framework/view/abstract-view.js';

const createListTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class NoListView extends AbstractView {
  get template() {
    return createListTemplate();
  }
}
