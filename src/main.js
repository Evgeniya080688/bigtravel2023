import {render} from './framework/render.js';
import FilterModel from './model/filter-model.js';
import TripsPresenter from './presenter/trips-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import InfoTripView from './view/info-trip-view.js';

const siteTripEventsElement = document.querySelector('.trip-events');
const siteTripMainElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const tripsPresenter = new TripsPresenter(siteTripEventsElement, pointsModel, offersModel, filterModel);
const filterPresenter = new FilterPresenter(siteTripMainElement, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  tripsPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};
render(new InfoTripView(), siteTripMainElement);
filterPresenter.init();
render(newPointButtonComponent, siteTripMainElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

tripsPresenter.init();


