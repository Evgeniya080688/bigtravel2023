import ListView from '../view/list-view.js';
import EditFormView from '../view/edit-form-view';
import PointView from '../view/point-view';
import {render} from '../render.js';

export default class TripsPresenter {
  #container = null;
  #pointsModel = null;
  #listComponent = new ListView();

  #boardPoints = [];

  init = (container, pointsModel) => {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];

    render(this.#listComponent, this.#container);
    render(new EditFormView(this.#boardPoints[0]), this.#listComponent.element);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      render(new PointView(this.#boardPoints[i]), this.#listComponent.element);
    }
  };
}
