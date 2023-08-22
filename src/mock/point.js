import {getRandomInteger} from '../utils/common.js';
import {TYPES_TRANSPORT} from '../const.js';
import {nanoid} from 'nanoid';

const generateType = () => {
  const randomIndex = getRandomInteger(0, TYPES_TRANSPORT.length - 1);

  return TYPES_TRANSPORT[randomIndex];
};

const generateDestination = () => {
  const typesDestinations = ['Amsterdam', 'Moscow', 'NewYork', 'SaintPetersburg', 'Kaluga', 'Novgorod', 'Tallinn', 'Riga', 'Madrid'];

  const randomIndex = getRandomInteger(0, typesDestinations.length - 1);

  return typesDestinations[randomIndex];
};

export const generatePoint = () => ({
  basePrice: getRandomInteger(500,10000),
  dateFrom: `2019-0${getRandomInteger(1,9)}-10T20:45:56.845Z`,
  dateTo: `2021-${getRandomInteger(10,11)}-12T22:55:13.375Z`,
  destination: {
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: generateDestination(),
    pictures: [
      {
        src: './img/photos/1.jpg',
        description: 'Chamonix parliament building'
      },
      {
        src: './img/photos/2.jpg',
        description: 'Chamonix parliament building'
      },
      {
        src: './img/photos/3.jpg',
        description: 'Chamonix parliament building'
      }
    ]
  },
  id: nanoid(),
  isFavorite: false,
  offers: [getRandomInteger(0, 5),getRandomInteger(0, 5),getRandomInteger(0, 5)],
  type: generateType()
});
