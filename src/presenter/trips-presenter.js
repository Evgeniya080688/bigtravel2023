import ListView from '../view/list-view.js';
import EditFormView from '../view/edit-form-view';
import PointView from '../view/point-view';
import {render} from '../render.js';
import {TRIP_COUNT} from '../const.js';

export default class TripsPresenter {
  listComponent = new ListView();
  editFormComponent = new EditFormView();

  init = (container) => {
    this.container = container;
    render(this.listComponent, this.container);
    render(this.editFormComponent, this.listComponent.getElement());
    for (let i = 0; i < TRIP_COUNT; i++) {
      render(new PointView (), this.listComponent.getElement());
    }
  };
}
