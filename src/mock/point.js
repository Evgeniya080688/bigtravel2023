import {getRandomInteger} from '../utils/common.js';
import {TYPES_TRANSPORT} from '../const.js';
import {nanoid} from 'nanoid';
import {destinations} from './destinations.js';

const generateType = () => {
  const randomIndex = getRandomInteger(0, TYPES_TRANSPORT.length - 1);

  return TYPES_TRANSPORT[randomIndex];
};

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
};

export const generatePoint = () => {
  const destination = generateDestination();
  return {
    basePrice: getRandomInteger(500,10000),
    dateFrom: `2019-0${getRandomInteger(1,9)}-10T20:45:56.845Z`,
    dateTo: `2021-${getRandomInteger(10,11)}-12T22:55:13.375Z`,
    destination: {
      description: destination.description,
      name: destination.name,
      pictures: destination.pictures
    },
    id: nanoid(),
    isFavorite: false,
    offers: [getRandomInteger(0, 5),getRandomInteger(0, 5),getRandomInteger(0, 5)],
    type: generateType()
  };
};
