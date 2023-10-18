import {remove, render, RenderPosition} from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import {UserAction, UpdateType} from '../const.js';

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #handleDestroy = null;
  #offersModel = null;
  #destinationsModel = null;
  #destinations = null;
  #destroyCallback = null;

  constructor(pointListContainer, changeData, offersModel, destinationsModel) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;
    if (this.#pointEditComponent !== null) {
      return;
    }
    this.#destinations = this.#destinationsModel.destinations;
    this.#pointEditComponent = new EditFormView(this.#offersModel, this.#destinations);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

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

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
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
