import {render, RenderPosition} from '../framework/render.js';
import ListView from '../view/list-view.js';
import NoListView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
//import {updateItem} from '../utils/common.js';
import {sortPointsByTime, sortPointsByPrice, sortPointsByDay} from '../utils/point.js';
import {SortType} from '../const.js';

export default class TripsPresenter {
  #container = null;
  #pointsModel = null;
  #listComponent = new ListView();
  #sortComponent = new SortView();
  #noListComponent = new NoListView();
  //#boardPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  //#sourcedBoardPoints = [];

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointsByPrice);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointsByTime);
    }
    return this.#pointsModel.points;
  }

  init = () => {

    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    // Здесь будем вызывать обновление модели
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    render(this.#noListComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointsList = () => {
    const points = this.points;
    render(this.#listComponent, this.#container);
    this.#renderPoints(points);
  };

  #renderBoard = () => {
    if (this.points.length <= 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointsList();
  };
}
