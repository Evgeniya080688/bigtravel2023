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

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditFormView(point);

    //render(new EditFormView(this.#boardPoints[0]), this.#listComponent.element);
    const replacePointToForm = () => {
      this.#listComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint= () => {
      this.#listComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
    });

    pointEditComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
    });


    render(pointComponent, this.#listComponent.element);
  };
}
