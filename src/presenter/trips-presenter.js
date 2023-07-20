import ListView from '../view/list-view.js';
import EditFormView from '../view/edit-form-view';
import PointView from '../view/point-view';
import {render} from '../render.js';

export default class TripsPresenter {
  listComponent = new ListView();
  editFormComponent = new EditFormView();

  init = (container, pointsModel, editFormModel) => {
    this.container = container;
    this.pointsModel = pointsModel;
    this.editFormModel = editFormModel;
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(this.listComponent, this.container);
    render(new EditFormView(this.editFormModel.getPoint()), this.listComponent.getElement());

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointView(this.boardPoints[i]), this.listComponent.getElement());
    }
  };
}
