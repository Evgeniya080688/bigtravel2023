import {render, RenderPosition} from '../framework/render.js';
import ListView from '../view/list-view.js';
import EditFormView from '../view/edit-form-view';
import PointView from '../view/point-view';
import NoListView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';

export default class TripsPresenter {
  #container = null;
  #pointsModel = null;
  #listComponent = new ListView();
  #sortComponent = new SortView();
  #noListComponent = new NoListView();
  #boardPoints = [];

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
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

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setEditClickHandler(() => {
      replaceFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listComponent.element);
  };

  #renderPoints = (from, to) => {
    this.#boardPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    render(this.#noListComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderPointsList = () => {
    render(this.#listComponent, this.#container);
    this.#renderPoints(0, this.#boardPoints.length);
  };

  #renderBoard = () => {
    if (this.#boardPoints.length <= 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointsList();
  };


}
