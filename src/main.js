import {render} from './framework/render.js';
import FilterModel from './model/filter-model.js';
import TripsPresenter from './presenter/trips-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import NewTaskButtonView from './view/new-point-button-view.js';
import InfoTripView from './view/info-trip-view.js';


const siteTripEventsElement = document.querySelector('.trip-events');
const siteTripMainElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const tripsPresenter = new TripsPresenter(siteTripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteTripMainElement, filterModel, pointsModel);

render(new InfoTripView(), siteTripMainElement);
filterPresenter.init();
render(new NewTaskButtonView, siteTripMainElement);
tripsPresenter.init();


