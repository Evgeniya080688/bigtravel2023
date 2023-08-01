import ListView from '../view/list-view.js';
import EditFormView from '../view/edit-form-view';
import PointView from '../view/point-view';
import NoListView from '../view/no-points-view.js';
import {render} from '../render.js';
import SortView from "../view/sort-view";

export default class TripsPresenter {
  #container = null;
  #pointsModel = null;
  #listComponent = new ListView();
  #boardPoints = [];

  init = (container, pointsModel) => {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];

    if (this.#boardPoints.length <= 0) {
      render(new NoListView(), this.#container);
    } else {
      render(new SortView(), this.#container);
      render(this.#listComponent, this.#container);

      for (let i = 0; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i]);
      }
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditFormView(point);
    const replacePointToForm = () => {
      this.#listComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint= () => {
      this.#listComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    render(pointComponent, this.#listComponent.element);
  };
}
