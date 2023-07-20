import {generatePoint} from '../mock/point.js';

export default class EditFormModel {
  point = generatePoint();

  getPoint = () => this.point;
}
