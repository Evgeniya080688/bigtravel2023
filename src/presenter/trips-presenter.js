import {render, RenderPosition, remove} from '../framework/render.js';
import ListView from '../view/list-view.js';
import NoListView from '../view/no-points-view.js';
import PointNewPresenter from './point-new-presenter.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {sortPointsByTime, sortPointsByPrice, sortPointsByDay} from '../utils/point.js';
import {filter} from '../utils/filter.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import OffersModel from '../model/offers-model.js';

export default class TripsPresenter {
  #container = null;
  #pointsModel = null;
  #pointNewPresenter = null;
  #filterModel = null;
  #sortComponent = null;
  #listComponent = new ListView();
  #noListComponent = new NoListView();
  #offersAll = new OffersModel();
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor(container, pointsModel, filterModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointNewPresenter = new PointNewPresenter(this.#listComponent, this.#handleViewAction, this.#offersAll);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsByTime);
      case SortType.DAY:
        return filteredPoints.sort(sortPointsByDay);
    }
    return filteredPoints;
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint (updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedPointCount: true, resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  init = () => {
    this.#renderBoard();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
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
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter =
      new PointPresenter(this.#listComponent.element, this.#handleViewAction, this.#handleModeChange, this.#offersAll);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    this.#noListComponent = new NoListView(this.#filterType);
    render(this.#noListComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderPointsList = () => {
    const points = this.points;
    render(this.#listComponent, this.#container);
    this.#renderPoints(points);
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    this.#pointNewPresenter.destroy();

    remove(this.#sortComponent);
    if (this.#noListComponent) {
      remove(this.#noListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
    if (this.#noListComponent) {
      remove(this.#noListComponent);
    }
  };

  #renderBoard = () => {
    const points = this.points;
    const pointsCount = points.length;
    if (pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointsList();
  };
}
