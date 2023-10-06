import {render} from './framework/render.js';
import FilterModel from './model/filter-model.js';
import TripsPresenter from './presenter/trips-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import InfoTripView from './view/info-trip-view.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic 5kgjl7dinkljwf';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';
const siteTripEventsElement = document.querySelector('.trip-events');
const siteTripMainElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
//const PointsMode = new PointsModel();
const filterModel = new FilterModel();
const tripsPresenter = new TripsPresenter(siteTripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteTripMainElement, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  tripsPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = false;
};
render(new InfoTripView(), siteTripMainElement);
filterPresenter.init();
// render(newPointButtonComponent, siteTripMainElement);
// newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

tripsPresenter.init();
pointsModel.init().finally(() => {
  render(newPointButtonComponent, siteTripMainElement);
  newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
});
