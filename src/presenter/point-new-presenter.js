import {remove, render, RenderPosition} from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import {UserAction, UpdateType} from '../const.js';
import {destinations} from "../mock/destinations";

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #handleDestroy = null;
  #offersAll = null;
  #destinationsModel = null;
  #destinations = null;

  constructor(pointListContainer, changeData, onDestroy, offersAll, destinationsModel) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#handleDestroy = onDestroy;
    this.#offersAll = offersAll;
    this.#destinationsModel = destinationsModel;
  }

  init = () => {
    if (this.#pointEditComponent !== null) {
      return;
    }
    this.#destinations = this.#destinationsModel.destinations;
    console.log(this.#destinations);
    this.#pointEditComponent = new EditFormView(this.#offersAll, this.#destinations);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#destinations = this.destinations;
        console.log(this.#destinations);
    }
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
