import {getRandomInteger} from '../utils.js';

const generateType = () => {
  const typesTransport = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  const randomIndex = getRandomInteger(0, typesTransport.length - 1);

  return typesTransport[randomIndex];
};

export const generatePoint = () => ({
  basePrice: 1100,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: '$Destination$',
  id: 0,
  isFavorite: false,
  offers: '',
  type: generateType()
});
