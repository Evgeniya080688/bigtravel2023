import {FilterType} from '../const';
import {isPointFuture} from './point';

const filter = {
  [FilterType.FUTURE]: (points) => points.filter((point) => !isPointFuture(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointFuture(point.dateFrom)),
  [FilterType.EVERYTHING]: (points) => points,
};

export {filter};
