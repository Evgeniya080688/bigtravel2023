import {render, replace, remove} from '../framework/render.js';
import InfoTripView from '../view/info-trip-view.js';
import {humanizeDueDateShort} from '../utils/point.js';

export default class InfoPresenter {
  #pointsModel = null;
  #offersModel = null;
  #offersCur = null;
  #infoComponent = null;
  #infoContainer = null;

  #path = null;

  constructor(container, pointsModel, offersModel) {
    this.#pointsModel = pointsModel;
    this.#infoContainer = container;
    this.#offersModel = offersModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const prevInfoComponent = this.#infoComponent;
    const pointsCurr = this.#pointsModel.points;
    let totalPrice = 0;
    let pathName = '';
    let dates = '';
    pointsCurr.forEach((point) => {
      const offersCur = this.#offersModel.getByType(point.type).offers;
      offersCur.forEach((offer) => {
        if (point.offers.includes(offer.id)) {
          totalPrice += offer.price;
        }
      });
      totalPrice += Number(point.basePrice);
    });

    if (pointsCurr.length > 3) {
      pathName = `${pointsCurr[pointsCurr.length -1].destination.name} — ... — ${pointsCurr[0].destination.name}`;
      dates =  `${humanizeDueDateShort(pointsCurr[pointsCurr.length -1].dateFrom)} — ${humanizeDueDateShort(pointsCurr[0].dateTo)}`;
    } else {
      pathName = '';
      pointsCurr.forEach((point, i) => {
        if (i < pointsCurr.length -1) {
          pathName += `${point.destination.name} — `;
        } else {
          pathName += `${point.destination.name}`;
        }
      });
    }
    this.#infoComponent = new InfoTripView(totalPrice, pathName, dates);

    if (prevInfoComponent === null) {
      render(this.#infoComponent, this.#infoContainer);
      return;
    }

    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };


}
