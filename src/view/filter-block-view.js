import AbstractView from '../framework/view/abstract-view.js';

const createFilterBlockTemplate = () => (
  `<div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>

      </div>
    </div>`
);

export default class FilterBlockView extends AbstractView {
  get template() {
    return  createFilterBlockTemplate();
  }
}
