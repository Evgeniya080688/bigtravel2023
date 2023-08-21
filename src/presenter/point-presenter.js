import {render, replace} from '../framework/render.js';
import EditFormView from '../view/edit-form-view';
import PointView from '../view/point-view';

export default class PointPresenter {
  #container = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor(pointListContainer) {
    this.#container = pointListContainer;
  }

  init = (point) => {
    this.#point = point;
    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new EditFormView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setEditClickHandler(this.#handleFormSubmit);

    render(this.#pointComponent, this.#container);
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceFormToPoint= () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };
}
