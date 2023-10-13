import {FilterType} from '../const';
import {isPointFuture} from './point';

const filter = {
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => !isPointFuture(point.dateTo)),
  [FilterType.EVERYTHING]: (points) => points,
};

export {filter};
