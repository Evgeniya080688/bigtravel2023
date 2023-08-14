import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import TripsPresenter from './presenter/trips-presenter.js';
import PointsModel from './model/points-model.js';
import NewTaskButtonView from './view/new-point-button-view.js';
import InfoTripView from './view/info-trip-view.js';
import FilterBlockView from './view/filter-block-view.js';

const siteTripEventsElement = document.querySelector('.trip-events');
const siteTripMainElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const tripsPresenter = new TripsPresenter(siteTripEventsElement, pointsModel);

render(new InfoTripView(), siteTripMainElement);
render(new FilterBlockView(), siteTripMainElement);
const siteFilterElement = document.querySelector('.trip-controls__filters');
render(new FilterView(), siteFilterElement);
render(new NewTaskButtonView, siteTripMainElement);

tripsPresenter.init();


