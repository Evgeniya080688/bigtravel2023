import {remove, render} from './framework/render.js';
import FilterModel from './model/filter-model.js';
import TripsPresenter from './presenter/trips-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/dest-model.js';
import OffersModel from './model/offers-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import InfoTripView from './view/info-trip-view.js';
import PointsApiService from './points-api-service.js';
import DestinationsApiService from './destinations-api-service.js';
import OffersApiService from './offers-api-service.js';

import {END_POINT, AUTHORIZATION} from './const.js';


const siteTripEventsElement = document.querySelector('.trip-events');
const siteTripMainElement = document.querySelector('.trip-main');
const destModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));
const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const tripsPresenter = new TripsPresenter(siteTripEventsElement, pointsModel, filterModel, destModel, offersModel);
const filterPresenter = new FilterPresenter(siteTripMainElement, filterModel, pointsModel);
const infoPresenter = new InfoPresenter(siteTripMainElement, pointsModel, offersModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  tripsPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = false;
};

infoPresenter.init();
filterPresenter.init();
tripsPresenter.init();
destModel.init().then(() => offersModel.init()).then(
  () => {
    pointsModel.init().finally(() => {
      render(newPointButtonComponent, siteTripMainElement);
      newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
    });
  }
);

