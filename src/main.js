import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import TripsPresenter from './presenter/trips-presenter.js';
import PointsModel from './model/points-model.js';
import NewTaskButtonView from './view/new-point-button-view.js';
import {render} from './render.js';


const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');
const siteTripMainElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const tripsPresenter = new TripsPresenter(siteTripEventsElement, pointsModel);


render(new FilterView(), siteFilterElement);
render(new NewTaskButtonView, siteTripMainElement);

tripsPresenter.init();


