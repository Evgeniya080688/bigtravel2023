import {render, RenderPosition} from '../framework/render.js';
import ListView from '../view/list-view.js';
import NoListView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';

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
    const pointPresenter = new PointPresenter(this.#listComponent.element);
    pointPresenter.init(point);
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
