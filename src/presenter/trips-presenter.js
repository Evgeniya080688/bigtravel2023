import {render, RenderPosition, remove} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import ListView from '../view/list-view.js';
import NoListView from '../view/no-points-view.js';
import PointNewPresenter from './point-new-presenter.js';
import LoadingView from '../view/loading-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {sortPointsByTime, sortPointsByPrice, sortPointsByDay} from '../utils/point.js';
import {filter} from '../utils/filter.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripsPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #listComponent = new ListView();
  #noListComponent = new NoListView();
  #destinationsModel = null;
  #offersModel = null;
  #loadingComponent = new LoadingView();
  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(container, pointsModel, filterModel, destModel, offersModel) {
    this.#container = container;
    this.#destinationsModel = destModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#pointNewPresenter =
     new PointNewPresenter(this.#listComponent, this.#handleViewAction, this.#offersModel, this.#destinationsModel);
  }

  get destinations() {
    return this.#destinationsModel.destinations;
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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint (updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearBoard();
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
      new PointPresenter(
        this.#listComponent.element,
        this.#handleViewAction,
        this.#handleModeChange,
        this.#offersModel,
        this.#destinationsModel);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    this.#noListComponent = new NoListView(this.#filterType);
    render(this.#noListComponent, this.#container, RenderPosition.BEFOREEND);
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
    remove(this.#loadingComponent);
    if (this.#noListComponent) {
      remove(this.#noListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
    if (this.#noListComponent) {
      remove(this.#noListComponent);
    }
  };

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
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
