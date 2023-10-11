const TRIP_COUNT = 3;
const TYPES_TRANSPORT = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const FilterType = {
  FUTURE: 'Future',
  EVERYTHING: 'Everything',
  PAST: 'Past'
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const AUTHORIZATION = 'Basic 5kgjl7dinkljwf';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

export {
  TRIP_COUNT,
  TYPES_TRANSPORT,
  FilterType,
  SortType,
  UserAction,
  UpdateType,
  AUTHORIZATION,
  END_POINT
};


