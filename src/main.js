import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import TripsPresenter from './presenter/trips-presenter.js';
import PointsModel from './model/points-model.js';
import {render} from './render.js';


const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');
const tripsPresenter = new TripsPresenter();
const pointsModel = new PointsModel();

render(new FilterView(), siteFilterElement);
render(new SortView(), siteTripEventsElement);

tripsPresenter.init(siteTripEventsElement, pointsModel);


