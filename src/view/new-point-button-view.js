import AbstractView from '../framework/view/abstract-view.js';

const createNewPointButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewTaskButtonView extends AbstractView {
  get template() {
    return createNewPointButtonTemplate();
  }
}
