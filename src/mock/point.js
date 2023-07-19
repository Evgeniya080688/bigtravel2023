import {getRandomInteger} from '../utils.js';

const generateType = () => {
  const typesTransport = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  const randomIndex = getRandomInteger(0, typesTransport.length - 1);

  return typesTransport[randomIndex];
};

const generateDestination = () => {
  const typesDestinations = ['Amsterdam', 'Moscow', 'NewYork', 'SaintPetersburg', 'Kaluga', 'Novgorod', 'Tallinn', 'Riga', 'Madrid'];

  const randomIndex = getRandomInteger(0, typesDestinations.length - 1);

  return typesDestinations[randomIndex];
};

export const generatePoint = () => ({
  basePrice: getRandomInteger(500,10000),
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: {
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: generateDestination(),
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building'
      }
    ]
  },
  id: 0,
  isFavorite: false,
  offers: [getRandomInteger(0, 6),getRandomInteger(0, 6),getRandomInteger(0, 6)],
  type: generateType()
});
